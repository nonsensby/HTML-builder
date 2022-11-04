const fs = require('fs')
const path = require('path')
 fs.readdir(path.join(__dirname,'secret-folder'), {withFileTypes: false}, (error, files) => {
    if (error) return console.error(error.message)
    for (let i = 0; i < files.length; i++) {
       fs.stat(path.join(__dirname,'secret-folder/', files[i]),(error, stats) =>{
        if (error) return console.error(error.message);
        if (stats.isFile()) {
            let fileParameters = path.parse(path.join(__dirname,'secret-folder/', files[i]))
            console.log(`${fileParameters.name} - ${fileParameters.ext.slice(1)} - ${(stats.size / 1024).toFixed(2)}kB`)
        }
       })
    }
    }
)
