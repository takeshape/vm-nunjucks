const localNunjucks = require('../nunjucks');
const nunjucks = require('nunjucks');

test('nunjucks', () =>{
  expect(localNunjucks).toEqual(nunjucks);
});
