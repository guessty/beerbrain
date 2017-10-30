const next = require('next');
const routes = require('./routes');
const express = require('express');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  console.log('listening on port: ', 3000);
  express().use(handler).listen(3000);
});
