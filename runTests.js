'use strict';

/**
 * Run package tests.
 * (C) 2013 Alex Fernández.
 */

// requires
var testing = require('testing');


/**
 * Test that new objects, strings, arrays, numbers
 * and regular expressions have no enumerable properties.
 */
function testObjectsAreClean(callback)
{
	assertIsClean({}, callback);
	assertIsClean('', callback);
	assertIsClean([], callback);
	assertIsClean(41.5, callback);
	assertIsClean(/abc/, callback);

	testing.success(callback);
}

function assertIsClean(newObject, callback) {
    for (var key in newObject) {
		testing.failure('New object %j has enumerable property %s', newObject, key, callback);
    }
}

/**
 * Run all module tests.
 */
exports.test = function(callback)
{
	var tests = {};
	tests.objectsAreCleanBeforeLoadingLibrary = testObjectsAreClean;
	var files = [ 'core', 'string', 'array', 'math', 'object' ];
	files.forEach(function(file)
	{
		tests[file] = require('./test/' + file + '.js').test;
	});
	tests.objectsAreCleanAfterLoadingLibrary = testObjectsAreClean;

	testing.run(tests, callback);
};

// run tests if invoked directly
if (__filename == process.argv[1])
{
	exports.test(testing.show);
}

