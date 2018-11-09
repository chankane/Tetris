class Board {
  constructor(blockNumX, blockNumY, canvas) {
    this.blockNumX = blockNumX;
    this.blockNumY = blockNumY;
    this.colors = new Array(blockNumY);
    for (let i=0; i<blockNumY; i++) {
      this.colors[i] = new Array(blockNumX).fill(Color.EMPTY);
    }
	  canvas.width = Board.BLOCK_SIZE * blockNumX;
    canvas.height = Board.BLOCK_SIZE * blockNumY;
    canvas.style.backgroundColor = 'gray';
    this.context = canvas.getContext('2d');
    console.log(this.colors);
  }

  setColors(colors) {
    for (let j=0; j<colors.length; j++) {
      for (let i=0; i<colors[j].length; i++) {
        this.colors[j][i] = colors[j][i];
      }
    }
  }

  repaint() {
    this.context.clearRect(0, 0, Board.BLOCK_SIZE * this.blockNumX, Board.BLOCK_SIZE * this.blockNumY);
    for (let j=0; j<this.blockNumY; j++) {
      for (let i=0; i<this.blockNumX; i++) {
        this.context.fillStyle = this.colors[j][i];
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
	/*board.setColors([
		[null   , Color.T, null   ],
		[Color.T, Color.T, Color.T],
		[null   , null   , null   ],
	]);*/
	board.setColors(new T().getColors());
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
  T: 'magenta',
}
class Mino {
  constructor(colors) {
    this.colors = new Array(colors.length);
    for (let j=0; j<colors.length; j++) {
      this.colors[j] = new Array(colors[j].length);
      for (let i=0; i<colors[j].length; i++) {
        this.colors[j][i] = colors[j][i];
      }
    }
  }

  getColors() {
    return this.colors;
  }
}
class T extends Mino {
  constructor() {
    let pattern = [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ];
    let colors = new Array(pattern.length);
    for (let j = 0; j < pattern.length; j++) {
      colors[j] = new Array(pattern[j].length);
      for (let i = 0; i < pattern.length; i++) {
        if(pattern[j][i]) {
          colors[j][i] = Color.T;
        } else {
          colors[j][i] = Color.EMPTY;
        }
      }
    }
    super(colors);
  }
}
