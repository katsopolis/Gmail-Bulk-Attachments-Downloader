# matches-selector-ng

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Macil/matches-selector-ng/blob/master/LICENSE.txt) [![npm version](https://img.shields.io/npm/v/matches-selector-ng.svg?style=flat)](https://www.npmjs.com/package/matches-selector-ng) [![CircleCI Status](https://circleci.com/gh/Macil/matches-selector-ng.svg?style=shield)](https://circleci.com/gh/Macil/matches-selector-ng) [![Greenkeeper badge](https://badges.greenkeeper.io/Macil/matches-selector-ng.svg)](https://greenkeeper.io/)

Check if an element matches a given selector. Uses the native
[`matches` method](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches)
if present. For use with a commonjs bundler such as Browserify or Webpack.

## Installation

    $ yarn add matches-selector-ng

## Example

```js
var matches = require('matches-selector-ng');
matches(el, 'ul li a');
// => true or false
```

## Types

Both [TypeScript](https://www.typescriptlang.org/) and
[Flow](https://flowtype.org/) type definitions for this module are included!
The type definitions won't require any configuration to use.
