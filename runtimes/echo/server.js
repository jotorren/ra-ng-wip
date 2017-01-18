var http = require('http');
 
var port = process.env.PORT || 8080;
 
http.createServer(function(request,response){
 
 response.writeHead(200);
 request.pipe(response);
 
}).listen(port);
console.log("HTTP echo Server started on port " + port);