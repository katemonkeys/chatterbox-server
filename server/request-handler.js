// var message1 = {
//   username: "banana",
//   text: "HELLO",
//   roomname: "LOBBY",
//   createdAt: new Date(),
//   updatedAt: new Date()
// };
// var message2 = {
//   username: "otheruser",
//   text: "GOODBYE",
//   roomname: "LOBBY",
//   createdAt: new Date(),
//   updatedAt: new Date()
// };

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
var headers = defaultCorsHeaders;

var messages = [];

var handleRequest = function(request, response) {
  var value, statusCode;

  //ADD MORE GET HANDLERS TO HANDLE JS FILES!!
  if (request.method === "GET" && (request.url).match(/\/1\/classes\/chatterbox/g)){
    headers['Content-Type'] = "text/plain";
    statusCode = 200;
    value =  JSON.stringify(messages);
  }
  else if (request.method === "POST" && (request.url).match(/\/1\/classes\/chatterbox/g)){
    headers['Content-Type'] = "text/plain";
    statusCode = 201;
    request.on('data',function(chunk) {
      var newMessage = JSON.parse(chunk.toString());
      newMessage['updatedAt'] = new Date();
      newMessage['createdAt'] = new Date();
      messages.push(newMessage);
    });
  }
  else if (request.method === "OPTIONS"){
    headers['Content-Type'] = "text/plain";
    statusCode = 200;
  }
  else {
    headers['Content-Type'] = "text/plain";
    statusCode = 404;
  }
  response.writeHead(statusCode, headers);
  response.end(value);
};

module.exports.handleRequest = handleRequest;