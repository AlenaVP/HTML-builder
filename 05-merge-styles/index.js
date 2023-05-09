const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;

const sourseDirPath = path.join(__dirname, 'styles');
const destPath = path.join(__dirname, 'project-dist', 'bundle.css');

async function collectStyles(sourseDirPath, destPath) {
  const ouput = fs.createWriteStream(destPath);

  fsPromises
    .readdir(sourseDirPath, { withFileTypes: true })
    .then((files) => {
      files.forEach((file) => {
        if (file.isFile()) {
          const fileExt = path.parse(file.name).ext;
          if (fileExt === '.css') {
            const input = fs.createReadStream(path.join(sourseDirPath, file.name), 'utf-8');
            input.on('data', chunk => ouput.write(chunk + '\n'));
          }
        }
      });
    });
}

collectStyles(sourseDirPath, destPath);

module.exports = collectStyles;
