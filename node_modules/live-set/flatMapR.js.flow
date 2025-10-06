/* @flow */

import LiveSet from '.';
import type {LiveSetSubscription} from '.';

export default function flatMapR<T,U>(liveSet: LiveSet<T>, cb: (value: T) => LiveSet<U>): LiveSet<U> {
  let isReading = false;

  return new LiveSet({
    scheduler: liveSet.getScheduler(),
    read() {
      if (isReading) {
        throw new Error('reading inactive recursively-flatMapped stream is not supported');
      }
      isReading = true;
      const s = new Set();
      liveSet.values().forEach(value => {
        const childSet = cb(value);
        childSet.values().forEach(value => {
          s.add(value);
        });
      });
      isReading = false;
      return s;
    },
    listen(setValues, controller) {
      let mainSubCompleted = false;
      let hasSubscribedToChildren = false;
      let nextHasFired = false;
      const childSetSubs: Map<LiveSet<U>, LiveSetSubscription> = new Map();

      function childSetSubscribe(childSet: LiveSet<U>) {
        if (childSet.isEnded()) { // optimization
          childSet.values().forEach(value => {
            controller.add(value);
          });
        } else {
          childSet.subscribe({
            start(sub) {
              childSetSubs.set(childSet, sub);
              childSet.values().forEach(value => {
                controller.add(value);
              });
            },
            next(changes) {
              nextHasFired = true;
              changes.forEach(change => {
                if (change.type === 'add') {
                  controller.add(change.value);
                } else if (change.type === 'remove') {
                  controller.remove(change.value);
                }
              });
            },
            error(err) {
              controller.error(err);
            },
            complete() {
              childSetSubs.delete(childSet);
              if (mainSubCompleted && childSetSubs.size === 0) {
                controller.end();
              }
            }
          });
        }
      }

      setValues(new Set());
      const childSets: Map<T, LiveSet<U>> = new Map();

      const mainSub = liveSet.subscribe({
        start() {
          liveSet.values().forEach(value => {
            const childSet = cb(value);
            childSets.set(value, childSet);
            childSetSubscribe(childSet);
          });
          hasSubscribedToChildren = true;
        },
        next(changes) {
          nextHasFired = true;
          changes.forEach(change => {
            if (change.type === 'add') {
              const childSet = cb(change.value);
              childSets.set(change.value, childSet);
              childSetSubscribe(childSet);
            } else if (change.type === 'remove') {
              const childSet = childSets.get(change.value);
              if (!childSet) throw new Error('removed value not in liveset');
              childSet.values().forEach(value => {
                controller.remove(value);
              });
              childSets.delete(change.value);
              const childSetSub = childSetSubs.get(childSet);
              if (childSetSub) {
                // We won't have the subscription if the childSet ended already
                childSetSub.unsubscribe();
                childSetSubs.delete(childSet);
              }
            }
          });
        },
        error(err) {
          controller.error(err);
        },
        complete() {
          mainSubCompleted = true;
          if (hasSubscribedToChildren && childSetSubs.size === 0) {
            controller.end();
          }
        }
      });

      let isPullingChanges = false;
      return {
        unsubscribe() {
          mainSub.unsubscribe();
          childSetSubs.forEach(sub => {
            sub.unsubscribe();
          });
          childSets.clear();
          childSetSubs.clear();
        },
        pullChanges() {
          if (isPullingChanges) return;
          isPullingChanges = true;

          do {
            nextHasFired = false;
            mainSub.pullChanges();
            childSetSubs.forEach(sub => {
              sub.pullChanges();
            });
          } while (nextHasFired);

          isPullingChanges = false;
        }
      };
    }
  });
}
