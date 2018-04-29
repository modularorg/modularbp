const { spawnSync } = require('child_process');
const del = require('./del');
const log = require('./log');

function cloneRepo(repo, dest) {
    spawnSync('git', ['clone', 'https://github.com/'+ repo, dest], { stdio: 'inherit' });

    del('./.git');
}

module.exports = cloneRepo;
