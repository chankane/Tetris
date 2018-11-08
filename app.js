"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const fs = require("fs");
const test_1 = require("./test");
class Main {
    constructor() {
        const server = http.createServer((request, response) => {
            this.requestHandler(request, response);
        });
        server.listen('4649');
        console.log('listening');
        console.log(test_1.Test.tt);
    }
    /*
    * サーバーにリクエストがあった時に実行される関数
    */
    requestHandler(request, response) {
        fs.readFile('./index.html', 'utf-8', (err, data) => {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        });
    }
}
const main = new Main();
//# sourceMappingURL=app.js.map