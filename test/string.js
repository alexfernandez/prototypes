'use strict';

/**
 * Test prototypes for strings.
 * (C) 2014 Alex Fernández.
 */

// requires
require('../lib/string.js');
var testing = require('testing');


/**
 * Run tests for regexp make global.
 */
function testGlobalRegExp(callback)
{
	var regexp = /p/i;
	var original = 'PepE';
	var global = regexp.makeGlobal();
	var replaced = original.replace(global, 'k');
	testing.assertEquals(replaced, 'kekE', 'Failed to make global expression', callback);
	testing.success(callback);
}

/**
 * Run tests for start and end with.
 */
function testStartsEndsWith(callback)
{
	testing.assert('pepito'.startsWith('pe'), 'Failed to match using startsWith()', callback);
	testing.assert(!'pepito'.startsWith('po'), 'Invalid match using startsWith()', callback);
	testing.assert('pepito'.endsWith('to'), 'Failed to match using endsWith()', callback);
	testing.assert(!'pepito'.startsWith('po'), 'Invalid match using endsWith()', callback);
	testing.success(callback);
}

/**
 * Test contains.
 */
function testContains(callback)
{
	testing.assert('abcde'.contains('bcd'), 'Contains included', callback);
	testing.assert(!'abcde'.contains('dcb'), 'Not contains excluded', callback);
	testing.assert('abCDe'.containsIgnoreCase('BcD'), 'Contains ignore case included', callback);
	testing.assert(!'aBCde'.containsIgnoreCase('DcB'), 'Not contains ignore case excluded', callback);
	testing.success(callback);
}

/**
 * Run tests for substrings.
 */
function testSubstrings(callback)
{
	testing.assertEquals('hi.there.you'.substringUpTo('.'), 'hi', 'String.substringUpTo() not working!', callback);
	testing.assertEquals('hi.there.you'.substringUpToLast('.'), 'hi.there', 'String.substringUpToLast() not working!', callback);
	testing.assertEquals('hi.there.you'.substringFrom('.'), 'there.you', 'String.substringFrom() not working!', callback);
	testing.assertEquals('hi.there.you'.substringFromLast('.'), 'you', 'String.substringFromLast() not working!', callback);
	testing.success(callback);
}

/**
 * Test replace all.
 */
function testReplaceAll(callback)
{
	testing.assertEquals('pepito'.replaceAll('p', 'c'), 'cecito', 'Invalid replaceAll()', callback);
	testing.assertEquals('ababab'.replace('a', 'x'), 'xbabab', 'Invalid replacement', callback);
	testing.assertEquals('ababab'.replaceAll('a', 'x'), 'xbxbxb', 'Invalid replacement for all', callback);
	testing.assertEquals('pepito'.replaceAll(/p/, 'c'), 'cecito', 'Invalid replaceAll() with //', callback);
	testing.success(callback);
}

function testReplaceIgnoreCase(callback)
{
	testing.assertEquals('Pepito'.replaceIgnoreCase('p', 'c'), 'cepito', 'Invalid replace ignore case', callback);
	testing.assertEquals('Pepito'.replaceIgnoreCase('P', 'C'), 'Cepito', 'Invalid replace ignore case', callback);
	testing.assertEquals('Pepito'.replaceIgnoreCase('ii', 'c'), 'Pepito', 'Invalid replace ignore case', callback);
	testing.assertEquals('Pepito'.replaceIgnoreCase('p', 'CH'), 'CHepito', 'Invalid replace ignore case', callback);
	testing.assertEquals('Pepito'.replaceIgnoreCase('ep', 'acurl'), 'Pacurlito', 'Invalid replace ignore case', callback);
	testing.success(callback);
}

