/* @flow */

import LiveSet from '.';

export default function mapWithRemoval<T,U>(input: LiveSet<T>, cb: (value: T, removal: Promise<void>) => U): LiveSet<U> {
  const output = new LiveSet({
    scheduler: input.getScheduler(),
    read() {
      throw new Error('mapWithRemoval liveset may not be read while inactive');
    },
    listen(setValues, controller) {
      const m: Map<T, {newValue: U, resolve: Function}> = new Map();

      const sub = input.subscribe({
        start() {
          const s = new Set();
          input.values().forEach(value => {
            let resolve;
            const removal: Promise<void> = new Promise(_resolve => {
              resolve = _resolve;
            });
            /*:: if (!resolve) throw new Error(); */
            const newValue = cb(value, removal);
            m.set(value, {newValue, resolve});
            s.add(newValue);
          });
          setValues(s);
        },
        next(changes) {
          changes.forEach(change => {
            if (change.type === 'add') {
              let resolve;
              const removal: Promise<void> = new Promise(_resolve => {
                resolve = _resolve;
              });
              /*:: if (!resolve) throw new Error(); */
              const newValue = cb(change.value, removal);
              m.set(change.value, {newValue, resolve});
              controller.add(newValue);
            } else if (change.type === 'remove') {
              const entry = m.get(change.value);
              if (!entry) throw new Error('removed item not in liveset');
              const {newValue, resolve} = entry;
              resolve();
              m.delete(change.value);
              controller.remove(newValue);
            }
          });
        },
        error(err) {
          controller.error(err);
        },
        complete() {
          controller.end();
        }
      });

      return {
        unsubscribe() {
          sub.unsubscribe();
          m.forEach(({resolve}) => {
            resolve();
          });
        },
        pullChanges() {
          sub.pullChanges();
        }
      };
    }
  });
  return output;
}
