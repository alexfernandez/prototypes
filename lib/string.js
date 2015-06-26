'use strict';

/**
 * Prototypes for strings.
 * (C) 2013 Alex Fernández.
 */

// requires
var util = require('util');
var core = require('./core.js');

// globals
var newRegExp = {};
var newString = {};

/**
 * Make a new regular expression which is global.
 */
newRegExp.makeGlobal = function()
{
	var options = 'g';
	options += this.ignoreCase ? 'i' : '';
	options += this.multiline ? 'm' : '';
	options += this.sticky ? 'y' : '';
	return new RegExp(this.source, options);
};

// add new functions to regexp prototype
core.addProperties(RegExp.prototype, newRegExp);

/**
 * Find out if the string has the parameter at the beginning.
 */
newString.startsWith = function(str)
{
	return this.slice(0, str.length) == str;
};

/**
 * Find out if the string ends with the given parameter.
 */
newString.endsWith = function(str)
{
	return this.slice(this.length - str.length) == str;
};

/**
 * Find out if the string contains the argument at any position.
 */
newString.contains = function(str)
{
	return this.indexOf(str) != -1;
};

/**
 * Find out if the string contains the argument at any position,
 * ignoring case.
 */
newString.containsIgnoreCase = function(str)
{
	return this.toLowerCase().indexOf(str.toLowerCase()) != -1;
};

/**
 * Return the piece of string until the argument is found.
 * 'hi.there'.substringUpTo('.') => 'hi'
 */
newString.substringUpTo = function(str)
{
	if (!this.contains(str))
	{
		return this;
	}
	return this.slice(0, this.indexOf(str));
};

/**
 * Return the piece of string up until the last occurrence of the argument.
 * 'hi.there.you'.substringUpToLast('.') => 'hi.there'
 */
newString.substringUpToLast = function(str)
{
	if (!this.contains(str))
	{
		return this;
	}
	return this.slice(0, this.lastIndexOf(str));
};

/**
 * Return the piece of string starting with the argument; empty string if not found.
 * 'hi.there'.substringFrom('.') => 'there'
 */
newString.substringFrom = function(str)
{
	if (!this.contains(str))
	{
		return '';
	}
	return this.slice(this.indexOf(str) + str.length);
};

/**
 * Return the piece from the last occurrence of the argument; empty string if not found.
 * 'hi.there.you'.substringFromLast('.') => 'you'
 */
newString.substringFromLast = function(str)
{
	if (!this.contains(str))
	{
		return '';
	}
	return this.slice(this.lastIndexOf(str) + str.length);
};

/**
 * Replace all occurrences of a string with the replacement.
 */
newString.replaceAll = function(find, replace)
{
	if (typeof find == 'string')
	{
		return this.split(find).join(replace);
	}
	if (util.isRegExp(find))
	{
		return this.replace(find.makeGlobal(), replace);
	}
	return this.replace(find, replace);
};

newString.replaceIgnoreCase = function(find, replace, initialPos)
{
	if (typeof find != 'string')
	{
		return null;
	}
	var lowerThis = this.toLowerCase();
	var lowerFind = find.toLowerCase();
	initialPos = initialPos || 0;
	var pos = lowerThis.indexOf(lowerFind, initialPos);
	if (pos == -1)
	{
		return this;
	}
	return this.slice(0, pos) + replace + this.slice(pos + find.length);
};

newString.replaceAllIgnoreCase = function(find, replace)
{
	if (typeof find != 'string')
	{
		return null;
	}
	var lowerThis = this.toLowerCase();
	var lowerFind = find.toLowerCase();
	var pos = lowerThis.indexOf(lowerFind);
	var result = this;
	var offset = 0;
	while (pos != -1)
	{
		result = result.slice(0, pos + offset) + replace + result.slice(pos + find.length + offset);
		offset += replace.length - find.length;
		pos = lowerThis.indexOf(lowerFind, pos + 1);
	}
	return result;
};

/**
 * Repeat the given string a few times.
 * Based on: http://stackoverflow.com/a/5450113/978796
 */
newString.repeat = function(count)
{
	if (count < 1)
	{
		return '';
	}
	var result = '', pattern = this.valueOf();
	while (count > 0)
	{
		if (count & 1)
		{
			result += pattern;
		}
		count >>= 1;
		pattern += pattern;
	}
	return result;
};

/**
 * Capitalize a string: first letter upper case, rest as is.
 */
newString.capitalize = function()
{
    return this.charAt(0).toUpperCase() + this.slice(1);
};

/**
 * Pad a string with the given character.
 */
newString.pad = function(length, character)
{
	character = character || ' ';
	return character.repeat(length - this.length) + this;
};

/**
 * Format a string using the same convention as `util.format()`:
 * `%s` represents a string value, `%j` converts to JSON, and so on.
 */
newString.format = function()
{
	var args = [this].concat(Array.prototype.slice.call(arguments, 0));
	return util.format.apply(null, args);
};

// add new string functions to string prototype
core.addProperties(String.prototype, newString);

