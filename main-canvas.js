"use strict";
//import { ? } from './index.html';
Object.defineProperty(exports, "__esModule", { value: true });
class MainCanvas {
    constructor() {
        const canvas = document.getElementById('mainCanvas');
        this.context = canvas.getContext('2d');
        this.context.fillRect(0, 0, 200, 200);
    }
}
MainCanvas.CANVAS_WIDTH = 200;
MainCanvas.CANVAS_HEIGHT = 400;
MainCanvas.WIDTH = 10;
MainCanvas.HEIGHT = 20;
exports.MainCanvas = MainCanvas;
//# sourceMappingURL=main-canvas.js.map