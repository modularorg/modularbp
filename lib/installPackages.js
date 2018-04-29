const { spawnSync } = require('child_process');

function installPackages(packages) {
    let cmd = ['install'].concat(packages);
    cmd.push('--save-dev');
    spawnSync('npm', cmd, { stdio: 'inherit' });
}

module.exports = installPackages;
