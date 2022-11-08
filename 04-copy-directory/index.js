const path = require("path");
const folder = path.join(__dirname, "files");
const folderCopy = path.join(__dirname, "files-copy");
const fs = require("fs");
const fsPromises = require("fs").promises;

fs.mkdir(folderCopy, (err) => {
  fs.readdir(folderCopy, (err, files) => {
    clearFiles(files);
    copyFiles(files);
  });
});

function clearFiles(files) {
  files.forEach((file) => {
    fs.unlink(`${folderCopy}//${file}`, (err) => {});
  });
}
function copyFiles(files) {
  fs.readdir(folder, (err, files) => {
    files.forEach((file) => {
      fsPromises.copyFile(`${folder}//${file}`, `${folderCopy}//${file}`);
    });
  });
}
