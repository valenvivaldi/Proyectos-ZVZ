#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../server');

var debug = require('debug')('truco:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);



server.listen(port);

// var server = http.createServer(app).listen(app.get('port'), function(){
// 	console.log("Express server listening on port " + app.get('port'));
// });



/**
 * Listen on provided port, on all network interfaces.
 */


// var cantidadUsuarios=0;




var io = require('socket.io').listen(server);



io.on('connection', function(socket){
  console.log('UN USUARIO SE CONECTO!');  
  
  
  

  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });

});








server.on('error', onError);
server.on('listening', onListening);

/**
 */
 * Normalize a port into a number, string, or false.

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

module.exports.socket = io;