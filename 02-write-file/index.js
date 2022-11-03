const path = require('path');
const process = require('process')
const fs = require('fs');
const {stdin, stdout} = process;

stdout.write(`Прывітанне!\n`);
const output = fs.createWriteStream(path.join(__dirname,'output.txt'), 'utf-8');
process.on('SIGINT', () => {
    stdout.write('Да прабачэння!');
    process.exit();
    })
stdin.on('data', chunk => {
        if (chunk.toString().trim() === 'exit')  {
            stdout.write("Да прабачэння!!");
            process.exit();
    } else output.write(chunk.toString());    
})
