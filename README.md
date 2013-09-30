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

## String Prototypes

The following string prototypes are provided.

### startsWith(str)

Check that the current string starts with the given substring. Example:

    'pepitus'.startsWith('pep');
      \=> true

### endsWith(str)

Check that the current string ends with the given substring. Example:

    'pepitus'.startsWith('tus');
      \=> true

### substringUpTo(str)

Return the piece of string until the argument is found. Example:

    'hi.there'.substringUpTo('.');
       \=> 'hi'

### substringUpToLast(str)

Return the piece of string until the last occurrence of the argument. Example:

    'hi.there.you'.substringUpToLast('.');
       \=> 'hi.there'

### substringFrom(str)

Return the piece of string starting with the argument; empty string if not found.
Example:

    'hi.there'.substringFrom('.');
       \=> 'there'

### contains(str)

Find out if the string contains the argument at any position.
Example:

    'abcde'.contains('bcd');
       \=> true

### replaceAll(str)

Replace all occurrences of a string with the replacement.
Example:

    'pepitus'.replaceAll('p', 'c');
       \=> 'cecitus'

### repeat(number)

Repeat the given string a few times.
Example:

    'ab'.repeat(3);
       \=> 'ababab'


