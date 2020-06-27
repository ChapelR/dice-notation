( function (root, factory) {
    /* istanbul ignore next */
    if (typeof define === 'function') {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Dice = factory();
    }
} (this, function () {
    'use strict';

    var diceNotation = /(\d+?)d(\d+?)(.*)$/i;
    var modifier = /([+-])(\d+)/i;

    function compressNotation (notation) {
        return notation.trim().replace(/\s+/g, '');
    }

    function validNumber (n, err) {
        n = Number(n);
        if (Number.isNaN(n) || !Number.isInteger(n) || n < 1) {
            throw new Error(err);
        }
        return n;
    }

    function parse (notation) {
        var roll = compressNotation(notation).match(diceNotation), mod = 0;
        var msg = 'Invalid dice notation "' + notation + '" could not be parsed.';
        /* istanbul ignore next */
        if (roll.length < 3) {
            throw new Error('Invalid dice notation "' + notation + '" could not be parsed.');
        }
        if (roll[3] && modifier.test(roll[3])) {
            var modParts = roll[3].match(modifier);
            var basicMod = validNumber(modParts[2], msg);
            if (modParts[1].trim() === '-') {
                basicMod *= -1;
            }
            mod = basicMod;
        }
        
        roll[1] = validNumber(roll[1], msg);
        roll[2] = validNumber(roll[2], msg);
        return {
            number : roll[1],
            type : roll[2],
            modifier : mod
        };
    }

    function roll (a, b, rnd) {
        if (!rnd) {
            rnd = Math.random;
        }
        var rolls = [];
        var result = 0;
        for (var i = 0; i < a; i++) {
            var die = 0;
            die = Math.floor(rnd() * b) + 1;
            result += die;
            rolls.push(die);
        }
        return {
            rolls : rolls,
            result : result
        };
    }

    function rollMe (a, b, rnd) {
        var msg = 'Invalid values passed to dice roller.', toRoll = {};
        if (typeof a === 'string') {
            toRoll = parse(a);
        } else if (typeof a === 'number') {
            toRoll = {
                number : validNumber(a, msg),
                type : validNumber(b, msg),
                modifier : 0
            };
        } else {
            throw new Error(msg);
        }
        if (typeof b === 'function') {
            rnd = b;
        }
        var rolled = roll(toRoll.number, toRoll.type, rnd);
        rolled.result += toRoll.modifier;
        Object.assign(toRoll, rolled);
        return toRoll;
    }

    function Dice (a, b, rnd) {
        return rollMe(a, b, rnd).result;
    }

    function detailedRoll (a, b, rnd) {
        return rollMe(a, b, rnd);
    }

    Object.assign(Dice, {
        parse : parse,
        detailed : detailedRoll
    });

    return Dice;
}));