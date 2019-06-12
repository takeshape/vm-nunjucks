const createRun = require('../vm');


test('createRun - basic usage', () => {
  const fn = createRun(`module.exports = () => 'it works!';`);

  expect(fn()).toBe('it works!');
});

test('createRun - basic usage', () => {
  const fn = createRun(`
    module.exports = () => {
      const url =  require('url');
      return new url.URL('https://www.google.com');
    };
  `);

  expect(fn).toThrow();
});



