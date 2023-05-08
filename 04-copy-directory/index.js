const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;

const dirPath = path.join(__dirname, 'files');
const copiedDir = path.join(__dirname, 'files-copy');

(async function copyDir() {
  await fsPromises.rm(copiedDir, { recursive: true, force: true });
  await fsPromises.mkdir(copiedDir, { recursive: true });
  await fsPromises.readdir(dirPath)
    .then(files => files.forEach(file => {
      fsPromises.copyFile(path.join(dirPath, file), path.join(copiedDir, file));
    }));
})();
