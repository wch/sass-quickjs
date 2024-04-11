import * as sass from "./sass.default.js";

console.log(sass.info);

var startTime = Date.now();
const res = sass.compileString(`
.box {
  width: 10px + 15px;
}
`)
console.log(res.css);

console.log(`Time taken: ${Date.now() - startTime}ms`);
