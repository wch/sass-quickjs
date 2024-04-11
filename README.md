dart-sass with QuickJS
======================

This is an attempt to run dart-sass using QuickJS.

Steps:

Get the QuickJS command line tool. An easy way to do this is to simply download the cosmopolitan binary from the QuickJS page and unzip it: https://bellard.org/quickjs/

Then run:

```
qjs --module sass.js test.scss
```

To compile Bootstrap 5, I needed to use a larger stack size:

```
qjs --stack-size 1000000 sass.js bootstrap.scss
```

Note: There currently seems to be a bug handling comments with Bootstrap. This may be due to the workarounds that I added (see Notes section below) not being quite right.


## Compile to standalone executable

This will compile it to a standalone binary file named `sass`:

```
qjsc -S 1000000 -m -o sass sass.js
```

Then the binary can be used like this:

```
./sass test.scss
```

## Notes

There is a [bug in QuickJS](https://github.com/bellard/quickjs/issues/275) that I worked around by modifying code in sass.dart.js. Once QuickJS fixes this bug, those workarounds shouldn't be needed anymore.

The QuickJS environment is missing some common things from a browser or NodeJS runtime, like `URL()` and `console.error`. Some of those things also needed to be added explicitly to `globalThis`. These things are done in `utils.js`.
