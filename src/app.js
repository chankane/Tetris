const http = require("http");
const fs = require("fs");
class Main {
  constructor() {
    const server = http.createServer((request, response) => {
      this.requestHandler(request, response);
    });
    server.listen('4649');
    console.log('listening');
  }

  requestHandler(request, response) {
    console.log(request.url);
    if (request.url === '/') {
      request.url = '/index.html';
      response.writeHead(200, { 'Content-Type': 'text/html' });
    } else if (request.url === '/index.css') {
      response.writeHead(200, { 'Content-Type': 'text/css' });
    }
    fs.readFile('.' + request.url, 'utf-8', (err, data) => {
      response.end(data);
    });
  }
}
const main = new Main();
