const routes = require('next-routes')();

module.exports = routes
  .add('/search', 'search')
  .add('bar', '/search/:slug', 'bar');
