const fs = require('fs');
const path = require('path');
fs.mkdir(path.join(__dirname, 'files-copy'),{recursive: true}, (error) => {
    if (error) return console.error(error.message)
});
fs.readdir(path.join(__dirname,'files'), (error, files) => {
    if (error) return console.error(error.message);    
    for (let i = 0; i < files.length; i++) {
      fs.copyFile(path.join(__dirname,'files',files[i]), path.join(__dirname, 'files-copy',files[i]), (error) =>{
        if (error) return console.error(error.message)
      })
       }
});
        
        
    
    
    