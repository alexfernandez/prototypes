'use strict';

/**
 * Extend a prototype with properties.
 * Prototypes for objects.
 * (C) 2013 Alex Fernández.
 */

// requires
var testing = require('testing');
var Log = require('log');

// globals
var log = new Log('debug');


/**
 * Count the number of properties in an object.
 */
exports.countProperties = function(object)
{
	var count = 0;
	for (var key in object)
	{
		if (object.hasOwnProperty(key))
		{
			count++;
		}
	}
	return count;
};

/**
 * Test counting properties.
 */
function testCountProperties(callback)
{
	log.debug('Testing count properties');
	var object = {
		a: 'a',
	};
	testing.assertEquals(exports.countProperties(object), 1, 'Invalid property count', callback);
	testing.success(callback);
}

/**
 * Overwrite properties in the original with the given object.
 */
exports.overwriteObject = function(original, overwriter)
{
	if (!original)
	{
		return overwriter;
	}
	for (var key in overwriter)
	{
		var value = overwriter[key];
		if (value)
		{
			original[key] = value;
		}
	}
	return original;
};

/**
 * Test that overwrite object works.
 */
function testOverwriteObject(callback)
{
	log.debug('Testing overwrite object');
	var first = {
		a: 'a',
		b: 'b',
	};
	var second = {
		b: 'b2',
		c: {d: 5},
	};
	exports.overwriteObject(first, second);
	testing.assertEquals(exports.countProperties(first), 3, 'Overwritten should have three properties', callback);
	testing.assertEquals(first.b, 'b2', 'Property in first should be replaced with second', callback);
	testing.success(callback);
}

/**
 * Define new prototype functions as properties.
 */
exports.addProperties = function(original, extension)
{
	for (var key in extension)
	{
		Object.defineProperty(String.prototype, key, {
			value: extension[key],
		}); 
	}
}

/**
 * Run package tests.
 */
exports.test = function(callback)
{
	log.debug('Running tests');
	var tests = {
		countProperties: testCountProperties,
		overwrite: testOverwriteObject,
	};
	testing.run(tests, callback);
};

// run tests if invoked directly
if (__filename == process.argv[1])  
{
	exports.test(testing.show);
}

