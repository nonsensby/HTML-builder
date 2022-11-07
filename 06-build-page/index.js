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

/*2. Заменяет шаблонные теги в файле **template.html** с названиями файлов из папки components (пример:```{{section}}```) на содержимое одноимённых компонентов и  сохраняет результат в **project-dist/index.html**.*/

/*
1. Импорт всех требуемых модулей
2. Прочтение и сохранение в переменной файла-шаблона
3. Нахождение всех имён тегов в файле шаблона
4. Замена шаблонных тегов содержимым файлов-компонентов
5. Запись изменённого шаблона в файл **index.html** в папке **project-dist**
6. Использовать скрипт написанный в задании **05-merge-styles** для создания файла **style.css**
7. Использовать скрипт из задания **04-copy-directory** для переноса папки **assets** в папку project-dist
*/
