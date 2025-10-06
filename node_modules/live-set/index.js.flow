/* @flow */

import Scheduler from './Scheduler';
import $$observable from 'symbol-observable';

export type LiveSetChangeRecord<+T> =
  {type: 'add', +value: T} |
  {type: 'remove', +value: T} |
  {type: 'end'};

export type LiveSetController<-T> = {
  closed: boolean;
  add(item: T): void;
  remove(item: T): void;
  error(err: any): void;
  end(): void;
};

export type ListenHandler = {
  unsubscribe(): void;
  +pullChanges?: () => void;
};

export type LiveSetInit<T> = {
  scheduler?: Scheduler;
  read(): Set<T>;
  listen(
    setValues: { (values: Set<T>): void },
    controller: LiveSetController<T>
  ): void|ListenHandler|()=>void;
};

export type LiveSetSubscriber<-T> = (changes: $ReadOnlyArray<LiveSetChangeRecord<T>>) => void;

export type LiveSetSubscription = {
  closed: boolean;
  unsubscribe(): void;
  pullChanges(): void;
};

export type LiveSetObserver<-T> = {
  +start?: ?(subscription: LiveSetSubscription) => void;
  +next?: ?LiveSetSubscriber<T>;
  +error?: ?(err: any) => void;
  +complete?: ?() => void;
};

type LiveSetObserverRecord<T> = {
  ignore: number;
  observer: LiveSetObserver<T>;
};

export default class LiveSet<T> {
  static defaultScheduler = new Scheduler();

  _init: LiveSetInit<T>;
  _scheduler: Scheduler;

  _values: ?Set<T> = null;
  _mutableValues: boolean = false; // Whether we can mutate the _values Set.

  _active: ?{
    controller: LiveSetController<T>;
    listenHandler: ListenHandler;
  } = null;
  _inSubscriptionStart = false;
  _ended: boolean = false;
  _endedWithError: boolean = false;
  _error: any = null;
  _queuedCall: boolean = false;
  _changeQueue: Array<LiveSetChangeRecord<T>> = [];
  _observers: Array<LiveSetObserverRecord<T>> = [];

  constructor(init: LiveSetInit<T>) {
    this._init = init;
    this._scheduler = init.scheduler || LiveSet.defaultScheduler;
  }

  static active<T>(initialValues: ?Set<T>, options: ?{scheduler?: Scheduler}): {liveSet: LiveSet<T>, controller: LiveSetController<T>} {
    const set = initialValues || new Set();
    let controller;
    const liveSet = new LiveSet({
      scheduler: options ? options.scheduler : undefined,
      read: () => set,
      listen: (setValues, _controller) => {
        setValues(set);
        controller = _controller;
      }
    });
    liveSet.subscribe({});
    return {liveSet, controller: (controller: any)};
  }

  static constant<T>(values: Set<T>, options: ?{scheduler?: Scheduler}): LiveSet<T> {
    makeSetImmutable(values);
    const shouldNotHappen = () => {
      throw new Error('Should not happen');
    };
    const ls = new LiveSet({
      scheduler: options ? options.scheduler : undefined,
      read: shouldNotHappen,
      listen: shouldNotHappen
    });
    ls._ended = true;
    ls._values = values;
    ls._mutableValues = false;
    return ls;
  }

  _queueChange(record: ?LiveSetChangeRecord<T>) {
    if (record) {
      this._changeQueue.push(record);
    }
    if (!this._queuedCall) {
      this._queuedCall = true;
      this._scheduler.schedule(() => {
        this._queuedCall = false;
        const changes = this._changeQueue;
        this._changeQueue = [];
        let observersToCall;
        const ended = this._ended;
        if (ended) {
          observersToCall = this._observers;
          this._observers = [];
        } else {
          observersToCall = this._observers.slice();
        }
        observersToCall.forEach(record => {
          const {observer, ignore} = record;
          const observerNext = observer.next;
          if (observerNext) {
            if (ignore === 0) {
              observerNext.call(observer, changes);
            } else {
              record.ignore = 0;
              const changesToDeliver = changes.slice(ignore);
              if (changesToDeliver.length) {
                observerNext.call(observer, changesToDeliver);
              }
            }
          }
          if (ended) {
            if (this._endedWithError) {
              if (observer.error) observer.error(this._error);
            } else {
              if (observer.complete) observer.complete();
            }
          }
        });
      });
    }
  }

  _deactivate() {
    if (!this._active) throw new Error('already inactive');
    const {listenHandler} = this._active;
    this._active = null;
    if (listenHandler) {
      listenHandler.unsubscribe();
    }
  }

  values(): Set<T> {
    if (this._values) {
      if (this._active && !this._inSubscriptionStart) {
        const {listenHandler} = this._active;
        if (listenHandler.pullChanges) {
          listenHandler.pullChanges();
        }
      }
      if (this._mutableValues) {
        this._mutableValues = false;
        makeSetImmutable(this._values);
      }
      /*:: if (!this._values) throw new Error(); */
      return this._values;
    } else {
      if (this._active) {
        throw new Error('tried to call values() on liveset during subscription before setValues was called');
      }
      const s = this._init.read();
      makeSetImmutable(s);
      return s;
    }
  }

  isEnded(): boolean {
    return this._ended;
  }

  getScheduler(): Scheduler {
    return this._scheduler;
  }

