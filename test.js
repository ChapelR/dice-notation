/* jshint esversion: 6, node: true, mocha: true */
const dice = require('./dice.js');
const prng = require('seedrandom')('hello');
const assert = require('assert');

describe('Dice()', function () {
    it('should roll the indicated die from notation', function () {
        assert.strictEqual(4, dice('1d6', prng));
    });
    it('should roll the indicated die from numbers', function () {
        assert.strictEqual(3, dice(1, 6, prng));
    });
    it('should roll the indicated die an indicated number of times from notation', function () {
        assert.strictEqual(12, dice('3d6', prng));
    });
    it('should roll the indicated die an indicated number of times from numbers', function () {
        assert.strictEqual(17, dice(3, 6, prng));
    });
    it('should accept modifiers', function () {
        assert.strictEqual(15, dice('3d6+2', prng));
    });
    it('should use Math.random() when no random function is provided', function () {
        assert.ok(dice('1d6') < 7);
    });
    it('should throw on bad constructions', function () {
        assert.throws(() => dice('0d6'));
        assert.throws(() => dice('1d0'));
        assert.throws(() => dice('Fd6'));
        assert.throws(() => dice('1d'));
        assert.throws(() => dice('hi'));
        assert.throws(() => dice(0, 6));
        assert.throws(() => dice(1, 0));
        assert.throws(() => dice(1));
        assert.throws(() => dice(null));
        assert.throws(() => dice('hello', 6));
    });
});

describe('Dice.parse()', function () {
    const parse = dice.parse('3d6');
    const parsePos = dice.parse('3d6+2');
    const parseNeg = dice.parse('3d6-2');
    it('should parse valid dice notation', function () {
        assert.strictEqual(3, parse.number);
        assert.strictEqual(6, parse.type);
        assert.strictEqual(0, parse.modifier);
    });
    it('should parse valid dice notation with positive modifiers', function () {
        assert.strictEqual(3, parsePos.number);
        assert.strictEqual(6, parsePos.type);
        assert.strictEqual(2, parsePos.modifier);
    });
    it('should parse valid dice notation with negative modifiers', function () {
        assert.strictEqual(3, parseNeg.number);
        assert.strictEqual(6, parseNeg.type);
        assert.strictEqual(-2, parseNeg.modifier);
    });
});