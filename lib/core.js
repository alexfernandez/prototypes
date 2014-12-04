'use strict';

/**
 * Extend a prototype with properties.
 * (C) 2013 Alex Fernández.
 */


/**
 * Define new prototype functions as properties.
 */
exports.addProperties = function(original, extension)
{
	for (var key in extension)
	{
		if (original.hasOwnProperty(key))
		{
			continue;
		}
		Object.defineProperty(original, key, {
			value: extension[key],
			writable: true,
		}); 
	}
};

