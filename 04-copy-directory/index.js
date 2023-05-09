const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;

const dirPath = path.join(__dirname, 'files');
const destPath = path.join(__dirname, 'files-copy');

async function copyDir(dirPath, destPath) {
  await fsPromises.rm(destPath, { recursive: true, force: true });
  await fsPromises.mkdir(destPath, { recursive: true });
  await fsPromises.readdir(dirPath)
    .then(files => files.forEach(file => {
      fsPromises.stat(path.join(dirPath, file))
        .then(stats => {
          if (stats.isFile()) {
            fsPromises.copyFile(path.join(dirPath, file), path.join(destPath, file));
          } else if (stats.isDirectory()) {
            copyDir(path.join(dirPath, file), path.join(destPath, file));
          }
        });
    }));
}

copyDir(dirPath, destPath);

module.exports = copyDir;
