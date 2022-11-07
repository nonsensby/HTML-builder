const path = require("path");
const folder = path.join(__dirname, "secret-folder");
const fs = require("fs");

const formatBytes = (bytes, fileName, fileExtention) => {
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (
    fileName +
    " - " +
    fileExtention +
    " - " +
    parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) +
    "kb"
  );
};

function checkIfRepo(file, fileName, fileExtention) {
  file = path.join(__dirname, "secret-folder", file);
  fs.stat(file, (error, stats) => {
    if (stats.isFile()) {
      console.log(formatBytes(stats.size, fileName, fileExtention));
    }
  });
}

fs.readdir(folder, (err, files) => {
  files.forEach((file) => {
    fileName = file.split(".")[0];
    fileExtention = file.split(".")[1];
    checkIfRepo(file, fileName, fileExtention);
  });
});
