const routes = module.exports = require('next-routes')()

routes
.add('/search', 'search')
.add('bar', '/search/:slug', 'bar')
