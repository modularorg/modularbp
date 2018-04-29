const fs = require('fs');
const exists = require('./exists');

function createDir(path) {
    const dirs = path.split('/');
    let currentDirs = '';

    dirs.forEach((dir) => {
        currentDirs += dir + '/';

        if (!exists(currentDirs)) {
            fs.mkdirSync(currentDirs);
        }
    })
}

module.exports = createDir;
