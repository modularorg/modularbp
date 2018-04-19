#!/usr/bin/env node
const { spawn, spawnSync } = require('child_process');
const chalk = require('chalk');
const commander = require('commander');
const inquirer = require('inquirer');
const makeDir = require('make-dir');
const copy = require('copy');
const del = require('del');
const path = require('path');
const fs = require('fs');

commander
    .command('init [repo] [dest]')
    .action((repo, dest) => init(repo, dest));

commander.parse(process.argv);

const dependencies = {
    gulp: ['error', 'notify', 'paths', 'serve', 'svg', 'watch']
};

function init(repo, dest = '.') {
    log(`👋 Hey, let's init your project.`);

    inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: chalk.green("What's the name?"),
        default: path.basename(process.cwd()),
        validate: function( value ) {
            if (value.length) {
               return true;
            } else {
                return 'Please enter a name.';
            }
        }
    },
    {
        type: 'list',
        name: 'build',
        message: chalk.green('Which build module?'),
        choices: [
            {
                name: 'Gulp',
                value: 'gulp'
            }
        ]
    },
    {
        type: 'list',
        name: 'style',
        message: chalk.green('Which style module?'),
        choices: [
            {
                name: 'CSS (cssnext)',
                value: 'css'
            },
            {
                name: 'Sass',
                value: 'sass'
            }
        ]
    },
    {
        type: 'list',
        name: 'script',
        message: chalk.green('Which script module?'),
        choices: [
            {
                name: 'JavaScript (ES6+)',
                value: 'js'
            }
        ]
    },
    {
        type: 'list',
        name: 'view',
        message: chalk.green('Which view module?'),
        choices: [
            {
                name: 'Handlebars',
                value: 'hbs'
            },
            {
                name: 'Liquid',
                value: 'liquid'
            }
        ]

    }
    ]).then(answers => {
        log(`👌 All good, installing everything for you.`);

        if (repo) {
            cloneRepo(repo, dest);
        }

        let delPackage = false;
        if (!fileExists('./package.json')) {
            createFile('./package.json', '{}');
            delPackage = true;
        }

        installModules(answers, delPackage);
    });
}

function log(message) {
    console.log(chalk.yellow(message));
}

function error(message) {
    console.log(chalk.red(message));
}

function cloneRepo(repo, dest) {
    spawnSync('git', ['clone', 'https://github.com/'+ repo, dest], { stdio: 'inherit' });
    del('./.git');
}

function fileExists(path) {
    try {
        fs.statSync(path);
        return true;
    } catch (e) {
        return false;
    }
}

function createFile(path, data) {
    fs.writeFileSync(path, data);
}

function installModules(answers, delPackage) {
    installPackages('mbp');

    if(delPackage) {
        del('./package.json');
    }

    const prefix = '@modularbp/'
    const name = answers.name;
    const build = answers.build;

    delete answers.name;
    delete answers.build;

    let packages = [];

    if (delPackage) {
        packages.push('mbp');
    }

    packages.push(prefix + build);

    Object.keys(answers).map(function(key) {
        let value = answers[key];
        packages.push(prefix + build + '-' + value);
    });

    if (dependencies[build]) {
        packages.push(...dependencies[build].map(value => prefix + build + '-' + value));
    }

    copy(['./node_modules/mbp/src/**/*', './node_modules/mbp/src/**/.*'], './', { overwrite: false }, function(err) {
        if (err) {
            error(err);
        } else {
            const paths = require(process.cwd() + '/mconfig.json');

            installPackages(packages);

            copy(`./node_modules/${prefix}${build}/src/*`, './', { overwrite: false }, function(err) {
                if (err) {
                    error(err);
                }
            });

            copy(`./node_modules/${prefix}${build}-*/src/*`, paths.build, { flatten: true, overwrite: false }, function(err) {
                if (err) {
                    error(err);
                }
            });

            makeDir(paths.styles.src);
            makeDir(paths.scripts.src);
            makeDir(paths.svgs.src);
            makeDir(paths.views.src);
            makeDir(paths.views.partials);

            log(`👊 Ready to go, you can now run ${build}`);
        }
    });
}

function installPackages(packages) {
    let command = ['install'].concat(packages);
    command.push('--save-dev');
    spawnSync('npm', command, { stdio: 'inherit' });
}
