const { spawnSync } = require('child_process');
const del = require('./del');
const log = require('./log');

function cloneRepo(repo, dest) {
    const spawn = spawnSync('git', ['clone', 'https://github.com/'+ repo, dest]);
    const message = spawn.stderr.toString().trim();

    if (spawn.status == 0) {
        log(message, 'green');
        del(dest + '/.git');
    } else {
        log(message, 'red');
        process.exit();
    }
}

module.exports = cloneRepo;
