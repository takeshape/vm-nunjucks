#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'lib/index.js');
const source = fs.readFileSync(filePath, 'utf8');

function template(source) {
    const escaped = JSON.stringify(source);
    return `const {NodeVM} = require('vm2');
const vm = new NodeVM({
  console: 'inherit',
  sandbox: {},
  require: {
      builtin: ['fs', 'path', 'events'],
      context: 'sandbox'
  }    
});

module.exports = vm.run(${escaped}, 'vm-nunjucks.js');
`;
}

fs.writeFileSync(filePath, template(source), {encoding: 'utf8'});
