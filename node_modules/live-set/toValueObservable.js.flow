/* @flow */

import LiveSet from '.';
import Observable from 'zen-observable';

export type ValueWithRemoval<+T> = {
  +value: T;
  +removal: Promise<void>;
};

export default function toValueObservable<T>(liveSet: LiveSet<T>) {
  return new Observable(observer => {
    const resolvers: Map<T, ()=>void> = new Map();

    function addedItem(value: T) {
      let resolve;
      const removal: Promise<void> = new Promise(_resolve => {
        resolve = _resolve;
      });
      resolvers.set(value, (resolve:any));
      const valueWithRemoval: ValueWithRemoval<T> = {value, removal};
      observer.next(valueWithRemoval);
    }

    function removedItem(value: T) {
      const resolver = resolvers.get(value);
      if (!resolver) throw new Error('Resolver not found in map for value');
      resolvers.delete(value);
      resolver();
    }

    const sub = liveSet.subscribe({
      start(sub) {
        for (let value of liveSet.values()) {
          if (sub.closed) break;
          addedItem(value);
        }
      },
      next(changes) {
        changes.forEach(change => {
          if (change.type === 'add') {
            addedItem(change.value);
          } else if (change.type === 'remove') {
            removedItem(change.value);
          }
        });
      },
      error(err) {
        observer.error(err);
      },
      complete() {
        observer.complete();
      }
    });

    return () => {
      sub.unsubscribe();
      resolvers.forEach(resolver => {
        resolver();
      });
    };
  });
}
