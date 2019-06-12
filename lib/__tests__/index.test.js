const path = require('path');
const nunjucks = require('../index');

const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(__dirname));

it('renders from file', () => {
    const html = env.render('test.html', {name: 'Nunjucks'});
    expect(html).toBe('<h1>Hello World Nunjucks!</h1>\n');
});

it('renders from string', () => {
    const html = nunjucks.renderString('<h1>Hello World {{ name}}!</h1>', {name: 'Nunjucks'});
    expect(html).toBe('<h1>Hello World Nunjucks!</h1>');
});

it('prevents access to env', () => {
    const malicious = '{{ "".constructor.__proto__.constructor("return JSON.stringify(process.env)")() }}';
    const html = nunjucks.renderString(malicious);
    expect(html === '{}').toBe(true);
});

it('prevents access to require', () => {
  const malicious = '{{ "".constructor.__proto__.constructor("return require(\'fs\').readFileSync(\'Users/als/.aws/credentials\', \'utf8\')")() }}';
  expect(() => nunjucks.renderString(malicious)).toThrow();
});

