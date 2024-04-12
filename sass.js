import * as browserShims from "./browser-shims.js";
import * as utils from "./utils.js";
import * as os from "os";
import * as std from "std";

import * as sass from "./sass.default.js";

// var startTime = Date.now();

if (scriptArgs.length !== 2) {
  console.log("Usage: qjs -m sass.js <file>");
  std.exit(1);
}

let filename = scriptArgs[1];

// Get absolute path to file
if (!filename.startsWith("/")) {
  const cwd = os.getcwd()[0];
  let err;
  [filename, err] = os.realpath(`${cwd}/${filename}`);
  if (err !== 0) {
    console.error(`Error: ${std.strerror(err)}`);
    sys.exit(1);
  }
}
const dirname = filename.slice(0, filename.lastIndexOf("/"));

const fileContent = utils.readFile(filename);

const res = sass.compileString(fileContent, {
  importers: [
    // An implementation of the Importer interface
    {
      canonicalize(url) {
        // console.error(`Called canonicalize: ${url}`);
        if (url.startsWith("file://")) {
          return new URL(url);
        } else {
          return new URL(`file://${dirname}/${url}`);
        }
      },
      load(canonicalUrl) {
        // console.error(`Called load: ${canonicalUrl}`);
        var filename = canonicalUrl.pathname;
        if (!filename.endsWith(".scss")) {
          filename += ".scss";
        }

        if (!utils.fileExists(filename)) {
          filename = utils.addLeadingUnderscore(filename);
        }

        if (!utils.fileExists(filename)) {
          // console.error(`File not found: ${filename}`);
          sys.exit(1);
        }

        // console.error(`Loading ${filename}`);
        return {
          contents: utils.readFile(filename),
          syntax: "scss",
        };
      },
    },
  ],
});
console.log(res.css);

// console.error(`Time taken: ${Date.now() - startTime}ms`);
