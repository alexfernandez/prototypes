'use strict';

/**
 * Extend a prototype with properties.
 * Prototypes for arrays.
 * (C) 2013 Alex Fernández.
 */

// requires
require('./string.js');
var core = require('./core.js');

// globals
var newArray = {};

/**
 * Returns true if the array contains the given element. Params:
 *	- element: the element to check.
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
 * Returns a new sorted array of unique elements. Throws out null and undefined elements.
 */
newArray.unique = function()
{
	var result = [];
	this.forEach(function(value)
	{
		if (value !== null && value !== undefined && !result.contains(value))
		{
			result.push(value);
		}
	});
	return result;
};

/**
 * Remove an element from an array and return it if present;
 * otherwise returns null. Params:
 *	- element: the element to remove.
 */
newArray.remove = function(element)
{
	if (!element)
	{
		return undefined;
	}
	var index = this.indexOf(element);
	if (index == -1)
	{
		return undefined;
	}
	var removed = this.splice(index, 1);
	return removed[0];
};

/**
 * Return the first element of an array, or undefined
 * for an empty array.
 * If a condition is passed, returns the first element
 * that satisfies the condition.
 */
newArray.first = function(condition)
{
	if (!condition)
	{
		return this[0];
	}
	for (var i = 0; i < this.length; i++)
	{
		var element = this[i];
		if (condition(element))
		{
			return element;
		}
	}
	return undefined;
};

/**
 * Return the first element of an array, or undefined
 * for an empty array.
 * If a condition is passed, returns the last element
 * that satisfies the condition.
 */
newArray.last = function(condition)
{
	if (!condition)
	{
		return this[this.length - 1];
	}
	for (var i = this.length - 1; i >= 0; i--)
	{
		var element = this[i];
		if (condition(element))
		{
			return element;
		}
	}
	return undefined;
};

/**
 * Returns the intersection of the array with the parameter.
 */
newArray.intersect = function (array) {
	if (!Array.isArray(array)) {
		return;
	}
	var intersection = [];
	var index = -1;
	while(++index < this.length) {
		if (array.contains(this[index])) {
			intersection.push(this[index]);
		}
	}
	return intersection;
};

/**
 * Returns the difference between the array and the parameter.
 */
newArray.difference = function (array) {
	var diff = [];
	var index = -1;
	while (++index < this.length) {
		if (!array.contains(this[index])) {
			diff.push(this[index]);
		}
	}
	return diff;
};

/**
 * Returns the array flattened just one level.
 */
newArray.concatAll = function()
{
	var result = [];
	for (var i = 0; i < this.length; i++)
	{
		var element = this[i];
		if (Array.isArray(element))
		{
			for (var j = 0; j < element.length; j++)
			{
				result.push(element[j]);
			}
		}
		else
		{
			result.push(element);
		}
	}
	return result;
};

/**
 * Returns the array flattened all the way.
 */
newArray.flatten = function()
{
	var result = [];
	for (var i = 0; i < this.length; i++)
	{
		var element = this[i];
		if (Array.isArray(element))
		{
			var flattened = element.flatten();
			for (var j = 0; j < flattened.length; j++)
			{
				result.push(flattened[j]);
			}
		}
		else
		{
			result.push(element);
		}
	}
	return result;
};

// add new object functions as properties
core.addProperties(Array.prototype, newArray);

/**
 * Return an array with the property values.
 * If already an array, returns the unmodified array.
 */
Array.toArray = function(object)
{
	if (!object)
	{
		return null;
	}
	if (Array.isArray(object))
	{
		return object;
	}
    return Object.keys(object).map(function(key) {
        return object[key];
    });
};

