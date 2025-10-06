## 1.0.0 (2018-10-03)

### Breaking Changes
* Requires global `Map`, `Set`, and `Promise` support. A polyfill must be used if you're
  targeting browsers without native support for these.
* Updated zen-observable dependency from ^0.6.0 to ^0.8.9. If you use the toValueObservable
  module, then the returned Observable object may have differences now. The callbacks passed
  to `Observable.subscribe()` won't be called synchronously with the initial subscribe call.

### Improvements
* Added TypeScript type definitions.
* Upgraded to Babel 7.

## 0.4.4 (2018-08-31)

* Fixed compatibility with Flow v0.80. Improved type definitions to have proper variance.

## 0.4.3 (2017-11-20)

* Updated zen-observable dependency [#1](https://github.com/StreakYC/live-set/pull/1)

## 0.4.2 (2017-06-29)

* Fixed compatibility with Flow v0.49.1.

## 0.4.1 (2017-03-14)

* Added Scheduler. This allows greater control over batching of change notifications.

## 0.4.0 (2017-03-06)

Start of changelog.
