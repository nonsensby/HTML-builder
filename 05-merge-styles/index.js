const fs = require('fs');
const path = require('path');

fs.access(path.join(__dirname, 'project-dist', 'bundle.css'), fs.constants.F_OK, (err) =>{
    if (err){
        console.log(err.message);
        console.log('создаём файл')
        fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'),'', (error) => {
            if (error) return console.error(error.message);
        });
    } else {
        console.log('файл уже есть');
        fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'),'', (error) => {
            if (error) return console.error(error.message);
        })

    }

});
 const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname,'styles'), {withFileTypes: false}, (error, files) => {
    if (error) return console.error(error.message);
   // console.log(files)
    
    for (let i = 0; i < files.length; i++) {
        fs.stat(path.join(__dirname, 'styles', files[i]), (error, stats) => {
            if (error) return console.error(error.message);
            if (stats.isFile() && (path.extname(path.join(__dirname, 'styles', files[i])) === '.css')) {
              // console.log(files[i]);
                const stream = fs.createReadStream(path.join(__dirname, 'styles', files[i]),'utf-8');
                let data = '';
                stream.on ('data', chunk => data += chunk);
                
                stream.on('end', () =>{
                 //   console.log(data);
                    output.write(data)
                    
                });
            };
        });
    };
    

})
    


