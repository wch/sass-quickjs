import * as os from "os";
import * as std from "std";

export function readFile(path, _encoding) {
  var f, ret;
  try {
    f = std.open(path, "r");
    ret = f.readAsString();
    f.close();
  } catch (e) {
    ret = undefined;
  }
  return ret;
}

export function fileExists(filePath) {
  try {
    const stat = os.stat(filePath);
    if (stat === null) {
      return false;
    }
    return (stat[0].mode & os.S_IFMT) === os.S_IFREG;
  } catch (err) {
    if (err.errno === os.ENOENT) {
      return false;
    }
    throw err;
  }
}

export function addLeadingUnderscore(path) {
  const parts = path.split("/");
  const filename = parts[parts.length - 1];

  parts[parts.length - 1] = "_" + parts[parts.length - 1];

  return parts.join("/");
}

export function removeLeadingUnderscore(path) {
  const parts = path.split("/");
  const filename = parts[parts.length - 1];

  if (filename.startsWith("_")) {
    parts[parts.length - 1] = filename.slice(1);
  }

  return parts.join("/");
}
