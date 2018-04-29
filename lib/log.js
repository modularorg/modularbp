const color = require('./color');

function log(message, style = 'yellow') {
    console.log(color(message, style));
}

module.exports = log;