  subscribe(observerOrOnNext: LiveSetObserver<T> | LiveSetSubscriber<T>, onError: ?(err: any) => void, onComplete: ?() => void): LiveSetSubscription {
    const liveSet = this;

    let observer;
    if (typeof observerOrOnNext === 'function') {
      observer = {
        next: observerOrOnNext,
        error: onError,
        complete: onComplete
      };
    } else {
      observer = observerOrOnNext;
    }

    (observer: LiveSetObserver<T>);

    if (this._ended) {
      const subscription = {
        closed: false,
        unsubscribe: () => {
          subscription.closed = true;
        },
        pullChanges: () => {}
      };
      if (observer.start) {
        observer.start(subscription);
      }
      if (!subscription.closed) {
        if (this._endedWithError) {
          if (observer.error) {
            observer.error(this._error);
          }
        } else {
          if (observer.complete) {
            observer.complete();
          }
        }
      }
      subscription.closed = true;
      return subscription;
    }

    const observerRecord = {observer, ignore: this._changeQueue.length};

    let isStarting = true;
    let unsubscribedInStart = false;
    const subscription = {
      /*:: closed: false&&` */ get closed() {
        return !isStarting && liveSet._observers.indexOf(observerRecord) < 0;
      }/*:: ` */,
      unsubscribe: () => {
        if (isStarting) {
          unsubscribedInStart = true;
          return;
        }
        const ix = this._observers.indexOf(observerRecord);
        if (ix >= 0) {
          this._observers.splice(ix, 1);
          if (!this._ended && this._observers.length === 0) {
            this._values = null;
            this._deactivate();
          }
        }
      },
      pullChanges: () => {
        if (this._active && this._active.listenHandler && this._active.listenHandler.pullChanges) {
          this._active.listenHandler.pullChanges();
        }
        const changeQueueLength = this._changeQueue.length;
        const originalNext = observer.next;
        if (changeQueueLength !== 0 && originalNext) {
          const changesToDeliver = this._changeQueue.slice(observerRecord.ignore);
          if (changesToDeliver.length !== 0) {
            observerRecord.ignore = changeQueueLength;
            originalNext.call(observer, changesToDeliver);
          }
        }
      }
    };

    if (!this._active) {
      const controller: LiveSetController<T> = {
        // Flow doesn't support getters and setters yet
        /*:: closed: false&&` */ get closed() {
          return !liveSet._active || liveSet._active.controller !== this;
        }/*:: ` */,
        add: value => {
          let values = this._values;
          if (!values) throw new Error('setValue must be called before controller is used');
          if (!this._ended && !values.has(value)) {
            if (!this._mutableValues) {
              this._values = values = new Set(values);
              this._mutableValues = true;
            }
            values.add(value);
            this._queueChange({type: 'add', value});
          }
        },
        remove: value => {
          let values = this._values;
          if (!values) throw new Error('setValue must be called before controller is used');
          if (!this._ended && values.has(value)) {
            if (!this._mutableValues) {
              this._values = values = new Set(values);
              this._mutableValues = true;
            }
            values.delete(value);
            this._queueChange({type: 'remove', value});
          }
        },
        error: err => {
          if (this._ended) return;
          this._ended = true;
          this._endedWithError = true;
          this._error = err;
          this._queueChange();
          this._deactivate();
        },
        end: () => {
          if (this._ended) return;
          this._ended = true;
          this._queueChange();
          this._deactivate();
        }
      };
      const active = this._active = {
        controller,
        listenHandler: {
          unsubscribe: () => {}
        }
      };
      const setValuesError: Function = () => {
        throw new Error('setValues must be called once during listen');
      };
      let setValues = values => {
        setValues = setValuesError;
        makeSetImmutable(values);
        this._values = values;
        this._mutableValues = false;
      };
      const listenHandlerOrFunction = this._init.listen(values => setValues(values), controller);
      if (!this._values) {
        setValuesError();
      }
      if (typeof listenHandlerOrFunction === 'function') {
        active.listenHandler = {
          unsubscribe: listenHandlerOrFunction
        };
      } else if (listenHandlerOrFunction != null && typeof listenHandlerOrFunction.unsubscribe === 'function') {
        active.listenHandler = listenHandlerOrFunction;
      } else if (listenHandlerOrFunction != null) {
        throw new TypeError('listen must return object with unsubscribe method, a function, or null');
      }
      if (controller.closed) {
        this._active = active;
        this._deactivate();
      }
    }

    if (observer.start) {
      this._inSubscriptionStart = true;
      observer.start(subscription);
      this._inSubscriptionStart = false;
    }
    isStarting = false;

    observerRecord.ignore = this._changeQueue.length;
    if (!unsubscribedInStart) {
      this._observers.push(observerRecord);
    }

    return subscription;
  }
}

// Assign here because Flow doesn't support computed property keys on classes:
// https://github.com/facebook/flow/issues/2286
(LiveSet:any).prototype[$$observable] = function() {
  return this;
};

function makeSetImmutable(set: Set<any>) {
  if (process.env.NODE_ENV !== 'production') {
    (set:any).add = (set:any).delete = (set:any).clear = readOnly;
  }
}

function readOnly() {
  throw new Error('Do not modify Set passed to or from LiveSet: Set is read-only in development');
}
