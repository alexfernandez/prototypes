'use strict';

/**
 * Extend a prototype with properties.
 * Prototypes for objects.
 * (C) 2013 Alex Fernández.
 */

// requires
require('./string.js');
var core = require('./core.js');

// globals
var newObject = {};

/**
 * Count the number of properties in an object. Params:
 *	- filter: can be a string that has to be contained in every key,
 *	or a function which will be used as a filter to pass keys.
 */
newObject.countProperties = function(filter)
{
	if (!filter)
	{
		return Object.keys(this).length;
	}
	var filterer = getFilterer(filter);
	var count = 0;
	for (var key in this)
	{
		if (!this.hasOwnProperty(key))
		{
			continue;
		}
		if (filterer(key))
		{
			count++;
		}
	}
	return count;
};

/**
 * Get a function to filter keys.
 */
function getFilterer(filter)
{
	if (typeof filter == 'function')
	{
		return filter;
	}
	return function(key)
	{
		return key.contains(filter);
	};

}

/**
 * Overwrite properties in the original with the given object.
 */
newObject.overwriteWith = function(overwriter)
{
	for (var key in overwriter)
	{
		var value = overwriter[key];
		if (value !== undefined)
		{
			this[key] = value;
		}
	}
	return this;
};

/**
 * Return a new object that contains the properties of this and the parameter object.
 */
newObject.concat = function(object)
{
	var result = {};
	result.overwriteWith(this);
	result.overwriteWith(object);
	return result;
};

/**
 * Call the callback for each property of the object.
 */
newObject.forEach = function(callback)
{
	for (var key in this)
	{
		callback(this[key], key, this);
	}
};

/**
 * Return a new object with just the properties that pass the callback.
 */
newObject.filterIn = function(callback)
{
	if (this.isArray())
	{
		return this.filter(callback);
	}
	var result = {};
	for (var key in this)
	{
		var value = this[key];
		if (callback(value))
		{
			result[key] = value;
		}
	}
	return result;
};

/**
 * Return a new object with just the properties that *do not* pass the callback.
 */
newObject.filterOut = function(callback)
{
	return this.filterIn(function(element)
	{
		return (!callback(element));
	});
};

/**
 * Find out if the object is an array.
 */
newObject.isArray = function()
{
	return Array.isArray(this);
};

/**
 * Return an array with the property values.
 * If already an array, returns the unmodified array.
 */
newObject.toArray = function()
{
	if (this.isArray())
	{
		return this;
	}
	var result = [];
	this.forEach(function(value)
	{
		result.push(value);
	});
	return result;
};

// add new object functions as properties
core.addProperties(Object.prototype, newObject);

