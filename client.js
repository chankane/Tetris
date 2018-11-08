"use strict";
//import Board from 'board.js';
//const Board = require('./board.js');
Object.defineProperty(exports, "__esModule", { value: true });
class Client {
    constructor() {
        this.keyBuf = new Array();
        this.onload = () => {
            this.createCanvas();
            this.initKeyEvent();
            //console.log(Board.blockNumX);
        };
    }
    initKeyEvent() {
        window.addEventListener('keydown', e => {
            this.keyBuf[e.keyCode] = true;
        });
        window.addEventListener('keyup', e => {
            this.keyBuf[e.keyCode] = false;
        });
    }
    createCanvas() {
        let canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        var context = canvas.getContext('2d');
        context.fillStyle = "rgb(0,0,192)";
        context.fillRect(0, 0, 64, 64);
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map