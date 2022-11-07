const path = require("path");
const folder = path.join(__dirname);
const fs = require("fs");
const readableStream = fs.ReadStream(`${folder}/text.txt`);

let result = "";

readableStream.on("readable", function () {
  let fileText = readableStream.read();
  if (fileText != null) {
    result += fileText;
  }
});
readableStream.on("end", function () {
  console.log(result);
});
