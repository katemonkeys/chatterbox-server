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
var mimeTypes = {
        '.js' : 'text/javascript',
        '.css' : 'text/css',
        '.gif' : 'image/gif',
        '.html': 'text/html'
    };

// contentType = mimeTypes[path.extname(filePath)];

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
var headers = defaultCorsHeaders;

var messages = [];
var fs = require('fs');

var handleRequest = function(request, response) {
  var value, statusCode;
  console.log(request.url);
  console.log(request.method);
  if (request.method === "GET" && request.url === '/'){
    // console.log("IF STATEMENT IS TRUE");
    headers['Content-Type'] = "text/html";
    response.writeHead(200, headers);
    var index = fs.createReadStream('../index.html');
    // console.log("index.path= "+index.path);
    index.pipe(response);
    return;
  }

  //ADD MORE GET HANDLERS TO HANDLE JS FILES!!
  else if (request.method === "GET" && (request.url).match(/\/1\/classes\/chatterbox/g)){
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