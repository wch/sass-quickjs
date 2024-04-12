import * as utils from "./utils.js";
import * as os from "os";
import * as std from "std";

import * as sass from "./sass.default.js";

var startTime = Date.now();


var topDir = os.getcwd()[0];

if (scriptArgs.length < 1) {
  console.log("Usage: qjs sass.js <file>");
  std.exit(1);
}

// Read the file content
var fileContent = utils.readFile(scriptArgs[1]);


const res = sass.compileString(fileContent, {
  importers: [
    // An implementation of the Importer interface
    {
      canonicalize(url) {
        // console.log(`Called canonicalize: ${url}`)
        if (url.startsWith("file://")) {
          return new URL(url);
        } else {
          return new URL(`file://${topDir}/${url}`);
        }
      },
      load(canonicalUrl) {
        // console.log(`Called load: ${canonicalUrl}`)
        var filename = canonicalUrl.pathname;
        if (!filename.endsWith(".scss")) {
          filename += ".scss";
        }

        if (!utils.fileExists(filename)) {
          filename = utils.addLeadingUnderscore(filename);
        }

        if (!utils.fileExists(filename)) {
          throw new Error(`File not found: ${filename}`);
        }

        // console.log(`Loading ${filename}`);
        return { contents: utils.readFile(filename), syntax: "scss", };
      },
    },
  ],
});
console.log(res.css);

console.log(`Time taken: ${Date.now() - startTime}ms`);
