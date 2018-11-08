const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
  requestHandler(request, response);
});
server.listen('4649');
console.log('listening');

/* On request */
function requestHandler(request, response) {
  console.log(request.url);
  let text;
  if (request.url === '/') {
    text = fs.readFileSync('./index.html');
  } else if (request.url === '/favicon.ico') {
    return;
  }else {
    text = fs.readFileSync('./' + request.url);
  }
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.end(text);
}