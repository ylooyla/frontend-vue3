const fs = require('fs');
const path = require('path');
const FILE_NAME = 'package-lock.json';

function deleteLockFile(dir) {
  const filename = path.join(dir, FILE_NAME);
  if (fs.existsSync(filename)) {
    fs.rmSync(filename);
    console.log('deleted: ', filename);
  }
  const subs = fs.readdirSync(dir);
  for (const sub of subs) {
    if (sub.startsWith('.')) continue;
    const subPath = path.join(dir, sub);
    if (isDirectory(subPath)) {
      deleteLockFile(subPath);
    }
  }
}

function isDirectory(p) {
  return fs.lstatSync(p).isDirectory();
}

deleteLockFile(__dirname);
console.log('ok');
