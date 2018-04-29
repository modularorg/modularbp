const fs = require('fs');
const exists = require('./exists');

function createFile(path, data) {
    if (!exists(path)) {
        fs.writeFileSync(path, data);
    }
}

module.exports = createFile;
