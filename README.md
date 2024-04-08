This is an attempt to run dart-sass using QuickJS. It currently does not work.

Steps:

First install the QuickJS command line tool.

Then run

```
qjs --module 00test.js
```

Currently this prints out:

```
dart-sass	1.74.1	(Sass Compiler)	[Dart]
dart2js	3.3.3	(Dart Compiler)	[Dart]
1
```

then hangs on the call to `sass.compileString()`. I don't know why it's hanging.


