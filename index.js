#!/usr/bin/env node
const { spawn, spawnSync } = require('child_process');
const commander = require('commander');
const inquirer = require('inquirer');
const log = require('./lib/log');
const questions = require('./lib/questions');
const cloneRepo = require('./lib/cloneRepo');
const del = require('./lib/del');
const createFile = require('./lib/createFile');
const installPackages = require('./lib/installPackages');
const copy = require('./lib/copy');
const createDir = require('./lib/createDir');
const prefix = require('./lib/prefix');

const dependencies = {
    gulp: ['error', 'notify', 'paths', 'serve', 'svg', 'watch']
};

commander
    .command('init [repo] [dest]')
    .action((repo, dest) => initQuestions(repo, dest));

commander.parse(process.argv);

function initQuestions(repo, dest = '.') {
    log(`👋 Hey, let's init your project.`);

    inquirer
        .prompt(questions)
        .then(answers => init(answers, repo, dest));
}

function init(answers, repo, dest) {
    log(`👌 All good, installing everything for you.`);

    if (repo) {
        cloneRepo(repo, dest);
    }

    createFile(`${dest}/package.json`, '{}');

    installPackages('mbp', dest);

    const org = '@modularbp/'
    const name = answers.name;
    const build = answers.build;

    delete answers.name;
    delete answers.build;

    let packages = [];

    packages.push(org + build);

    Object.keys(answers).map(function(key) {
        let value = answers[key];
        packages.push(org + build + '-' + value);
    });

    if (dependencies[build]) {
        packages.push(...dependencies[build].map(value => org + build + '-' + value));
    }

    copy([`${dest}/node_modules/mbp/src/**/*`, `${dest}/node_modules/mbp/src/**/.*`], `${dest}/`);

    let destFolder = '';
    if (dest != '.') {
        destFolder = '/' + dest;
    }

    const paths = require(process.cwd() + destFolder + '/mconfig.json');

    installPackages(packages, dest);

    copy(`${dest}/node_modules/${org}${build}/src/*`, `${dest}/`);

    copy(`${dest}/node_modules/${org}${build}-*/src/*`, prefix(paths.build, dest));

    createDir(prefix(paths.styles.src, dest));
    createDir(prefix(paths.scripts.src, dest));
    createDir(prefix(paths.svgs.src, dest));
    createDir(prefix(paths.views.src, dest));
    createDir(prefix(paths.views.partials, dest));

    log(`👊 Ready to go, you can now run ${build}`);
}
