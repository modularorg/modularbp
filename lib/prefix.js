function prefix(string, prefix) {
    if (string.startsWith('.')) {
        string = string.substring(1);
    }

    return prefix + string;
}

module.exports = prefix;
