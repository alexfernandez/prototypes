[![Build Status](https://secure.travis-ci.org/alexfernandez/prototypes.png)](http://travis-ci.org/alexfernandez/prototypes)

# prototypes

Some common prototypes for node.js.

## Installation

Simply install using npm:

    npm install prototypes

Or add to the dependencies of your project in your `package.json`.

## Usage

This package adds some useful prototypes to String.
To use in your package, you just have to require prototypes:

    require('prototypes');

You do not need to assign the result to any variable, and in fact JSHint
(and similar code checkers) may complain about an unused variable if you
do this:

    var prototypes = require('prototypes');

This last form is required if you use any of the exported object functions.

## String Prototypes

The following string prototypes are provided.

### string.startsWith(str)

Check that the current string starts with the given substring. Example:

    'pepitus'.startsWith('pep');
      \=> true

### string.endsWith(str)

Check that the current string ends with the given substring. Example:

    'pepitus'.startsWith('tus');
      \=> true

### string.substringUpTo(str)

Return the piece of string until the argument is found. Example:

    'hi.there'.substringUpTo('.');
       \=> 'hi'

### string.substringUpToLast(str)

Return the piece of string until the last occurrence of the argument. Example:

    'hi.there.you'.substringUpToLast('.');
       \=> 'hi.there'

### string.substringFrom(str)

Return the piece of string starting with the argument; empty string if not found.
Example:

    'hi.there'.substringFrom('.');
       \=> 'there'

### string.substringFromLast(str)

Return the piece from the last occurrence of the argument; empty string if not found.
Example:

    'hi.there.you'.substringFromLast('.');
       \=> 'you'

### string.contains(str)

Find out if the string contains the argument at any position.
Example:

    'abcde'.contains('bcd');
       \=> true

### string.replaceAll(str, replacement)

Replace all occurrences of a string with the replacement.
Example:

    'pepitus'.replaceAll('p', 'c');
       \=> 'cecitus'

### string.repeat(number)

Repeat the given string a few times.
Example:

    'ab'.repeat(3);
       \=> 'ababab'

### string.capitalize()

Capitalize a string: first letter upper case, rest as is.
Example:

    'hello'.capitalize();
       \=> 'Hello'

## Object Functions

For objects it is not wise to overwrite `Object.prototype`, since it will
probably break all code that does not check for hasOwnProperty().
See [MSDN help](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty).
Therefore a few utility functions are provided.

### countProperties(object)

Count the number of properties in an object.
Does not count inherited properties: uses hasOwnProperty().
Example:

    prototypes.countProperties({a: 'a'});
      \=> 1

### overwriteObject(original, overwrite)

Overwrite properties in the original with the given object.
Example:

    prototypes.overwriteObject({a: 'a'}, {b: 'b'});
      \=> {a: 'a', b: 'b'}

## Math-related Functions

There are math functions in `Math`, in `Number.prototype` and even as globals,
e.g. `parseInt()`.

### parseInt(string)

By default parseInt() requires a radix (or base), or it will recreate the radix itself:
if the string starts with a leading zero,
then it interprets that you are parsing an octal number.

    // unsafe parseInt()
    parseInt('010');
      \=> 8

This library replaces the global function with a safe version that uses radix 10
unless told otherwise.
The last person that wanted to convert octal with leading zeroes
is probably programming in Lisp anyway.
Example:

    parseInt('010');
      \=> 10

### Math.log10(number)

Logarithm in base 10. Example:

    Math.log10(10);
      \=> 1

### number.toRad()

Convert a number in degrees to radians. Example:

    var n = 180;
    n.toRad();
      \=> 3.141592653589793

