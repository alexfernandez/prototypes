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

/*
* Returns a new sorted array of unique elements. Throws out null and undefined elements.
*/
newArray.unique = function() {
	var result = [], index = -1, value = null;
	while(++index < this.length) {
		value = this[index];
		if((value || value === 0) && !result.contains(value)) {
			result.push(value);
		}
	}
	return result.sort();
};

function testUnique(callback) {
	var array = [];
	testing.assertEquals(array.unique(), [], 'Array should be empty', callback);

	array = [4,1,6];
	testing.assertEquals(array.unique(), [1,4,6], '', callback);

	array = [4,1,6,9,0,5,9,9,9,9,5,5,5,1,1,4];
	testing.assertEquals(array.unique(), [0,1,4,5,6,9], '', callback);

	array = [null, null, 3, null, 3];
	testing.assertEquals(array.unique(), [3], 'Null test', callback);

	array = [0, undefined, null];
	testing.assertEquals(array.unique(), [0], 'Falsey test', callback);

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

/**
 * Return the first element of an array, or undefined
 * for an empty array.
 */
newArray.first = function()
{
	return this[0];
};

/**
 * Return the first element of an array, or undefined
 * for an empty array.
 */
newArray.last = function()
{
	return this[this.length - 1];
};

function testFirstLast(callback)
{
	var array = [1, 2, 3];
	testing.assertEquals(array.first(), 1, 'Invalid first element', callback);
	testing.assertEquals(array.last(), 3, 'Invalid last element', callback);
	var empty = [];
	testing.assertEquals(empty.first(), undefined, 'Invalid first empty element', callback);
	testing.assertEquals(empty.last(), undefined, 'Invalid last empty element', callback);
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
		testUnique,
		testRemove,
		testFirstLast,
	];
	testing.run(tests, callback);
};

// run tests if invoked directly
if (__filename == process.argv[1])  
{
	exports.test(testing.show);
}

