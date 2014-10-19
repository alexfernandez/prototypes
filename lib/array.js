'use strict';

/**
 * Extend a prototype with properties.
 * Prototypes for arrays.
 * (C) 2013 Alex Fernández.
 */

// requires
require('./string.js');
var core = require('./core.js');
var testing = require('testing');

// globals
var newArray = {};

/**
 * Returns true if the array contains the given element. Params:
 *	- element: the element to check.
 */
newArray.contains = function(element)
{
	if (!element)
	{
		return false;
	}
	return (this.indexOf(element) != -1);
};

function testContains(callback)
{
	var array = ['a', 'b'];
	testing.assert(array.contains('a'), 'Array should contain 1st element', callback);
	testing.assert(array.contains('b'), 'Array should contain 2nd element', callback);
	testing.assert(!array.contains('c'), 'Array should not contain element', callback);
	testing.success(callback);
}

/**
 * Remove an element from an array and return it if present;
 * otherwise returns null. Params:
 *	- element: the element to remove.
 */
newArray.remove = function(element)
{
	if (!element)
	{
		return undefined;
	}
	var index = this.indexOf(element);
	if (index == -1)
	{
		return undefined;
	}
	var removed = this.splice(index, 1);
	return removed[0];
};

function testRemove(callback)
{
	var array = ['a', 'b'];
	testing.assertEquals(array.remove('c'), undefined, 'Should not remove missing element', callback);
	testing.assertEquals(array.remove('b'), 'b', 'Should remove 2nd element', callback);
	testing.assertEquals(array, ['a'], 'Should not contain 2nd element', callback);
	testing.assertEquals(array.remove('a'), 'a', 'Should remove 1st element', callback);
	testing.assertEquals(array, [], 'Should not contain 1st element', callback);
	testing.success(callback);
}

// add new object functions as properties
core.addProperties(Object.prototype, newArray);

/**
 * Run package tests.
 */
exports.test = function(callback)
{
	var tests = [
		testContains,
		testRemove,
	];
	testing.run(tests, callback);
};

// run tests if invoked directly
if (__filename == process.argv[1])  
{
	exports.test(testing.show);
}

