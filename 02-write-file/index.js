const fs = require('fs');
const path = require('path');
const process = require('process');

const stream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

process.stdout.write('Hello! Please, input your text here.\n(type "exit" to finish)\n');
process.stdin.on('data', (data) => {
  if (data.toString().trim().toLowerCase() === 'exit') sayBye();
  stream.write(data);
});

process.on('SIGINT', sayBye);

function sayBye() {
  process.stdout.write('You can see the result in the file "text.txt". Good luck!');
  process.exit();
}
