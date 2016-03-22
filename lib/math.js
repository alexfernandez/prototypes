'use strict';
/* jshint -W020 */

/**
 * Math-related functions and prototypes.
 * (C) 2014 Alex Fernández.
 */

// requires
var core = require('./core.js');

// globals
var unsafeParseInt;
var newNumber = {};


/**
 * Replace parseInt() with a safe version.
 */
if (!parseInt.newFunction)
{
	unsafeParseInt = parseInt;
	parseInt = safeParseInt;
	parseInt.newFunction = true;
}

/**
 * Safe version of parseInt() that does not do octal.
 */
function safeParseInt(value, base)
{
	if (base && base != 10)
	{
		return unsafeParseInt(value, base);
	}
	return unsafeParseInt(value, 10);
}

/**
 * Find out if the argument is a number.
 * http://stackoverflow.com/a/1830844/978796
 */
exports.isNumber = function(value)
{
	return !isNaN(parseFloat(value)) && isFinite(value);
};

/**
 * Compute the logarithm in base 10.
 */
Math.log10 = function(value)
{
	return Math.log(value) / Math.log(10);
};

/**
 * Converts a decimal degree to radians.
 */
newNumber.toRad = function()
{
	return this * Math.PI / 180;
};

// add functions to number as properties
core.addProperties(Number.prototype, newNumber);

