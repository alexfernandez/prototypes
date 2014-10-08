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

/**
 * Return a new object that contains the properties of this and the parameter object.
 */
newObject.concat = function(object)
{
	var result = {};
	result.overwriteWith(this);
	result.overwriteWith(object);
	return result;
};

function testConcat(callback)
{
	var first = {
		a: 'a',
		b: 'b',
	};
	var second = {
		c: 'b2',
		d: {d: 5},
	};
	var result = first.concat(second);
	testing.assertEquals(result.countProperties(), first.countProperties() + second.countProperties(), 'Invalid concat length', callback);
	for (var key in first)
	{
		testing.assertEquals(result[key], first[key], 'Invalid first key', callback);
	}
	for (key in second)
	{
		testing.assertEquals(result[key], second[key], 'Invalid second key', callback);
	}
	testing.success(callback);
}

/**
 * Call the callback for each property of the object.
 */
newObject.forEach = function(callback)
{
	for (var key in this)
	{
		callback(this[key], key, this);
	}
};

function testForEach(callback)
{
	var object = {
		a: 1,
		b: 2,
	};
	var count = 0;
	var total = 0;
	var keys = [];
	object.forEach(function(value, key)
	{
		count += 1;
		total += value;
		keys.push(key);
	});
	testing.assertEquals(count, 2, 'Invalid count', callback);
	testing.assertEquals(total, 3, 'Invalid total', callback);
	testing.assertEquals(keys, ['a', 'b'], 'Invalid keys', callback);
	testing.success(callback);
}

/**
 * Return a new object with just the properties that pass the callback.
 */
newObject.filterIn = function(callback)
{
	if (this.isArray())
	{
		return this.filter(callback);
	}
	var result = {};
	for (var key in this)
	{
		var value = this[key];
		if (callback(value))
		{
			result[key] = value;
		}
	}
	return result;
};

/**
 * Return a new object with just the properties that *do not* pass the callback.
 */
newObject.filterOut = function(callback)
{
	return this.filterIn(function(element)
	{
		return (!callback(element));
	});
};

function testFilter(callback)
{
	var object = {
		a: 1,
		b: 2,
		c: 3,
	};
	var filtered = object.filterIn(function(value)
	{
		return value < 3;
	});
	testing.assertEquals(filtered.countProperties(), 2, 'Invalid <3 count', callback);
	testing.assertEquals(filtered.a, 1, 'Invalid a in filtered', callback);
	testing.assertEquals(filtered.b, 2, 'Invalid b in filtered', callback);
	filtered = object.filterIn(function(value)
	{
		return value > 2;
	});
	testing.assertEquals(filtered.countProperties(), 1, 'Invalid >3 count', callback);
	testing.assertEquals(filtered.c, 3, 'Invalid c in filtered', callback);
	filtered = object.filterOut(function(value)
	{
		return value > 2;
	});
	testing.assertEquals(filtered.countProperties(), 2, 'Invalid !>3 count', callback);
	testing.assertEquals(filtered.a, 1, 'Invalid c in filtered out', callback);
	testing.success(callback);
}

/**
 * Find out if the object is an array.
 */
newObject.isArray = function()
{
	return Array.isArray(this);
};

/**
 * Return an array with the property values.
 * If already an array, returns the unmodified array.
 */
newObject.toArray = function()
{
	if (this.isArray())
	{
		return this;
	}
	var result = [];
	this.forEach(function(value)
	{
		result.push(value);
	});
	return result;
};

function testToArray(callback)
{
	var object = {
		a: 1,
		b: 2,
		c: 3,
	};
	var converted = object.toArray();
	var array = [1, 2, 3];
	testing.assertEquals(converted, array, 'Invalid converted array', callback);
	converted = array.toArray();
	testing.assertEquals(converted, array, 'Invalid reconverted array', callback);
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
		testConcat,
		testFilter,
		testForEach,
		testToArray,
	];
	testing.run(tests, callback);
};

// run tests if invoked directly
if (__filename == process.argv[1])  
{
	exports.test(testing.show);
}

