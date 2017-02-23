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
var NewObject = {};

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

newObject.hasProperties = function()
{
	for (var key in this)
	{
		if (this.hasOwnProperty(key))
		{
			return true;
		}
	}
	return false;
}

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
	if (Array.isArray(this))
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
 * For each property in the mapping object, if 'this' has a property of the same name, then the name of the property in 'this'
 * is renamed to the value corresponding to the property from the mapping object.
 * Example:
 * var bla = {'yo': 'hi', 'bo': 'hi'};
 * bla.renameProperties({'bo': 'do'});
 * THEN 
 * bla.hasOwnProperty('do') === true
 * bla.do === 'hi'
 */
newObject.renameProperties = function(mappingObject)
{
	var self = this;
	
	newObject.forEach.call(mappingObject, function(newPropertyName, oldPropertyName)
	{
	    if (self.hasOwnProperty(oldPropertyName)) 
	    {
	    	self[newPropertyName] = self[oldPropertyName];
	        delete self[oldPropertyName];
	    }
	});

	return self;
};

/**
 * Get all values for a parameter object in an array.
 * Note: operates on the global Object, not on the prototype.
 */
NewObject.values = function(object)
{
	var keys = Object.keys(object);
	return keys.map(function(key)
	{
		return object[key];
	});
};

// add new object functions as properties
core.addProperties(Object.prototype, newObject);
core.addProperties(Object, NewObject);

