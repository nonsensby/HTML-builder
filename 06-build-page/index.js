const path = require("path");
const folderComponents = path.join(__dirname, "components");
const folderProjectDist = path.join(__dirname, "project-dist");
const folderProjectDistAssets = path.join(__dirname, "project-dist", "assets");
const folderCss = path.join(__dirname, "styles");
const folderAssets = path.join(__dirname, "assets");
const fs = require("fs");
const fsPromises = require("fs").promises;

/*1. Создаёт папку  **project-dist**.*/
fs.mkdirSync(folderProjectDistAssets, { recursive: true });

fs.writeFile(`${folderProjectDist}\\style.css`, "", (err) => {});

/*4. Копирует папку **assets** в **project-dist/assets***/
function copyNewFolder(destination, folderName) {
  fs.readdir(destination, (err, files) => {
    files.forEach((file) => {
      fs.stat(path.join(destination, file), (error, stats) => {
        let pathFull = path.join(destination, file);
        let lengthOfOld = folderAssets.length;
        let sliced = pathFull.slice(lengthOfOld);
        let newFolder = path.join(folderProjectDistAssets, sliced);
        if (stats.isDirectory()) {
          fs.mkdir(newFolder, (err) => {});
          copyNewFolder(path.join(destination, file), file);
        } else if (stats.isFile()) {
          fsPromises.copyFile(`${destination}//${file}`, `${newFolder}`);
        }
      });
    });
  });
}

copyNewFolder(folderAssets);

/*3. Собирает в единый файл стили из папки **styles** и помещает их в файл **project-dist/style.css**.*/
fs.readdir(folderCss, (err, files) => {
  files.forEach((file) => {
    fileExtention = file.split(".")[1];
    if (fileExtention === "css") {
      fs.readFile(`${folderCss}\\${file}`, (err, data) => {
        fs.appendFile(`${folderProjectDist}\\style.css`, data, (err) => {});
      });
    }
  });
});

/*2. Заменяет шаблонные теги в файле **template.html** с названиями файлов из папки components (пример:```{{section}}```) на содержимое одноимённых компонентов и сохраняет результат в **project-dist/index.html**.*/
fs.copyFile(
  `${__dirname}\\template.html`,
  `${folderProjectDist}\\index.html`,
  (err) => {}
);

let result = "";

const readableStream = fs.ReadStream(`${folderProjectDist}\\index.html`);
readableStream.on("readable", function () {
  let fileText = readableStream.read();
  if (fileText != null) {
    result += fileText;
  }
});

readableStream.on("end", function () {
  fs.readdir(folderComponents, (err, files) => {
    files.forEach((file) => {
      fileName = file.split(".")[0];
      fileExtention = file.split(".")[1];
      if (fileExtention === "html") {
        targetFile = `${folderProjectDist}\\index.html`; /*Шаблон*/
        checkIfContains(file, fileName);
      }
    });
  });
});

async function checkIfContains(file, fileName) {
  file = path.join(folderComponents, file); /*Вставляемый файл*/
  targetFile = `${folderProjectDist}\\index.html`; /*Шаблон*/

  fs.readFile(`${targetFile}`, "utf8", function (err, data) {
    if (data.includes(`{{${fileName}}}`)) {
      fs.readFile(`${file}`, "utf8", function (err, data2) {
        replace(data2, fileName);
        checkNewIndex(data, data2, fileName);
      });
    }
  });
}

function replace(data2, fileName) {
  result = result.replace(`{{${fileName}}}`, data2);
  fs.writeFile(`${folderProjectDist}\\index.html`, result, (err) => {});
  return new Promise((resolve) => {
    resolve("Done");
  });
}

async function checkNewIndex(data, data2, fileName) {
  let check = await replace(data, data2, fileName);
  if (check === "Done") {
    writeNewIndex();
  }
}

async function writeNewIndex() {
  fs.writeFile(`${folderProjectDist}\\index.html`, result, (err) => {});
}