const fs = require('fs');
const path = require('path');
const styles = path.join(__dirname, 'styles');
let bundle = [];

fs.readdir(styles, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      fs.readFile(path.join(styles, file.name), 'utf-8', (err, data) => {
        if (err) throw err;
        bundle.push(data);
        fs.writeFile(
          path.join(__dirname, 'project-dist', 'bundle.css'),
          bundle.join('\n'),
          (err) => {
            if (err) throw err;
          },
        );
      });
    }
  });
});
