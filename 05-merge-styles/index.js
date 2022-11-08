const path = require("path");
const folder = path.join(__dirname, "styles");
const folderDist = path.join(__dirname, "project-dist");
const fs = require("fs");

fs.writeFile(`${folder}\\bundle.css`, "", (err) => {});

fs.readdir(folder, (err, files) => {
  files.forEach((file) => {
    fileName = file.split(".")[0];
    fileExtention = file.split(".")[1];
    if (fileExtention === "css") {
      fs.readFile(`${folder}\\${file}`, (err, data) => {
        fs.appendFile(`${folderDist}\\bundle.css`, data, (err) => {});
      });
    }
  });
});
