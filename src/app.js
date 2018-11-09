"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    /*
    * サーバーにリクエストがあった時に実行される関数
    */
    requestHandler(request, response) {
        if (request.url === '/') {
          request.url = '/index.html';
        }
        fs.readFile('.' + request.url, 'utf-8', (err, data) => {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        });
    }
}
const main = new Main();
//# sourceMappingURL=app.js.map