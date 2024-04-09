This is an attempt to run dart-sass using QuickJS. It currently does not work.

Steps:

Get the QuickJS command line tool. An easy way to do this is to simply download the cosmopolitan binary from the QuickJS page and unzip it: https://bellard.org/quickjs/

Then run

```
qjs --module 00test.js
```

Currently this prints out:

```
dart-sass 1.74.1  (Sass Compiler) [Dart]
dart2js 3.3.3 (Dart Compiler) [Dart]
1
```

Then it hangs on the call to `sass.compileString()`, using 100% CPU. I don't
know why it's hanging.
