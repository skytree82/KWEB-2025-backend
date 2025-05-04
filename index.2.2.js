const fs = require('fs');
const path = require('path');
const util = require('util');

const getDirList = util.promisify(fs.readdir);
const getFileStat = util.promisify(fs.stat);

const dir = './';

const searchDirectory = async directory => {
    try {
        const files = await getDirList(directory);
    
        for (const file of files) {
            const filePath = path.join(directory, file);
            try {
            const stat = await getFileStat(filePath);
            if (stat.isDirectory()) {
                await searchDirectory(filePath);
            } else if (path.extname(filePath) === '.js') {
                console.log(filePath);
            }
            } 
            catch (err) {
                console.error(`Error processing ${filePath}: ${err.message}`);
            }
        }
    } 
    catch (err) {
        console.error(`Error reading directory ${directory}: ${err.message}`);
    }
};

(async () => {
    try {
        await searchDirectory(dir);
    } 
    catch (err) {
        console.error(err);
    }
})();

