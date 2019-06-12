const nunjucks = require('./lib/index');


const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(__dirname));


const html = env.render('test.html', {name: 'Nunjucks'});
const expected = '<h1>Hello World Nunjucks!</h1>\n';
if (html !== expected) {
    process.exit(1);
}
