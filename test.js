const nunjucks = require('./lib/index');


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
    const malicious = '{{ name.constructor.__proto__.constructor("return JSON.stringify(process.env)")() }}';
    const html = nunjucks.renderString(malicious, {name: 'Nunjucks'});
    expect(html === '{}').toBe(true);
});
