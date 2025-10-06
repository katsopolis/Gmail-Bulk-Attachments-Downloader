# live-set

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/StreakYC/live-set/blob/master/LICENSE.txt) [![Circle CI](https://circleci.com/gh/StreakYC/live-set.svg?style=shield)](https://circleci.com/gh/StreakYC/live-set) [![npm version](https://badge.fury.io/js/live-set.svg)](https://badge.fury.io/js/live-set)

This class is basically a Set with a subscribe() method that calls your
callback after changes happen to the set of values.

This class represents a set of values which may change over time or have
transformations applied to it, resulting in a new LiveSet. After modifications
are made, notifications will be delivered asynchronously, like Javascript
Promises or
[MutationObservers](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
do. This library is inspired by the [Kefir
library](http://rpominov.github.io/kefir/) and the [Observable
proposal](https://tc39.github.io/proposal-observable/), but represents a
changing set rather than a stream of a single updating value.

Like Kefir Observables, LiveSets have active and inactive states and start out
in the inactive state. When a LiveSet first gets a subscriber, the LiveSet
becomes active and calls the listen function provided to it. When a LiveSet no
longer has any subscribers, it becomes deactivated. Unlike Kefir Observables,
events are delivered asynchronously, and a LiveSet instance may have its
current values queried at any time.

Here's an example of a liveset being made to represent the direct children of
an HTMLElement, using a MutationObserver to keep the liveset updated:

```js
import LiveSet from 'live-set';

function createElementChildLiveSet(element) {
  return new LiveSet({
    // Function to determine the LiveSet's values if they're read while the
    // LiveSet is inactive.
    read() {
      return new Set(Array.from(element.children));
    },

    // Function to call when the LiveSet is activated.
    listen(setValues, controller) {
      // setValues must called before the listen function returns to set the
      // initial values of the liveset. (We pass the initial values to a
      // function like this rather than returning them from the listen function
      // in order to support recursive livesets.)
      setValues(this.read());

      // The controller object has add and remove methods which may modify the
      // set of values after setValues has been called. It also has an end
      // method which may be called to signify that no further changes will be
      // made, allowing the LiveSet to discard its subscribers.

      function changesHandler(mutations) {
        mutations.forEach(mutation => {
          Array.prototype.forEach.call(mutation.addedNodes, child => {
            if (child.nodeType === 1) controller.add(child);
          });
          Array.prototype.forEach.call(mutation.removedNodes, child => {
            if (child.nodeType === 1) controller.remove(child);
          });
        });
      }
      const observer = new MutationObserver(changesHandler);
      observer.observe(element, {childList: true});

      // The listen function may return an unsubscribe callback, or an object
      // containing an unsubscribe callback and a pullChanges callback.
      return {
        unsubscribe() {
          // When the LiveSet has no more subscribers, disconnect the
          // MutationObserver instance so that it doesn't continue to call
          // `changesHandler` wastefully.
          observer.disconnect();
        },
        pullChanges() {
          // LiveSet instances generally deliver their change notifications
          // asynchronously, but they can be forced to flush all queued up
          // notifications synchronously. If a LiveSet is based on a source
          // with the same behavior, such as a MutationObserver or another
          // LiveSet,
          changesHandler(observer.takeRecords());
        }
      };
    }
  });
}

const bodyChildren = createElementChildLiveSet(document.body);

console.log(bodyChildren.values());
// Example output:
// Set { <header>, <article>, <div>, <div>, <footer> }

const subscription = bodyChildren.subscribe(changes => {
  console.log(changes);
  // If an element is added directly to the page body, this would log output like this:
  // [{type: 'add', value: <div> }]
});

// We can later unsubscribe the above callback when we're no longer interested:
subscription.unsubscribe();
```

The LiveSet instance could then be passed around, read, and subscribed to. New
LiveSets can be created by transforming existing LiveSets. Here's an example
building off of the above example:

```js
import filter from 'live-set/filter';

const bodyChildrenNoDivs = filter(bodyChildren, el => el.nodeName !== 'DIV');

console.log(bodyChildrenNoDivs.values());
// Example output:
// Set { <header>, <article>, <footer> }

// bodyChildrenNoDivs can be subscribed to too.

import flatMap from 'live-set/flatMap';

// This liveset will contain all of the children of the elements in the
// bodyChildrenNoDivs liveset, and it will stay up-to-date!
const bodyChildrenNoDivsChildren = flatMap(bodyChildrenNoDivs, el => createElementChildLiveSet(el));
// Example output:
// Set { <nav>, <h1>, <p>, <p>, <p>, <div>, <div> }
```

Like Kefir Observables, the activation model means that intermediate LiveSets
can be created and consumed without needing to be explicitly cleaned up after
the output liveset is unsubscribed from. Consider the following code in which
several livesets are created from other livesets:

```js
import LiveSet from 'live-set';
import map from 'live-set/map';
import merge from 'live-set/merge';

// i1 is a liveset which starts out containing the number 5, and every second
// while active the subsequent number is added to it.
const i1 = new LiveSet({
  // Don't bother making `i1` support having its values read while inactive.
  read() {
    throw new Error('not implemented');
  },

  // This will be called when `i1` becomes active.
  listen(setValues, controller) {
    setValues(new Set([5]));
    let i = 6;
    const t = setInterval(() => {
      controller.add(i);
      i++;
    }, 1000);

    // This will be called when `i1` becomes inactive. We can return a function
    // here rather than an object if we only have a unsubscribe callback.
    return () => {
      clearInterval(t);
    };
  }
});

// i2 is a liveset which always contains the same values as i1 but multiplied
// by 10.
const i2 = map(i1, x => x*10);

// final is a liveset which always contains all of the values of i2 and the
// value 1.
const final = merge([
  i2,
  LiveSet.constant(new Set([1]))
]);

const subscription = final.subscribe({
  start() {
    // Note that whenever we are subscribing and reading the values of a
    // liveset, we call the .values() method on the liveset only after we have
    // subscribed to it, so that it's activated first. If we call .values()
    // before `final` is active, then its values will be computed twice, once
    // on the .values() call and then again when we subscribe to `final`.
    //
    // Additionally, the input liveset `i1` above was not constructed with a
    // working read() function, so calling .values() on final before it's
    // activated would fail.
    console.log('All values', Array.from(final.values()));
  },
  next(changes) {
    console.log('changes', changes);
  }
});

setTimeout(() => {
  // This will end our subscription to `final`, and `final` will become
  // inactive since it has no more subscriptions. `final` will end its
  // subscription to `i2`, which will then become inactive and end its
  // subscription to `i1`, which will become inactive and call `clearInterval`,
  // preventing the interval timer from being left running forever uselessly.
  subscription.unsubscribe();
}, 3500);

/* console output:
All values [ 50, 1 ]
changes [ { type: 'add', value: 60 } ]
changes [ { type: 'add', value: 70 } ]
changes [ { type: 'add', value: 80 } ]
*/
```

The ability to read the values of an inactive LiveSet is provided for
convenience, but in some situations it has surprising results if
transformations are not pure (including the case where they instantiate objects
and their identities are depended on). Consider the following code:

```js
import LiveSet from 'live-set';
import map from 'live-set/map';

const input = LiveSet.constant(new Set([5, 6]));
const mapped = map(input, x => ({value: x}));

const firstValue1 = Array.from(mapped.values())[0];
console.log(firstValue1); // {value: 5}
const firstValue2 = Array.from(mapped.values())[0];
console.log(firstValue2); // {value: 5}
console.log(firstValue1 === firstValue2); // false
```

The `mapped` LiveSet while inactive does not keep a cache of the results of the
transformed input values. It could only know to remove them if it subscribed
to the input liveset, but that could cause `input` to keep resources open. The
`mapped` LiveSet will only become active and trigger a subscribtion to `input`
if it is subscribed to first. Here we subscribe to it with an empty observer to
demonstrate the difference:

```js
import LiveSet from 'live-set';
import map from 'live-set/map';

const input = LiveSet.constant(new Set([5, 6]));
const mapped = map(input, x => ({value: x}));
mapped.subscribe({});

const firstValue1 = Array.from(mapped.values())[0];
const firstValue2 = Array.from(mapped.values())[0];
console.log(firstValue1 === firstValue2); // true
```

## API

### Core

#### LiveSet::constructor
`LiveSet<T>::constructor({scheduler?, read, listen})`

The constructor must be passed an object containing `read` and `listen`
functions, and optionally a `scheduler` property of the Scheduler type.

The `read` function is called if the values() method is called on the LiveSet
instance while it is inactive but not yet ended. The `read` function is
expected to return a Set object containing the LiveSet's current values. If a
LiveSet is not intended to be read while inactive, then you should give a
function which throws an error.

The `listen` function is called whenever the LiveSet is activated. Activation
occurs whenever the LiveSet goes from zero to one subscribers. Activation may
happen multiple times for a LiveSet if it is unsubscribed from and resubscribed
to. The `listen` function is passed two parameters, `setValues` and
`controller`.

`setValues` is a function that must be called with the initial values as a Set
before the passed `listen` function ends and before any new subscriptions are
added to the LiveSet being activated.

`controller` is an object with three methods, `add(value)`, `remove(value)`,
`error(error: any)` and `end()`. These are to be used to modify the LiveSet's
values. Do not modify the Set originally passed to `setValues` to manipulate the
LiveSet. `end()` may be called to signify that the LiveSet will have no more
changes; the LiveSet will become frozen with its current values at that point.
References to subscribers will be released when a LiveSet is ended. The `error`
function ends the LiveSet and delivers an error value to any current
subscribers.

The `listen` function may return a function to call upon deactivation, or an
object with an `unsubscribe` method (to call upon deactivation) and optionally
a `pullChanges` method. The pullChanges method will be called to flush any
changes from the source when the `values()` method is called on the LiveSet, or
the `pullChanges` method is called on a LiveSetSubscription. If the `listen`
function subscribes to a LiveSet, then it may be useful to have the `listen`
function return the LiveSetSubscription, which has unsubscribe and pullChanges
methods.

#### LiveSet.constant
`LiveSet.constant<T>(values: Set<T>, options?: Object): LiveSet<T>`

This creates a LiveSet with a set of values that will never change. The LiveSet
will start in the ended state, and therefore will never deliver change
notifications or keep references to subscribers.

The optional `options` parameter may have a `scheduler` property specifying the
Scheduler instance to use.

#### LiveSet.active
`LiveSet.active<T>(initialValues?: Set<T>, options?: Object): {liveSet: LiveSet<T>, controller: LiveSetController<T>}`

This is a convenience method to create a LiveSet that starts out in the
activated state and never exits the activated state. The new LiveSet and its
controller (the same type as passed to the `listen` callback passed to the
constructor) are returned.

Be warned that this function eschews the normal activation/deactivation
lifecycle of LiveSets. If the LiveSet requires some resource to be held open to
keep it populated, then you will not be able to auto-close the resource when
the LiveSet loses its subscribers. You will have to provide your own mechanism
to close the resource manually if necessary.

The optional `options` parameter may have a `scheduler` property specifying the
Scheduler instance to use.

This function is inspired by the nonstandard "Promise.defer()" function that
some Promise libraries have implemented.

#### LiveSet.defaultScheduler
`LiveSet.defaultScheduler: Scheduler`

This is the Scheduler object used by default for new LiveSets.

#### LiveSet::isEnded
`LiveSet<T>::isEnded(): boolean`

This returns whether the LiveSet is in the ended state. LiveSets in the ended
state will never have their values change, deliver any change notifications, or
keep references to their subscribers.

#### LiveSet::getScheduler
`LiveSet<T>::getScheduler(): Scheduler`

Retrieve the Scheduler object that a LiveSet was instantiated with. This may be
used so that a new LiveSet can be instantiated with the same Scheduler.

#### LiveSet::values
`LiveSet<T>::values(): Set<T>`

This returns a Set containing all of the LiveSet's current values at the time
of the method call. If the LiveSet is modified, then previously-returned Set
objects will not include the modifications. The Set object return by the
values() method must not be modified.

If the LiveSet is currently inactive, then this will trigger the `read`
function passed to the constructor to be called. If the LiveSet is currently
active, then this will trigger the `pullChanges` function returned by the
constructor's `listen` function if present.

#### LiveSet::subscribe
`LiveSet<T>::subscribe(observer): LiveSetSubscription`

This function is used to subscribe to change notifications from the LiveSet.
The observer parameter must either be an Observer object with optional `start`,
`next`, `error`, and `complete` functions, or a function which is treated as an
Observer object with that function as the `next` method. The subscribe method
returns a LiveSetSubscription object.

The `start` function is called when the subscription first starts, before the
subscribe call has returned, and it is passed a reference to the
LiveSetSubscription object which will be returned. During the `start` function,
the LiveSet being subscribed to is guaranteed to be active, so it's a good time
to read the current values of the LiveSet with the values() method.

The `next` function is called after any changes have been made to the LiveSet's
set of values. These changes notifications are delivered either asynchronously,
or whenever change notifications are flushed early due to a `LiveSet::values()`
or `LiveSetSubscription::pullChanges()` call. The parameter passed to the
`next` function is an array of LiveSetChangeRecord objects.

The `error` function is called if the LiveSet is ended by a call to
`controller.error`, and it's passed the value passed to the `controller.error`
method.

The `complete` function is called if the LiveSet is ended by a call to
`controller.end`.

If either the `error` or `complete` function is called, then there will be no
more calls to any of the observer's functions after that.

This function is intended to be compatible with the Observable subscribe method
of the [Observable proposal](https://tc39.github.io/proposal-observable/).

#### LiveSetSubscription::closed
`LiveSetSubscription::closed: boolean`

This is true if the LiveSet has ended, or the subscription has been
unsubscribed from.

#### LiveSetSubscription::unsubscribe
`LiveSetSubscription::unsubscribe(): void`

This immediately unsubscribes the subscription. None of the observer functions
will be called after unsubscription.

#### LiveSetSubscription::pullChanges
`LiveSetSubscription::pullChanges(): void`

This will cause any queued change notifications to be immediately flushed to
this subscription's observer's `next` function. This will not affect other
subscriptions to the LiveSet.

#### LiveSetChangeRecord<T>

This is a simple object with a `type` property and an optional `value`
property. An array of LiveSetChangeRecord objects is passed to the `next`
callback of a LiveSet::subscribe call.

    {type: 'add', value: T} |
    {type: 'remove', value: T} |
    {type: 'end'};

### Transformations

The following functions usually take a pre-existing LiveSet instance as input,
and return a new LiveSet instance. These functions are implemented in separate
modules rather than as methods of LiveSet in part so that only the functions
used have to be included in a javascript bundle built for browsers.

For all functions below which produce a LiveSet, the LiveSet uses the same
scheduler as the input LiveSet or the same as the first input LiveSet if
multiple are given.

#### live-set/filter
`filter<T>(liveSet: LiveSet<T>, cb: (value: T) => any): LiveSet<T>`

This creates a LiveSet that contains only the values of the input `liveSet`
for which they given callback function returns a truthy value for.

#### live-set/map
`map<T,U>(liveSet: LiveSet<T>, cb: (value: T) => U): LiveSet<U>`

This creates a LiveSet that contains the result of `cb(value)` for each value
in the input `liveSet` instead of the original values. The callback will only
be called for the initial values and when values are added; the callback will
not be called when a value is removed.

The behavior is undefined if the callback returns the same value for distinct
input values present in the input `liveSet` at the same time.

#### live-set/transduce
`transduce(liveSet: LiveSet<any>, transducer: Function): LiveSet<any>`

This creates a new LiveSet based on a transformation implemented by the given
transducer function. It supports any transducers implementation that follows
[the transducer protocol](https://github.com/cognitect-labs/transducers-js#the-transducer-protocol),
for example
[jlongster/transducers.js](https://github.com/jlongster/transducers.js)
or
[cognitect-labs/transducers-js](https://github.com/cognitect-labs/transducers-js).
To learn more about transducers please visit those libraries' pages.

Transducers are recommended to be used to replace any sequence of multiple map
or filter function calls. The use of transducers removes the need for
intermediate LiveSets to be created.

Note that each input value from the `liveSet` passed to the transducer is
expected to immediately map to zero or more values. This mapping is remembered
so that if the input value is later removed from the input `liveSet`, then the
associated output values are all removed from the output LiveSet. This is fine
for any combination of common transducers such as `map(cb)`, `filter(cb)`, and
`take(n)`, but transducers which produce a many-to-one relationship between
values such as `partition(n)` will not function in a sensible manner.

The behavior is undefined if the transducer outputs equal values to be present
in the output LiveSet at the same time.

#### live-set/merge
`merge<T>(liveSets: Array<LiveSet<T>>): LiveSet<T>`

This function takes an array of LiveSets and returns a single LiveSet
containing all of their values.

The behavior is undefined if multiple input LiveSets contain the same value at
the same time.

#### live-set/flatMap
`flatMap<T,U>(liveSet: LiveSet<T>, cb: (value: T) => LiveSet<U>): LiveSet<U>`

This function calls the given callback function for each value in the input
`liveSet`, and merges the values of all returned LiveSets into one LiveSet.
When a new value is added to the input `liveSet`, then the callback will be
called a new LiveSet's values will be merged in. When a value is removed from
the input `liveSet`, then the values from the LiveSet created for that value
will be removed from the output LiveSet.

The behavior is undefined if any of the LiveSets returned by the callback
contain equal values at the same time.

#### live-set/flatMapR
`flatMapR<T,U>(liveSet: LiveSet<T>, cb: (value: T) => LiveSet<U>): LiveSet<U>`

This function is the same as `flatMap`, but it should be used for fully correct
`LiveSetSubscription::pullChanges` behavior in recursive situations where it is
expected that a new item being emitted to the output set will cause a new item
to be added to the input set (and therefore potentially more items to the
output set again).

#### live-set/mapWithRemoval
`mapWithRemoval<T,U>(input: LiveSet<T>, cb: (value: T, removal: Promise<void>) => U): LiveSet<U>`

This is similar to the live-set/map function, but the callback is also passed a
promise that will resolve when the value is removed from the input `liveSet`.
The LiveSet returned by this function may not have `values()` called on it
while it is inactive.

The behavior is undefined if the callback returns the same value for distinct
input values present in the input `liveSet` at the same time.

#### live-set/toValueObservable
`toValueObservable<T>(liveSet: LiveSet<T>): Observable<{value: T, removal: Promise<void>}>`

This will return an [Observable](https://tc39.github.io/proposal-observable/)
instance which upon subscription will emit a `{value, removal}` object for
every `value` currently in the input `liveSet` where `removal` is a Promise
which will resolve after the `value` is removed from the input `liveSet`.

### live-set/Scheduler
`Scheduler::constructor()`

A scheduler object has a `schedule(callback)` method which schedules a callback
to run asynchronously, and a `flush()` method to run all currently scheduled
callbacks early.

## Bundling Note

To use this module in browsers, a CommonJS bundler such as Browserify or
Webpack should be used.

LiveSet's code adds additional checks in some places if `process.env.NODE_ENV`
is not set to "production". If you're using Browserify, then setting the
NODE_ENV environment variable to "production" during build is enough to disable
these checks. Instructions for other bundlers [can be found in React's
documentation](https://reactjs.org/docs/optimizing-performance.html#use-the-production-build),
which uses the same convention.

The additional checks make sure that the Set passed to `setValues` and the Set
returned from the `values()` method are not modified.

Browser support for `Map`, `Set`, and `Promise` is required. Load a polyfill
for these (such as [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill))
if you need to support browsers that don't natively support these.

## Types

Both [TypeScript](https://www.typescriptlang.org/) and
[Flow](https://flowtype.org/) type definitions for this module are included!
The type definitions won't require any configuration to use.
