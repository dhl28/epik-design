/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var errorHandler = require('errorhandler');

module.exports = function(app) {
  app.use('/api/accessories', require('./api/accessories'));
  app.use('/api/customers', require('./api/customer'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });

  app.use(errorHandler()); // Error handler - has to be last
};
