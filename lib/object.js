'use strict';

/**
 * Extend a prototype with properties.
 * Prototypes for objects.
 * (C) 2013 Alex Fernández.
 */

// requires
var testing = require('testing');

// globals
var newObject = {};

/**
 * Count the number of properties in an object.
 */
newObject.countProperties = function()
{
	var count = 0;
	for (var key in this)
	{
		if (this.hasOwnProperty(key))
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
	var object = {
		a: 'a',
	};
	testing.assertEquals(object.countProperties(), 1, 'Invalid property count', callback);
	testing.success(callback);
}

/**
 * Overwrite properties in the original with the given object.
 */
newObject.overwriteWith = function(overwriter)
{
	for (var key in overwriter)
	{
		var value = overwriter[key];
		if (value)
		{
			this[key] = value;
		}
	}
	return this;
};

/**
 * Test that overwrite object works.
 */
function testOverwriteObject(callback)
{
	var first = {
		a: 'a',
		b: 'b',
	};
	var second = {
		b: 'b2',
		c: {d: 5},
	};
	first.overwriteWith(second);
	testing.assertEquals(first.countProperties(), 3, 'Overwritten should have three properties', callback);
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
		Object.defineProperty(original, key, {
			value: extension[key],
		}); 
	}
};

// add new object functions as properties
exports.addProperties(Object.prototype, newObject);

/**
 * Run package tests.
 */
exports.test = function(callback)
{
	var tests = {
		testCountProperties: testCountProperties,
		overwrite: testOverwriteObject,
	};
	testing.run(tests, callback);
};

// run tests if invoked directly
if (__filename == process.argv[1])  
{
	exports.test(testing.show);
}

