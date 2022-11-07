const path = require("path");
const folder = path.join(__dirname);
const fs = require("fs");

const { stdin, stdout } = process;

stdout.write("Приглашение на ввод текста\n");
stdin.on("data", (data) => {
  fs.appendFile(`${folder}\\yourMessages.txt`, data.toString(), (err) => {
  });
  if (data.toString("utf8").trim() === "exit") {
    process.exit();
  }
});

process.on("exit", () => {
  stdout.write("Прощальная фраза. Процесс завершён.");
});
process.on("SIGINT", () => {
  process.exit();
});
