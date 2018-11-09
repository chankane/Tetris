class Board {
  initColors(blockNumX, blockNumY) {
    this.colors = new Array(blockNumY);
    for (let j=0; j<blockNumY; j++) {
      this.colors[j] = new Array(blockNumX);
      for (let i=0; i<blockNumX; i++) {   
        this.colors[j][i] = Color.EMPTY;
      }
    }
  }
  constructor(blockNumX, blockNumY, canvas) {
    this.blockNumX = blockNumX;
    this.blockNumY = blockNumY;
    this.initColors();
	  canvas.width = Board.BLOCK_SIZE * blockNumX;
    canvas.height = Board.BLOCK_SIZE * blockNumY;
    canvas.style.backgroundColor = 'gray';
    this.context = canvas.getContext('2d');
  }

  setColors(colors) {
    this.colors = colors;
  }

  repaint() {
    this.context.clearRect(0, 0, Board.BLOCK_SIZE * this.blockNumX, Board.BLOCK_SIZE * this.blockNumY);
    for (let j=0; j<this.blockNumY; j++) {
      for (let i=0; i<this.blockNumX; i++) {
        
        this.context.fillStyle = (j*this.blockNumX+i)%2 ? Color.I : Color.J;
        this.context.fillRect(Board.BLOCK_SIZE * i, Board.BLOCK_SIZE * j, Board.BLOCK_SIZE - 2, Board.BLOCK_SIZE - 2);
      }
    }
  }
}

Board.BLOCK_SIZE = 20;
let keyBuf = new Array();

let txt;

let board;

onload = function(){
	txt = document.getElementById('code');
	initCanvas();
};

function initCanvas() {
  let canvas = document.getElementById("holdCanvas");
  let board = new Board(4, 4, canvas);
	board.repaint();
	
	canvas = document.getElementById("mainCanvas");
  board = new Board(10, 20, canvas);
	board.repaint();
	
	canvas = document.getElementById("nextCanvas");
  board = new Board(4, 4, canvas);
  board.repaint();
}

document.onkeydown = function (e) {
	txt.innerText = e.keyCode;
	keyBuf[e.keyCode] = true;
};

document.onkeyup = function (e) {
	keyBuf[e.keyCode] = false;
};
const Color = {
  EMPTY: 'lightgray',
  I: 'lightblue',
  O: 'yellow',
  S: 'green',
  Z: 'red',
  J: 'blue',
  L: 'orange',
  T: 'violet',
}