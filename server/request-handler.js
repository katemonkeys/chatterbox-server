/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */
var message1 = {
  username: "banana",
  text: "HELLO",
  roomname: "LOBBY"
};
var message2 = {
  username: "otheruser",
  text: "GODBYE",
  roomname: "LOBBY"
};

var messages = [message1, message2];

exports.handleRequest = function(request, response) {
  //if get, return 25 most recent entries in array
  //  --messages in an array full of objects (data like )
  //if post request, creating new room or new user
  //if delete, remove and update
  //if put, adding to messages array
  if (request.method === "GET" && request.url === '/1/classes/chatterbox'){
    console.log("GET request successful");
    return messages.toString();
    //response.writeHead(200, {'content-type': 'application/json'});
    //response.write({banana: "more bananas"});
    //response.end("HELLO WORLD!!!");
  }
  if (request.method === "POST" && request.url === '/1/classes/chatterbox'){
    request.on('data',function(chunk) {
      messages.push(JSON.parse(chunk.toString()));
      console.log(messages[2].username);
      console.log("number of messages "+messages.length);
    });
    // console.log(request.headers['content-type']);
    // messages.push(request.data);
    console.log("from a post request");

  }
  console.log(request.headers);
  console.log(request.url);
  //var contentType = response.getHeader('content-type');
};
