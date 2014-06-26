'use strict';

/**
 * Extend a prototype with properties.
 * Prototypes for objects.
 * (C) 2013 Alex Fernández.
 */

// requires
require('./string.js');
var core = require('./core.js');
var testing = require('testing');

// globals
var newObject = {};

/**
 * Count the number of properties in an object. Params:
 *	- filter: can be a string that has to be contained in every key,
 *	or a function which will be used as a filter to pass keys.
 */
newObject.countProperties = function(filter)
{
	if (!filter)
	{
		return Object.keys(this).length;
	}
	var filterer = getFilterer(filter);
	var count = 0;
	for (var key in this)
	{
		if (!this.hasOwnProperty(key))
		{
			continue;
		}
		if (filterer(key))
		{
			count++;
		}
	}
	return count;
};

/**
 * Get a function to filter keys.
 */
function getFilterer(filter)
{
	if (typeof filter == 'function')
	{
		return filter;
	}
	return function(key)
	{
		return key.contains(filter);
	};

}

/**
 * Test counting properties.
 */
function testCountProperties(callback)
{
	var object = {
		hello: 'a',
	};
	testing.assertEquals(object.countProperties(), 1, 'Invalid property count', callback);
	testing.assertEquals(object.countProperties('ll'), 1, 'Invalid filtered property count', callback);
	testing.assertEquals(object.countProperties('pk'), 0, 'Invalid non-filtered property count', callback);
	testing.assertEquals(object.countProperties(getFilter(5)), 1, 'Invalid length property count', callback);
	testing.assertEquals(object.countProperties(getFilter(3)), 0, 'Invalid length property count', callback);
	testing.success(callback);
}

/**
 * Get a filter for keys with the given length.
 */
function getFilter(length)
{
	return function(key)
	{
		return key.length == length;
	};
}

/**
 * Overwrite properties in the original with the given object.
 */
newObject.overwriteWith = function(overwriter)
{
	for (var key in overwriter)
	{
		var value = overwriter[key];
		if (value !== undefined && value !== null)
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
	testing.assertEquals(first.countProperties(), 3, 'Overwritten should have 3 properties', callback);
	testing.assertEquals(first.b, 'b2', 'Property in first should be replaced with second', callback);
	first.overwriteWith(undefined);
	testing.assertEquals(first.countProperties(), 3, 'Overwritten with undefined should have 3 properties', callback);
	var third = {
		u: null,
		v: undefined,
		w: 0,
	};
	first.overwriteWith(third);
	testing.assertEquals(first.countProperties(), 4, 'Overwritten with third should have 4 properties', callback);
	testing.assert(first.w === 0, 'Overwritten with 0 should be there', callback);
	testing.success(callback);
}

// add new object functions as properties
core.addProperties(Object.prototype, newObject);

/**
 * Run package tests.
 */
exports.test = function(callback)
{
	var tests = [
		testCountProperties,
		testOverwriteObject,
	];
	testing.run(tests, callback);
};

// run tests if invoked directly
if (__filename == process.argv[1])  
{
	exports.test(testing.show);
}

