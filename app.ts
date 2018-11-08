import * as http from 'http';
import * as fs from 'fs';
import { Test } from './test';

class Main {
  constructor() {
    const server: http.Server = http.createServer(
      (request: http.IncomingMessage, response: http.ServerResponse) => {
        this.requestHandler(request, response)
      }
    );
    server.listen('4649');
    console.log('listening');
    console.log(Test.tt);
  }
 
  /*
  * サーバーにリクエストがあった時に実行される関数
  */
  private requestHandler(request: http.IncomingMessage, response: http.ServerResponse): void {
    fs.readFile('./index.html', 'utf-8' , (err, data) => {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(data);
      response.end();
    });
  }
}
 
const main = new Main();
