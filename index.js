#!/usr/bin/env node
const { spawn } = require('child_process');
const chalk = require('chalk');
const commander = require('commander');
const inquirer = require('inquirer');
const makeDir = require('make-dir');
const copy = require('copy');
const del = require('del');
const path = require('path');

commander
    .command('init')
    .action(() => init());

commander.parse(process.argv);

const dependencies = {
    gulp: ['error', 'notify', 'paths', 'serve', 'svg', 'watch']
};

function init() {
    console.log(chalk.yellow(`👋 Hey, let's init your project.`));

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
        console.log(chalk.yellow(`👌 All good, installing everything for you.`));

        const prefix = '@modularbp/'
        const name = answers.name;
        const build = answers.build;

        delete answers.name;
        delete answers.build;

        let command = ['install', '--save-dev', 'mbp'];
        command.push(prefix + build);

        Object.keys(answers).map(function(key) {
            let value = answers[key];
            command.push(prefix + build + '-' + value);
        });

        if (dependencies[build]) {
            command.push(...dependencies[build].map(value => prefix + build + '-' + value));
        }

        const cmd = spawn('npm', command, { stdio: 'inherit' });

        cmd.on('close', (code) => {
            copy(['./node_modules/mbp/src/**/*', './node_modules/mbp/src/**/.*', `./node_modules/${prefix}${build}/src/*`], './', { overwrite: false }, function(err) {
                if (err) {
                    console.log(chalk.red(err));
                } else {
                    del(['./**/.gitkeep', '!./node_modules/**']);
                }
            });

            const paths = require(process.cwd() + '/mconfig.json');

            makeDir(paths.styles.src);
            makeDir(paths.scripts.src);
            makeDir(paths.svgs.src);
            makeDir(paths.views.src);
            makeDir(paths.views.partials);

            copy(`./node_modules/${prefix}${build}-*/src/*`, paths.build, { flatten: true, overwrite: false }, function(err) {
                if (err) {
                    console.log(chalk.red(err));
                } else {
                    console.log(chalk.yellow(`👊 Ready to go, you can now run ${build}`));
                }
            });

        });
    });
}
