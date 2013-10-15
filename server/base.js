var fs = require('fs');

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
var headers = defaultCorsHeaders;

// var mimeTypes = {
//       '.js' : 'text/javascript',
//       '.css' : 'text/css',
//       '.gif' : 'image/gif',
//       '.html': 'text/html'
//   };
// contentType = mimeTypes[path.extname(filePath)];

module.exports = function(request, response){
  if (request.url === "/scripts/app.js"){
    headers['Content-Type'] = "text/javascript";
    response.writeHead(200, headers);
    var mainApp = fs.createReadStream('../scripts/app.js');
    mainApp.pipe(response);
    return;
  }
  if (request.url === '/styles/styles.css') {
    headers['Content-Type'] = "text/css";
    response.writeHead(200, headers);
    var css = fs.createReadStream('../styles/styles.css');
    css.pipe(response);
    return;
  }
  if (request.url[0] === '/'){
    headers['Content-Type'] = "text/html";
    response.writeHead(200, headers);
    var index = fs.createReadStream('../index.html');
    index.pipe(response);
    return;
  }
};