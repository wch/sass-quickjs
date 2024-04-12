dart-sass with QuickJS
======================

This is an attempt to run dart-sass using QuickJS.

Steps:

Get the QuickJS command line tool. An easy way to do this is to simply download the cosmopolitan binary from the QuickJS page and unzip it: https://bellard.org/quickjs/

Then run:

```
qjs sass.js examples/test.scss
```

To compile Bootstrap 5, I needed to use a larger stack size:

```
qjs --stack-size 1000000 sass.js bootstrap5/bootstrap.scss > bootstrap.css
```

Note: There currently seems to be a bug handling comments with Bootstrap. This may be due to the workarounds that I added (see Notes section below) not being quite right.


## Compile to standalone executable

This will compile it to a standalone binary file named `sass`:

```
qjsc -S 1000000 -o sass sass.js
```

Then the binary can be used like this:

```
./sass examples/test.scss
```

## Emit C source code

The following command will emit C source code which can be compiled into a standalone executable:

```
qjsc -S 1000000 -e -o sass.c sass.js
```

To compile to a binary, you will need to specify the include dir and library dir for QuickJS. These directories can typically be found by running `which qjsc` and searching around in the relative paths.

```
gcc -I /nix/store/f1sfjkih8mxyn2hh04gnz8zhkn8i79lq-quickjs-2021-03-27/include/quickjs -L /nix/store/f1sfjkih8mxyn2hh04gnz8zhkn8i79lq-quickjs-2021-03-27/lib/quickjs -lquickjs -o sass sass.c
```


## Notes

There is a [bug in QuickJS](https://github.com/bellard/quickjs/issues/275) that I worked around by modifying code in sass.dart.js. Once QuickJS fixes this bug, those workarounds shouldn't be needed anymore.

The QuickJS environment is missing some common things from a browser or NodeJS runtime, like `URL()` and `console.error`. Some of those things also needed to be added explicitly to `globalThis`. These things are done in `browser-shims.js`.
