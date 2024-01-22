const fs = require('fs');
const path = require('path');
const files = path.join(__dirname, 'files');
const filesCopy = path.join(__dirname, 'files-copy');

function copyDir() {
  fs.mkdir(filesCopy, { recursive: true }, (err) => {
    if (err) throw err;
  });

  fs.readdir(files, (err, items) => {
    if (err) throw err;
    items.forEach((item) => {
      fs.copyFile(path.join(files, item), path.join(filesCopy, item), (err) => {
        if (err) throw err;
      });
    });
  });

  fs.readdir(filesCopy, (err, items) => {
    if (err) throw err;
    items.forEach((item) => {
      fs.readFile(path.join(files, item), (err) => {
        if (err)
          fs.unlink(path.join(filesCopy, item), (err) => {
            if (err) throw err;
          });
      });
    });
  });
}

copyDir();
