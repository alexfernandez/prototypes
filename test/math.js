'use strict';

/**
 * Test math-related functions and prototypes.
 * (C) 2014 Alex Fernández.
 */

// requires
var math = require('../lib/math.js');
var testing = require('testing');


/**
 * Test that parseInt() always uses base 10 unless so instructed.
 */
function testParseInt(callback)
{
	testing.assertEquals(parseInt('85'), 85, 'Decimal not interpreted', callback);
	testing.assertEquals(parseInt('0010'), 10, 'Octal interpreted', callback);
	testing.assertEquals(parseInt('10', 8), 8, 'Base 8 ignored', callback);
	testing.assert(isNaN(parseInt(undefined)), 'parseInt(undefined) should yield NaN', callback);
	testing.success(callback);
}

/**
 * Test the function isNumber().
 */
function testIsNumber(callback)
{
	testing.assert(math.isNumber(5), '5 should be number', callback);
	testing.assert(math.isNumber(0), '0 should be number', callback);
	testing.assert(math.isNumber(-1), '-1 should be number', callback);
	testing.assert(math.isNumber(1.1), '1.1 should be number', callback);
	testing.assert(math.isNumber(8e5), '8e5 should be number', callback);
	testing.assert(math.isNumber('1'), '"1" should be number', callback);
	testing.assert(math.isNumber('-1'), '"-1" should be number', callback);
	testing.assert(!math.isNumber(NaN), 'NaN should not be number', callback);
	testing.assert(!math.isNumber('a'), 'a should not be number', callback);
	testing.assert(!math.isNumber(' '), 'space should not be number', callback);
	testing.assert(!math.isNumber('\t\t'), 'tabs should not be number', callback);
	testing.success(callback);
}

/**
 * Test that log10 is working.
 */
function testLog10(callback)
{
	testing.assertEquals(Math.log10(10), 1, 'Wrong log 10 of 10', callback);
	testing.success(callback);
}

/**
 * Test that toRad() is working.
 */
function testToRad(callback)
{
	var n = 180;
	testing.assertEquals(n.toRad(), Math.PI, 'Wrong toRad() ', callback);
	testing.success(callback);
}

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

