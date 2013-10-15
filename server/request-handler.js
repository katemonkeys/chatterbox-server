var message1 = {
  username: "banana",
  text: "HELLO",
  roomname: "LOBBY",
  createdAt: new Date(),
  updatedAt: new Date()
};
var message2 = {
  username: "otheruser",
  text: "GOODBYE",
  roomname: "LOBBY",
  createdAt: new Date(),
  updatedAt: new Date()
};
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
var headers = defaultCorsHeaders;
headers['Content-Type'] = "text/plain";

var messages = [];


var handleRequest = function(request, response) {
  console.log(headers);
  var value;
  var found = false;
  if (request.method === "GET" && (request.url).match(/\/1\/classes\/chatterbox/g)){
    found = true;
    statusCode = 200;
    value =  JSON.stringify(messages);
  }
  if (request.method === "POST" && (request.url).match(/\/1\/classes\/chatterbox/g)){
    found = true;
    request.on('data',function(chunk) {
      statusCode = 201;
      var newMessage = JSON.parse(chunk.toString());
      newMessage['updatedAt'] = new Date();
      newMessage['createdAt'] = new Date();
      messages.push(newMessage);
      console.log("number of messages "+messages.length);
    });
  }
  response.writeHead(statusCode, headers);
  console.log(response.headers);
  // if (!found){
  //   response.writeHead(404, headers);
  // }
  response.end(value);
};

module.exports.handleRequest = handleRequest;