'use strict';

/**
 * Test prototypes for arrays.
 * (C) 2014 Alex Fernández.
 */

// requires
require('../lib/array.js');
var testing = require('testing');


function testContains(callback)
{
	var array = ['a', 'b'];
	testing.assert(array.contains('a'), 'Array should contain 1st element', callback);
	testing.assert(array.contains('b'), 'Array should contain 2nd element', callback);
	testing.assert(!array.contains('c'), 'Array should not contain element', callback);
	testing.success(callback);
}

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

function testIntersection(callback)
{
	var arrayA = [1, 2, 3];
	var arrayB = [3, 4, 5];
	var arrayC = [4, 5, 6];
	var empty = [];
	testing.assertEquals(arrayA.intersect(arrayB), [3], 'Invalid intersection', callback);
	testing.assertEquals(arrayB.intersect(arrayC), [4,5], 'Invalid intersection', callback);
	testing.assertEquals(arrayA.intersect(arrayC), [], 'Invalid intersection', callback);
	testing.assertEquals(arrayA.intersect(empty), [], 'Invalid intersection', callback);
	testing.success(callback);
}

function testDifference(callback)
{
	var arrayA = [1, 2, 3];
	var arrayB = [3, 4, 5];
	var arrayC = [4, 5, 6];
	var empty = [];
	testing.assertEquals(arrayA.difference(arrayB), [1,2], 'Invalid difference', callback);
	testing.assertEquals(arrayB.difference(arrayC), [3], 'Invalid difference', callback);
	testing.assertEquals(arrayA.difference(arrayC), [1,2,3], 'Invalid difference', callback);
	testing.assertEquals(arrayA.difference(empty), [1,2,3], 'Invalid difference', callback);
	testing.success(callback);
}

function testToArray(callback)
{
	var object = {
		a: 1,
		b: 2,
		c: 3,
	};
	var converted = Array.toArray(object);
	var array = [1, 2, 3];
	testing.assertEquals(converted, array, 'Invalid converted array', callback);
	testing.assertEquals(Array.toArray(array) === array, true, 'Array should be returned unmodified', callback);
	testing.success(callback);
}

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
		testIntersection,
		testDifference,
		testToArray,
	];
	testing.run(tests, callback);
};

// run tests if invoked directly
if (__filename == process.argv[1])
{
	exports.test(testing.show);
}

