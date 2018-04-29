const fs = require('fs');

function exists(path) {
    if (fs.existsSync(path)) {
        return true;
    } else {
        return false;
    }
}

module.exports = exists;
