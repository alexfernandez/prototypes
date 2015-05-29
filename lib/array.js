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
newArray.unique = function() {
	var result = [], index = -1, value = null;
	while(++index < this.length) {
		value = this[index];
		if((value || value === 0) && !result.contains(value)) {
			result.push(value);
		}
	}
	return result.sort();
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
 */
newArray.first = function()
{
	return this[0];
};

/**
 * Return the first element of an array, or undefined
 * for an empty array.
 */
newArray.last = function()
{
	return this[this.length - 1];
};

/**
 * Returns the intersection of an array with another given
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
 * Returns the difference between the array and another given
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

