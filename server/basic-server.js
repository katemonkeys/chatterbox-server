/* Import node's http module: */
var http = require("http");
var serveBase = require("./base");
var handle = require('./request-handler');
var port = 8080;
var ip = "127.0.0.1";

var server = http.createServer(function(request, response){
  if ( request.method === "GET" && request.url === '/styles/styles.css') {
    serveBase(request, response);
  } else if ( request.method === "GET" && request.url === '/scripts/app.js') {
    serveBase(request, response);
  } else if ( (request.url).match(/\/1\/classes\/chatterbox/g) ) {
    handle.handleRequest(request, response);
  } else {
    serveBase(request, response);
  }
});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

