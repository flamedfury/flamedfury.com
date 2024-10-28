import fs from 'fs';

let memoizedIncludes = {};

export function includeRaw(file) {
  if (file in memoizedIncludes) {
    return memoizedIncludes[file];
  } else {
    let content = fs.readFileSync(file, 'utf8');
    memoizedIncludes[file] = content;
    return content;
  }
}