const routes = require('next-routes')();

module.exports = routes
  .add('bar', '/search/:slug', 'bar');
