# Dice Notation

[![Build Status](https://travis-ci.org/ChapelR/dice-notation.svg?branch=master)](https://travis-ci.org/ChapelR/dice-notation) [![Coverage Status](https://coveralls.io/repos/github/ChapelR/dice-notation/badge.svg?branch=master)](https://coveralls.io/github/ChapelR/dice-notation?branch=master)

Parses dice notation and rolls dice.

## Install

### Browser

You can grab a hosted version here:

```
<script src="https://cdn.jsdelivr.net/gh/chapelr/dice-notation@latest/dist/dice.min.js" type="text/javascript"></script>
```

Or include `dist/dice.min.js` or `dice.js` as appropriate in your webpage.

This will expose the global `Dice` API, or create a UMD module, if appropriate.

### NPM

```
npm install dice-notation-js
```

Then require or import it:
```
const Dice = require('dice-notation-js');
```

## Usage

Exposes two functions, `Dice()` and `Dice.parse()`.

### `Dice()`

**Syntax**:
- `Dice(notation [, randomFunction])`
- `Dice(number, type [, randomFunction])`

Takes a string of dice notation, or two numbers representing the number and type of dice to roll, and optionally a randomization function (that replaces `Math.random()`) and returns the result of the dice roll.

**Arguments**:
- `notation` (*string*): You can pass the funciton a string of dice notation, e.g., `3d6+2`, or `1d20`.
- `number` (*number*): You can pass the function a number of dice to roll and the number of sides each die should have. This argument is the number of dice to roll.
- `type` (*number*): You can pass the function a number of dice to roll and the number of sides each die should have. This argument is the number of sides each die should have.
- `randomFunction` (*function*) *optional*: You may pass a function that returns a random number between 0 and 1 that will be used in place of `Math.random()`, such as to use a seedable PRNG.

**Examples**

Basic use:
```javascript
// All of the following are functionally the same:

Dice('3d6+2');
Dice('3d6') + 2;
Dice(3, 6) + 2;
```

Using a seedable PRNG, such as [`seedrandom`](https://www.npmjs.com/package/seedrandom):
```javascript
const Dice = require('dice-notation-js');
const prng = require('seedrandom')('hello');

Dice('3d6+2', prng);
Dice('3d6', prng) + 2;
Dice(3, 6, prng) + 2;
```

### `Dice.parse()`

**Syntax**: `Dice.parse(notation)`

Takes a string of dice notation and returns an object parsed from it. For example, the notation `6d4-1` returns the following object:

```javascript
{
    number : 6,
    type : 4,
    modifier -1
}
```

**Arguments**:
- `notation` (*string*): You can pass the funciton a string of dice notation, e.g., `3d6+2`, or `1d20`.

**Examples**

Basic use:
```javascript
Dice.parse('1d10') // -> { number : 1, type : 10, modifier :  0 }
Dice.parse('3d6+2') // -> { number : 3, type : 6, modifier :  2 }
Dice.parse('2d4-1') // -> { number : 2, type : 4, modifier : -1 }
```