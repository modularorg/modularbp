const fs = require('fs');
const path = require('path');
const glob = require('fast-glob');
const createDir = require('./createDir');
const exists = require('./exists');

function copy(src, dest) {
    createDir(dest);

    src = glob.sync(src);

    src.forEach((file) => {
        copyFile(file, dest);
    })
}

function copyFile(src, dest) {
    const file = path.basename(src);
    const destFile = dest + file;
    let filePath = dest + file;

    if (!exists(filePath)) {
        fs.copyFileSync(src, destFile);
    }
}

module.exports = copy;
