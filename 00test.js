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
