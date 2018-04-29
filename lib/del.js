const fs = require('fs');
const exists = require('./exists');

function del(path) {
    if (exists(path)) {
        const files = fs.readdirSync(path);

        files.forEach((file, index) => {
            var curPath = path + "/" + file;

            if(fs.lstatSync(curPath).isDirectory()) {
                del(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });

        fs.rmdirSync(path);
    }
}

module.exports = del;
