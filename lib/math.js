'use strict';
/* jshint -W020 */

/**
 * Math-related functions and prototypes.
 */

// requires
var testing = require('testing');
var core = require('./core.js');

// globals
var unsafeParseInt;
var newNumber = {};


/**
 * Replace parseInt() with a safe version.
 */
if (!parseInt.newFunction)
{
	unsafeParseInt = parseInt;
	parseInt = safeParseInt;
	parseInt.newFunction = true;
}

/**
 * Safe version of parseInt() that does not do octal.
 */
function safeParseInt(value, base)
{
	if (!value)
	{
		return 0;
	}
	if (base && base != 10)
	{
		return unsafeParseInt(value, base);
	}
	return unsafeParseInt(value, 10);
}

/**
 * Test that parseInt() always uses base 10 unless so instructed.
 */
function testParseInt(callback)
{
	testing.assertEquals(parseInt('85'), 85, 'Decimal not interpreted', callback);
	testing.assertEquals(parseInt('0010'), 10, 'Octal interpreted', callback);
	testing.assertEquals(parseInt('10', 8), 8, 'Base 8 ignored', callback);
	testing.success(callback);
}

/**
 * Find out if the argument is a number.
 * http://stackoverflow.com/a/1830844/978796
 */
exports.isNumber = function(value)
{
	return !isNaN(parseFloat(value)) && isFinite(value);
};

/**
 * Test the function isNumber().
 */
function testIsNumber(callback)
{
	testing.assert(exports.isNumber(5), '5 should be number', callback);
	testing.assert(exports.isNumber(0), '0 should be number', callback);
	testing.assert(exports.isNumber(-1), '-1 should be number', callback);
	testing.assert(exports.isNumber(1.1), '1.1 should be number', callback);
	testing.assert(exports.isNumber(8e5), '8e5 should be number', callback);
	testing.assert(exports.isNumber('1'), '"1" should be number', callback);
	testing.assert(exports.isNumber('-1'), '"-1" should be number', callback);
	testing.assert(!exports.isNumber(NaN), 'NaN should not be number', callback);
	testing.assert(!exports.isNumber('a'), 'a should not be number', callback);
	testing.assert(!exports.isNumber(' '), 'space should not be number', callback);
	testing.assert(!exports.isNumber('\t\t'), 'tabs should not be number', callback);
	testing.success(callback);
}

/**
 * Compute the logarithm in base 10.
 */
Math.log10 = function(value)
{
	return Math.log(value) / Math.log(10);
};

/**
 * Test that log10 is working.
 */
function testLog10(callback)
{
	testing.assertEquals(Math.log10(10), 1, 'Wrong log 10 of 10', callback);
	testing.success(callback);
}

/**
 * Converts a decimal degree to radians.
 */
newNumber.toRad = function()
{
	return this * Math.PI / 180;
};

/**
 * Test that toRad() is working.
 */
function testToRad(callback)
{
	var n = 180;
	testing.assertEquals(n.toRad(), Math.PI, 'Wrong toRad() ', callback);
	testing.success(callback);
}

// add functions to number as properties
core.addProperties(Number.prototype, newNumber);

/**
 * Run all module tests.
 */
exports.test = function(callback)
{
	testing.run([
		testParseInt,
		testIsNumber,
		testLog10,
		testToRad,
	], callback);
};

// run tests if invoked directly
if (__filename == process.argv[1])
{
	exports.test(testing.show);
}

