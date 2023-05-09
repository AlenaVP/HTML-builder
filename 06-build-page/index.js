const fs = require('fs');
const path = require('path');
const copyDir = require('../04-copy-directory');
const collectStyles = require('../05-merge-styles');

const fsPromises = fs.promises;

fsPromises.readFile(path.join(__dirname, 'template.html'), 'utf-8')
  .then(async (template) => {
    const tags = {};
    const regexp = /{{\w*}}/g;
    const matches = [...template.matchAll(regexp)].map(m => m[0]);
    matches.forEach(element => {
      tags[element] = element.replace('{{', '').replace('}}', '').trim();
    });

    const distDirPath = path.join(__dirname, 'project-dist');
    await fsPromises.rm(distDirPath, { recursive: true, force: true });
    await fsPromises.mkdir(distDirPath, { recursive: true });
    for (let key in tags) {
      const input = fs.createReadStream(path.join(__dirname, 'components', `${tags[key]}.html`), 'utf-8');
      input.on('data', content => {
        template = template.replace(key, content);
        fsPromises.writeFile(path.join(distDirPath, 'index.html'), template);
      });
    }
  })
  .then(() => collectStyles(path.join(__dirname, 'styles'), path.join(__dirname, 'project-dist', 'style.css')))
  .then(() => copyDir(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist/assets')));
