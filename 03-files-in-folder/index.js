const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;
const dirPath = path.join(__dirname, 'secret-folder');

fsPromises.readdir(dirPath, { withFileTypes: true })
  .then(files => files.forEach(file => {
    if (file.isFile()) {
      const fileParse = path.parse(file.name);
      fsPromises.stat(path.join(dirPath, file.name))
        .then(fileMetrics => console.log(`${fileParse.name} - ${fileParse.ext.slice(1)} - ${fileMetrics.size / 8000}kb`));
    }
  }));
