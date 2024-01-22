const fs = require('fs');
const path = require('path');
const projectDist = path.join(__dirname, 'project-dist');
const template = path.join(__dirname, 'template.html');
let index = '';
const components = path.join(__dirname, 'components');
const styles = path.join(__dirname, 'styles');
let style = [];
const assets = path.join(__dirname, 'assets');
const assetsDist = path.join(projectDist, 'assets');

fs.mkdir(projectDist, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readFile(template, 'utf-8', (err, data) => {
  if (err) throw err;
  index += data;
  let tags = index.match(/\{\{[a-zA-Z]+\}\}/g);
  tags.forEach((item) => {
    fs.readFile(
      path.join(components, `${item.replace(/\{|\}/g, '')}.html`),
      'utf-8',
      (err, data) => {
        if (err) throw err;
        index = index.replace(item, `\n${data}\n`);
        fs.writeFile(path.join(projectDist, 'index.html'), index, (err) => {
          if (err) throw err;
        });
      },
    );
  });
});

fs.readdir(styles, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      fs.readFile(path.join(styles, file.name), 'utf-8', (err, data) => {
        if (err) throw err;
        style.push(data);
        fs.writeFile(
          path.join(projectDist, 'style.css'),
          style.join('\n'),
          (err) => {
            if (err) throw err;
          },
        );
      });
    }
  });
});

function copyDir(folder, folderCopy) {
  fs.rm(folderCopy, { recursive: true, force: true }, (err) => {
    if (err) throw err;
    fs.mkdir(folderCopy, { recursive: true }, (err) => {
      if (err) throw err;
      fs.readdir(folder, { withFileTypes: true }, (err, items) => {
        if (err) throw err;
        items.forEach((item) => {
          if (item.isFile()) {
            fs.copyFile(
              path.join(folder, item.name),
              path.join(folderCopy, item.name),
              (err) => {
                if (err) throw err;
              },
            );
          } else {
            copyDir(
              path.join(folder, item.name),
              path.join(folderCopy, item.name),
            );
          }
        });
      });
    });
  });
}

copyDir(assets, assetsDist);
