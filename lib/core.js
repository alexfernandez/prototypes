'use strict';

/**
 * Extend a prototype with properties.
 * (C) 2013 Alex Fernández.
 */

// requires
var testing = require('testing');


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

/**
 * Test that added properties do not show in enumeration.
 */
function testProperties(callback)
{
	var first = {};
	var second = {
		f: function() {},
	};
	exports.addProperties(first, second);
	for (var key in first)
	{
		testing.fail('Property %s should not appear in object', key, callback);
	}
	testing.success(callback);
}

/**
 * Run package tests.
 */
exports.test = function(callback)
{
	var tests = {
		testProperties: testProperties,
	};
	testing.run(tests, callback);
};

// run tests if invoked directly
if (__filename == process.argv[1])  
{
	exports.test(testing.show);
}

