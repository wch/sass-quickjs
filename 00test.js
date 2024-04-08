/*
This is an attempt to run dart-sass using QuickJS. It currently does not work.

Steps:

First install the QuickJS command line tool.

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
*/

import * as sass from "./sass.default.js";

console.log(sass.info);
console.log(1);
const res = sass.compileString(`
.box {
  width: 10px + 15px;
}
`)
console.log(2);
console.log(res);
