/* @flow */

import asap from 'asap';

const CAPACITY = 1024;

export default class Scheduler {
  _queue: Array<()=>void> = [];
  _isFlushing: boolean = false;
  _index: number = 0;

  schedule(cb: ()=>void) {
    this._queue.push(() => {
      try {
        cb();
      } catch (e) {
        setTimeout(() => {
          throw e;
        }, 0);
      }
    });
    if (this._queue.length === 1) {
      asap(() => {
        this.flush();
      });
    }
  }

  flush() {
    // based on https://github.com/kriskowal/asap/blob/master/raw.js
    if (this._isFlushing) return;
    this._isFlushing = true;
    const queue = this._queue;
    while (this._index < queue.length) {
      const currentIndex = this._index;
      this._index += 1;
      queue[currentIndex].call();
      if (this._index > CAPACITY) {
        for (let scan = 0, newLength = queue.length - this._index; scan < newLength; scan++) {
          queue[scan] = queue[scan + this._index];
        }
        queue.length -= this._index;
        this._index = 0;
      }
    }
    queue.length = 0;
    this._index = 0;
    this._isFlushing = false;
  }
}
