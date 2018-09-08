const { spawnSync } = require('child_process');

function installPackages(packages, dest) {
    let cmd = ['install'];

    if (packages) {
        cmd = cmd.concat(packages);
        cmd.push('--save-dev');
    }

    if (dest != '.') {
        cmd.push('--prefix', './' + dest);
    }

    spawnSync('npm', cmd, { stdio: 'inherit' });
}

module.exports = installPackages;
