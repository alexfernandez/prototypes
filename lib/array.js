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
 * Count the number of properties in an object. Params:
 *	- filter: can be a string that has to be contained in every key,
 *	or a function which will be used as a filter to pass keys.
 */
newArray.contains = function(element)
{
	if (!element)
	{
		return false;
	}
	return (this.indexOf(element) != -1);
};

/**
 * Test array.contains().
 */
function testContains(callback)
{
	var array = ['a', 'b'];
	testing.assert(array.contains('a'), 'Array should contain 1st element', callback);
	testing.assert(array.contains('b'), 'Array should contain 2nd element', callback);
	testing.assert(!array.contains('c'), 'Array should not contain element', callback);
	testing.success(callback);
}

/**
 * Return a new array with only those elements that do not match the checker. Params:
 *	- checker: a function that checks all elements, and only lets through
 *	those for which the checker does _not_ return true.
 */
newArray.filterOut = function(checker)
{
	var result = [];
	this.forEach(function(element)
	{
		if (!checker(element))
		{
			result.push(element);
		}
	});
	return result;
};

function testFilterOut(callback)
{
	var array = ['a', 'b', 'c', 'd1', 'd2'];
	var stringified = JSON.stringify(array);
	var removed = array.filterOut(function(element)
	{
		return element.startsWith('d');
	});
	testing.assertEquals(array.length, 5, 'Original array shortened', callback);
	testing.assertEquals(JSON.stringify(array), stringified, 'Original array modified', callback);
	testing.assertEquals(removed.length, 3, 'Elements not removed', callback);
	testing.assert(!removed.contains('d1'), 'Wrong first element not filtered', callback);
	testing.assert(!removed.contains('d2'), 'Wrong second element not filtered', callback);
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
		testFilterOut,
	];
	testing.run(tests, callback);
};

// run tests if invoked directly
if (__filename == process.argv[1])  
{
	exports.test(testing.show);
}

