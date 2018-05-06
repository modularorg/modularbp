const path = require('path');
const color = require('./color');

const questions = [
    {
        type: 'list',
        name: 'build',
        message: color('Which build module?', 'green'),
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
        message: color('Which style module?', 'green'),
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
        message: color('Which script module?', 'green'),
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
        message: color('Which view module?', 'green'),
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
]

module.exports = questions;
