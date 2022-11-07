const path = require("path");
const folder = path.join(__dirname, "files");
const folderCopy = path.join(__dirname, "files-copy");
const fs = require("fs");
const fsPromises = require("fs").promises;

fs.mkdir(folderCopy, (err) => {
});

fs.readdir(folder, (err, files) => {
  files.forEach((file) => {
    fsPromises.copyFile(`${folder}//${file}`, `${folderCopy}//${file}`);
  });
});
