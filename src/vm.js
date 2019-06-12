const {NodeVM} = require('vm2');
const vm = new NodeVM({
  console: 'inherit',
  sandbox: {},
  require: {
    builtin: ['fs', 'path', 'events'],
    context: 'sandbox'
  }
});
module.exports = (codeStr, fileName) => vm.run(codeStr, fileName);
