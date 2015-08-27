'use strict';

/**
 * Test object prototypes.
 * (C) 2014 Alex Fernández.
 */

// requires
require('../lib/object.js');
var testing = require('testing');


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
	testing.assertEquals(first.countProperties(), 5, 'Overwritten with third should have 4 properties', callback);
	testing.assert(first.w === 0, 'Overwritten with 0 should be there', callback);
	testing.success(callback);
}

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

function testValues(callback)
{
	var object = {
		first: 'a',
		second: 'b',
		1: 37,
		'a-b.c': {},
	};
	var values = Object.values(object);
	// strangely enough, Object.keys() returns property 1 first
	var expected = [37, 'a', 'b', {}];
	testing.assertEquals(values, expected, 'Invalid values()', callback);
	testing.success(callback);
}

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
		testValues,
	];
	testing.run(tests, callback);
};

// run tests if invoked directly
if (__filename == process.argv[1])  
{
	exports.test(testing.show);
}

