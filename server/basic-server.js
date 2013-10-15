/* Import node's http module: */
var http = require("http");
var handle = require('./request-handler');

var requestListener = function (request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var text = handle.handleRequest(request, response);
  console.log("THIS IS THE TEXT");
  console.log(text);
};

var port = 8080;
var ip = "127.0.0.1";

var server = http.createServer(handle);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

