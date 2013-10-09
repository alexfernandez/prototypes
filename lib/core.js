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
			writable: true,
		}); 
	}
};

/**
 * Test that added properties do not show in enumeration.
 */
function testEnumerateProperties(callback)
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
 * Test that the new properties can be overwritten.
 */
function testOverwriteProperties(callback)
{
	var newObject = {
		one: function()
		{
			return 0;
		},
	};
	var object = {
		a: 'a',
	};
	exports.addProperties(Object.prototype, newObject);
	testing.assertEquals(object.one(), 0, 'Property not set', callback);
	object.one = function()
	{
		return 1;
	};
	testing.assertEquals(object.one(), 1, 'Property not overwritten', callback);
	testing.success(callback);
}

/**
 * Run package tests.
 */
exports.test = function(callback)
{
	var tests = {
		enumerateProperties: testEnumerateProperties,
		overwrite: testOverwriteProperties,
	};
	testing.run(tests, callback);
};

// run tests if invoked directly
if (__filename == process.argv[1])  
{
	exports.test(testing.show);
}

