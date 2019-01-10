#!/usr/bin/env node
const { spawn, spawnSync } = require('child_process');
const commander = require('commander');
const inquirer = require('inquirer');
const log = require('./lib/log');
const cloneRepo = require('./lib/cloneRepo');
const exists = require('./lib/exists');
const del = require('./lib/del');
const createFile = require('./lib/createFile');
const installPackages = require('./lib/installPackages');
const copy = require('./lib/copy');
const createDir = require('./lib/createDir');
const prefix = require('./lib/prefix');
let questions = require('./lib/questions');

const dependencies = {
    gulp: ['build', 'error', 'notify', 'serve', 'svg', 'watch']
};

commander
    .command('init [repo] [dest]')
    .action((repo, dest) => initQuestions(repo, dest));

commander.parse(process.argv);

function initQuestions(repo, dest = '.') {
    log(`👋 Hey, let's init your project.`);

    if (repo) {
        cloneRepo(repo, dest);
    }

    let destFolder = '';
    if (dest != '.') {
        destFolder = '/' + dest;
    }

    let config;
    if (exists(`${dest}/mconfig.json`)) {
        let newQuestions = [];
        config = require(process.cwd() + destFolder + '/mconfig.json');

        if (config.modules) {
            for (let key in questions) {
                if(!(questions[key].name in config.modules)) {
                    newQuestions.push(questions[key]);
                }
            }

            questions = newQuestions;
        }
    }

    if (questions.length != 0) {
        inquirer
            .prompt(questions)
            .then(answers => {
                if (config && config.modules) {
                    answers = Object.assign(answers, config.modules);
                }
                init(config, answers, repo, dest);
            });
    } else {
        init(config, config.modules, repo, dest);
    }
}

function init(config, answers, repo, dest) {
    log(`👌 All good, installing everything for you.`);

    if (exists(`${dest}/package.json`)) {
        installPackages(null, dest);
    } else {
        createFile(`${dest}/package.json`, '{}');
    }

    installPackages('mbp', dest);

    const org = '@modularbp/'
    const build = answers.build;

    delete answers.build;

    let packages = [];
    let mjs = false;

    packages.push(org + build);

    Object.keys(answers).map(function(key) {
        let value = answers[key];

        if (value == 'mjs') {
            packages.push(org + value);
            value = 'js';
            mjs = true;
        }

        if (value) {
            packages.push(org + build + '-' + value);
        }
    });

    if (dependencies[build]) {
        packages.push(...dependencies[build].map(value => org + build + '-' + value));
    }

    copy([`${dest}/node_modules/mbp/src/**/*`, `${dest}/node_modules/mbp/src/**/.*`], `${dest}/`);

    if (!config) {
        let destFolder = '';
        if (dest != '.') {
            destFolder = '/' + dest;
        }

        config = require(process.cwd() + destFolder + '/mconfig.json');
    }

    installPackages(packages, dest);

    if (mjs) {
       installPackages('modujs', dest, false);
    }

    copy(`${dest}/node_modules/${org}${build}/src/*`, `${dest}/`);
    copy(`${dest}/node_modules/${org}${build}-*/src/*`, prefix(config.build, dest));
    copy(`${dest}/node_modules/${org}mjs/src/*`, prefix(config.scripts.src, dest));
    copy(`${dest}/node_modules/${org}mjs/src/modules/*`, prefix(`${config.scripts.src}/modules/`, dest));

    createDir(prefix(config.styles.src, dest));
    createDir(prefix(config.scripts.src, dest));
    createDir(prefix(config.svgs.src, dest));
    createDir(prefix(config.views.src, dest));
    createDir(prefix(config.views.partials, dest));

    log(`👊 Ready to go, you can now run ${build}`);
}
