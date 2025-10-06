/* @flow */
/* eslint-disable no-unused-vars, no-redeclare */

import LiveSet from '.';

declare function filter<T>(liveSet: LiveSet<T>, cb: typeof Boolean): LiveSet<$NonMaybeType<T>>;
declare function filter<T>(liveSet: LiveSet<T>, cb: (value: T) => any): LiveSet<T>;

/*:: export default filter; */

/*:: ` */
export default function filter<T>(liveSet: LiveSet<T>, cb: (value: T) => any): LiveSet<T> {
  return new LiveSet({
    scheduler: liveSet.getScheduler(),
    read() {
      const ret = new Set();
      liveSet.values().forEach(value => {
        if (cb(value)) {
          ret.add(value);
        }
      });
      return ret;
    },
    listen(setValues, controller) {
      const passedFilter = new Set();

      const sub = liveSet.subscribe({
        start() {
          const initialValues = new Set();
          liveSet.values().forEach(value => {
            if (cb(value)) {
              passedFilter.add(value);
              initialValues.add(value);
            }
          });
          setValues(initialValues);
        },
        next(changes) {
          changes.forEach(change => {
            if (change.type === 'add') {
              if (cb(change.value)) {
                passedFilter.add(change.value);
                controller.add(change.value);
              }
            } else if (change.type === 'remove') {
              if (passedFilter.has(change.value)) {
                passedFilter.delete(change.value);
                controller.remove(change.value);
              }
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

      return sub;
    }
  });
}
/*:: ` */
