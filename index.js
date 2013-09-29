'use strict';

/**
 * Export all prototypes.
 * (C) 2013 Alex Fernández.
 */


// requires
var stringLib = require('./lib/string.js');
var objectLib = require('./lib/object.js');

// exports
objectLib.overwriteObject(exports, stringLib);


