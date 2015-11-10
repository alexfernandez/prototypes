[![Build Status](https://secure.travis-ci.org/alexfernandez/prototypes.png)](http://travis-ci.org/alexfernandez/prototypes)

[![Package quality](http://packagequality.com/badge/prototypes.png)](http://packagequality.com/#?package=prototypes)

# prototypes

Some common prototypes for node.js: `string.startsWith()`,
`object.countProperties()` and more.
Functions are added using `Object.defineProperty()` to avoid polluting new objects.

Includes nice facilities for functional programming with objects:
`object.forEach()`, `object.filterIn()` and so on.

## Installation

Simply install using npm:

    npm install prototypes

Or add to the dependencies of your project in your `package.json`.

## Usage

This package adds some useful prototypes to `String`, `Object` and `Array`.
To use in your package, you just have to require prototypes:

    require('prototypes');

There is no need to assign the result to any variable, since the prototypes
are added automatically. It may in fact result in a warning in JSHint
or similar code checkers.

Special care has been taken to avoid nasty interactions with other libraries:
the new function prototypes don't appear in enumerations and can be overwritten
in your own code.

## String Prototypes

The following string prototypes are provided.

### string.startsWith(str)

Check that the current string starts with the given substring. Example:

    'pepitus'.startsWith('pep');
      \=> true

### string.endsWith(str)

Check that the current string ends with the given substring. Example:

    'pepitus'.endsWith('tus');
      \=> true

### string.substringUpTo(str)

Return the piece of string until the argument is found;
return the whole string if not found.
Example:

    'hi.there'.substringUpTo('.');
       \=> 'hi'

### string.substringUpToLast(str)

Return the piece of string until the last occurrence of the argument;
return the whole string if not found.
Example:

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

### string.containsIgnoreCase(str)

Find out if the string contains the argument at any position,
ignoring case.
Example:

    'aBcDe'.contains('bCd');
       \=> true

### string.replaceAll(str, replacement)

Replace all occurrences of a string with the replacement.
Example:

    'pepitus'.replaceAll('p', 'c');
       \=> 'cecitus'

### string.replaceIgnoreCase(str, replacement)

Replace the first occurrence of a string ignoring case with the replacement.
Example:

    'Pepitus'.replaceAll('p', 'c');
       \=> 'cecitus'

### string.replaceAllIgnoreCase(str, replacement)

Replace all occurrences of a string with the replacement,
ignoring case.
Example:

    'Pepitus'.replaceAll('p', 'cor');
       \=> 'corecoritus'

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

### string.format()

Format a string using the same convention as `util.format()`:
`%s` represents a string value, `%j` converts to JSON, and so on.
Example:

```
'Hi %s, %j'.format('a', {});
  \=> 'Hi a, {}'
```

## Object Prototypes

For objects some care must be taken before overwriting `Object.prototype`:
otherwise it might break all code that does not check for hasOwnProperty().
See [MDN help](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty).
In this library all extensions are done using `Object.defineProperty()`
which does not pollute objects as the new properties are not enumerable.
Again, see [MDN help](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).

### object.countProperties(filter)

Count the number of properties in an object.
Does not count inherited properties: uses Object.keys().
Example:

    {a: 'a'}.countProperties();
      \=> 1

You can also pass a string or a function as a filter:

    {hello: 'a'}.countProperties('ll');
      \=> 1

    {hello: 'a'}.countProperties(function(key) { return key.length == 5 });
      \=> 1

### object.overwriteWith(overwriter)

Overwrite properties in the original with the given object.
Example:

    {a: 'a'}.overwriteWith({b: 'b'});
      \=> {a: 'a', b: 'b'}

*Note*: properties which are `undefined` are not overwritten;
all others (including `null`) are. For instance:

    {a: 'a'}.overwriteWith({b: undefined, c: null});
      \=> {a: 'a', c: null}

### object.concat(otherObject)

Return a new object that includes properties of the object
and the other object. Does not modify the original object.
Example:

    {a: 'a'}.concat({b: 'b'});
      \=> {a: 'a', b: 'b'}

### object.forEach(callback)

Call the callback for every value of the object.
Similar to `array.forEach()`, the callback will receive three parameters:
value, key and the object itself.
Example:

```
{a: 1, b: 2}.forEach(function(value, key)
{
    console.log(key + ': ' + value);
});
  \=> a: 1
      b: 2
```

### object.filterIn(callback)

Return a new object that only includes those properties of the object
that return `true` for the given callback, i.e.:
`callback(value) == true`.
Does not modify the original object.
Works also on arrays, equivalent to `array.filter()`.
Example:

```
{a: 1, b: 2}.filterIn(function(value)
{
    return value > 1;
});
  \=> {b: 2}
```

### object.filterOut(callback)

Return a new object that only includes those properties of the object
that return `false` for the given callback, i.e.:
`callback(value) != true`.
Does not modify the original object.
Works also on arrays.
Example:

```
{a: 1, b: 2}.filterOut(function(value)
{
    return value > 1;
});
  \=> {a: 1}
```

## Object Functions

Functions added to `Object` are available to operate on parameter objects.

### Object.values(object)

Get an array with all values in the object. Example:

    Object.values({first: 'a', second: 'b'});
      \=> ['a', 'b']

## Array Prototypes

The following array prototypes are provided.

### array.contains(element)

Check if the array contains the given element. Example:

    ['a', 'b'].contains('a');
      \=> true

### array.remove(element)

Remove the element from the array if present, and return it.
If not present, returns null. Example:

```
var array = ['a', 'b'];
array.remove('a');
  \=> 'a'
array
  \=> ['b']
```

### array.filterIn(checker)

Inherited from `object.filterIn(checker)`, works also on arrays.
Identical to `array.filter(checker)`.

### array.filterOut(checker)

Inherited from `object.filterIn(checker)`, works also on arrays.
Similar to `array.filter()` but reversed. Example:

```
['a', 'b', 'c1', 'c2'].filterOut(function(element)
{
    return element.startsWith('c');
});
  \=> ['a', 'b']
```

### array.unique()

Returns a new sorted array of unique elements.
Throws out null and undefined elements. Example:

```
['c', 'a', 'b', 'c', 'b'].unique();
  \=> ['a', 'b', 'c']
```

### array.first()

Returns the first element of an array, or undefined
for an empty array. Example:

```
['a', 'b', 'c'].first();
  \=> 'a'
```

### array.last()

Returns the last element of an array, or undefined
for an empty array. Example:

```
['a', 'b', 'c'].last();
  \=> 'c'
```

### Array.toArray(object)

Return an array with the object property values. If already an array,
returns the unmodified array.
Example:

```
Array.toArray({a: 1, b: 2});
  \=> [1, 2]
```

*Note*: this function resides in the `Array` global like `Array.isArray()`,
instead of in individual arrays as the previous functions.
In versions up to 0.3.4 there were functions `object.toArray()` and `object.isArray()`,
but they were removed due to
[incompatibilities](https://github.com/alexfernandez/prototypes/issues/8) with lodash.

## Math-related Functions

There are math functions in `Math`, in `Number.prototype`, exported `isNumber`
and even as globals, e.g. `parseInt()`.

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
is probably programming in C anyway.
Example:

    parseInt('010');
      \=> 10

### isNumber(value)

The function isNumber() is based on
[this StackOverflow answer](http://stackoverflow.com/a/1830844/978796):
it checks if the parameter is a number.
Examples:

    var prototypes = require('prototypes');
    prototypes.isNumber(5);
      \=> true
    prototypes.isNumber('hi');
      \=> false

### Math.log10(number)

Logarithm in base 10. Example:

    Math.log10(10);
      \=> 1

### number.toRad()

Convert a number in degrees to radians. Example:

    var n = 180;
    n.toRad();
      \=> 3.141592653589793

## RegExp Prototypes

Prototypes used to enhance regular expressions (the RegExp prototype). Can also be used with the syntax
/.../.

### makeGlobal()

Returns a new regular expression which is always global.
Example:

    'pepitus'.replace(/p/.makeGlobal(), 'c');
      \=> 'cecitus'

## Acknowledgements

Thanks to my current employer [MediaSmart Mobile](http://www.mediasmart.es/) for their permission to reuse some of the prototypes we have cooked together.

Thanks to [William Wicks](https://github.com/williamwicks) for letting me
(even encouraging me to) plunder his [extensions](https://github.com/williamwicks/extensions) library.

### License

This package is published under the MIT license.
You can integrate it in any commercial, closed software and/or make changes to the code with complete liberty.
If you send your changes back to the main repo we will be grateful,
but it is by no means required.

