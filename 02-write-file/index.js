const fs = require('fs');
const path = require('path');
const { stdout, stdin, exit } = process;
const file = fs.createWriteStream(path.join(__dirname, 'output.txt'));

stdout.write('Hi! Enter your text.\n');
stdin.on('data', (chunk) => {
  if (chunk.toString().trim() === 'exit') exit();
  file.write(chunk);
});
process.on('SIGINT', () => exit());
process.on('exit', () => stdout.write('Bye! Have a beautiful day!'));
