const fs = require('fs');
const path = require('path');
const secretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolder, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    if (file.isFile()) {
      let name = path.parse(file.name).name;
      let ext = path.extname(file.name).slice(1);
      fs.stat(path.join(secretFolder, file.name), (err, stats) => {
        if (err) throw err;
        console.log(`${name} - ${ext} - ${stats.size / 1000}kb`);
      });
    }
  });
});