function testReplaceAllIgnoreCase(callback)
{
	testing.assertEquals('Pepito'.replaceAllIgnoreCase('p', 'c'), 'cecito', 'Invalid replace ignore case', callback);
	testing.assertEquals('Pepito'.replaceAllIgnoreCase('P', 'C'), 'CeCito', 'Invalid replace ignore case', callback);
	testing.assertEquals('Pepito'.replaceAllIgnoreCase('ii', 'c'), 'Pepito', 'Invalid replace ignore case', callback);
	testing.assertEquals('Pepito'.replaceAllIgnoreCase('p', 'CH'), 'CHeCHito', 'Invalid replace ignore case', callback);
	testing.assertEquals('Pepecito'.replaceAllIgnoreCase('pe', 'cor'), 'corcorcito', 'Invalid replace ignore case', callback);
	testing.success(callback);
}

function testRepeat(callback)
{
	for (var i = 0; i < 10; i++)
	{
		testing.assertEquals('p'.repeat(i).length, i, 'Invalid repeat p.', callback);
	}
	testing.success(callback);
}

function testPad(callback)
{
	testing.assertEquals('1'.pad(2, '0'), '01', 'Invalid numeric padding', callback);
	testing.assertEquals(' a'.pad(3, 'p'), 'p a', 'Invalid string padding', callback);
	testing.assertEquals('a'.pad(3), '  a', 'Invalid default padding', callback);
	testing.assertEquals('aaaa'.pad(2), 'aaaa', 'Truncated padding', callback);
	testing.success(callback);
}

function testFormat(callback)
{
	var formatted = 'I am %s'.format('Bill');
	testing.assertEquals(formatted, 'I am Bill', 'Invalid simple format', callback);
	formatted = 'Hi %s, %j'.format('a', {});
	testing.assertEquals(formatted, 'Hi a, {}', 'Invalid complex format', callback);
	testing.success(callback);
}

function testEscape(callback)
{
	testing.assertEquals('a%b'.escapeForWeb(), 'a%25b', 'Invalid escape for web', callback);
	testing.assertEquals('a%25b'.unescapeForWeb(), 'a%b', 'Invalid escape for web', callback);
	var string = 'Hi, mi name is Pepíto';
	testing.assertEquals(string.escapeForWeb().unescapeForWeb(), string, 'Invalid escape + unescape', callback);
	testing.success(callback);
}

function testEscapeAndUnescape(callback)
{
	var input = '~!@#$%^&*(){}[]=:/,;?+\'"\\';
	var escaped = input.escapeForWeb();
	testing.assertEquals(escaped, '%7E%21@%23%24%25%5E%26*%28%29%7B%7D%5B%5D%3D%3A%2F%2C%3B%3F%2B%27%22%5C', 'Invalid escaped text with symbols', callback);
	var firstPass = escaped.unescapeForWeb();
	testing.assertEquals(firstPass, input, 'Invalid escape + unescape with symbols', callback);
	testing.assertEquals(input, firstPass.unescapeForWeb(), 'Invalid escape + unescape + unescape with symbols', callback);
	testing.success(callback);
}

function testHashCode(callback)
{
	testing.assertNotEquals('a'.hashCode(), 'b'.hashCode(), 'a and b have same hash code', callback);
	testing.success(callback);
}

function testCreateToken(callback)
{
	var tokens = {};
	var token;
	for (var i = 0; i < 1000; i++)
	{
		token = String.createToken(i);
		testing.assert(!tokens[token], 'Repeated token', callback);
		tokens[token] = true;
	}
	for (i = 0; i < 1000; i++)
	{
		token = String.createToken();
		testing.assert(!tokens[token], 'Repeated token', callback);
		tokens[token] = true;
	}
	testing.success(callback);
}

/**
 * Run package tests.
 */
exports.test = function(callback)
{
	var tests = [
		testGlobalRegExp,
		testStartsEndsWith,
		testSubstrings,
		testContains,
		testReplaceAll,
		testReplaceIgnoreCase,
		testReplaceAllIgnoreCase,
		testRepeat,
		testPad,
		testFormat,
		testEscape,
		testEscapeAndUnescape,
		testHashCode,
		testCreateToken,
	];
	testing.run(tests, callback);
};

// run tests if invoked directly
if (__filename == process.argv[1])  
{
	exports.test(testing.show);
}

