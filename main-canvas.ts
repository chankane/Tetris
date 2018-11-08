//import { ? } from './index.html';

export class MainCanvas {
  private static readonly CANVAS_WIDTH: number = 200;
  private static readonly CANVAS_HEIGHT: number = 400;
  private static readonly WIDTH: number = 10;
  private static readonly HEIGHT: number = 20;
  private context: CanvasRenderingContext2D;

  constructor() {
    const canvas = <HTMLCanvasElement> document.getElementById('mainCanvas');
    this.context = canvas.getContext('2d');
    this.context.fillRect(0, 0, 200, 200);
  }
}
