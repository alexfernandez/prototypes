'use strict';

/**
 * Export all prototypes.
 * (C) 2013 Alex Fernández.
 */

// requires
require('./lib/string.js');
require('./lib/array.js');
var mathLib = require('./lib/math.js');
var objectLib = require('./lib/object.js');

// exports
exports.overwriteWith(objectLib);
exports.overwriteWith(mathLib);
