const path = require("path");
const folder = path.join(__dirname);
const fs = require("fs");

const { stdin, stdout } = process;

stdout.write("Приглашение на ввод текста\n");
stdin.on("data", (data) => {
  fs.appendFile(`${folder}\\yourMessages.txt`, data.toString(), (err) => {
    if (err) {
      console.log(err);
    }
  });
});

process.on("exit", () => stdout.write("Прощальная фраза. Процесс завершён."));
process.on("SIGINT", () => {
  stdout.write("Прощальная фраза. Процесс завершён.");
  process.exit();
});
