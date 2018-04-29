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

    createFile('./package.json', '{}');

    installPackages('mbp');

    const prefix = '@modularbp/'
    const name = answers.name;
    const build = answers.build;

    delete answers.name;
    delete answers.build;

    let packages = [];

    packages.push(prefix + build);

    Object.keys(answers).map(function(key) {
        let value = answers[key];
        packages.push(prefix + build + '-' + value);
    });

    if (dependencies[build]) {
        packages.push(...dependencies[build].map(value => prefix + build + '-' + value));
    }

    copy(['./node_modules/mbp/src/**/*', './node_modules/mbp/src/**/.*'], './');

    const paths = require(process.cwd() + '/mconfig.json');

    installPackages(packages);

    copy(`./node_modules/${prefix}${build}/src/*`, './');

    copy(`./node_modules/${prefix}${build}-*/src/*`, paths.build);

    createDir(paths.styles.src);
    createDir(paths.scripts.src);
    createDir(paths.svgs.src);
    createDir(paths.views.src);
    createDir(paths.views.partials);

    log(`👊 Ready to go, you can now run ${build}`);
}
