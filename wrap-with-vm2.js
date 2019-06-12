#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

function template(source) {
    const escaped = JSON.stringify(source);
    return `module.exports = require('./vm')(${escaped}, 'vm-nunjucks.js');`;
}

// copy src/vm.js to lib/vm.js
fs.createReadStream(path.join(__dirname, 'src/vm.js')).pipe(fs.createWriteStream(path.join(__dirname, 'lib/vm.js')));

// wrap webpacked nunjucks with vm
const indexPath = path.join(__dirname, 'lib/index.js');
const source = fs.readFileSync(indexPath, 'utf8');
fs.writeFileSync(indexPath, template(source), {encoding: 'utf8'});
