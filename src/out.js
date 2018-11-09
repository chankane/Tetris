class Mino {
  constructor(pattern, color) {
    this.colors = new Array(pattern.length);
    for (let j = 0; j < pattern.length; j++) {
      this.colors[j] = new Array(pattern.length);
      for (let i = 0; i < pattern.length; i++) {
        if(pattern[j][i]) {
          this.colors[j][i] = color;
        } else {
          this.colors[j][i] = Color.EMPTY;
        }
      }
    }
  }

  getColors() {
    return this.colors;
  }

  rotateR() {
    this._transpose();
    for (let j = 0; j < this.colors.length; j++) {
      for (let i = 0; i < this.colors.length / 2; i++) {
        let tmp = this.colors[j][i];
        this.colors[j][i] = this.colors[j][this.colors.length - i - 1];
        this.colors[j][this.colors.length - i - 1] = tmp;
      }
    }
  }

  rotateL() {
    this._transpose();
      for (let i = 0; i < this.colors.length / 2; i++) {
        let tmp = this.colors[i];
        this.colors[i] = this.colors[this.colors.length - i - 1];
        this.colors[this.colors.length - i - 1] = tmp;
      }
  }

  _transpose() {
    for (let j = 0; j < this.colors.length; j++) {
      for (let i = 0; i < j; i++) {
        let tmp = this.colors[j][i];
        this.colors[j][i] = this.colors[i][j];
        this.colors[i][j] = tmp;
      }
    }
  }
}
const Color = {
  EMPTY: 'lightgray',
  I: 'cyan',
  O: 'yellow',
  S: 'lime',
  Z: 'red',
  J: 'blue',
  L: 'orange',
  T: 'magenta',
}
class I extends Mino {
  constructor() {
    let pattern = [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    super(pattern, Color.I);
  }
}
class J extends Mino {
  constructor() {
    let pattern = [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ];
    super(pattern, Color.J);
  }
}
class L extends Mino {
  constructor() {
    let pattern = [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ];
    super(pattern, Color.L);
  }
}
class O extends Mino {
  constructor() {
    let pattern = [
      [1, 1],
      [1, 1],
    ];
    super(pattern, Color.O);
  }
}
class S extends Mino {
  constructor() {
    let pattern = [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ];
    super(pattern, Color.S);
  }
}
class T extends Mino {
  constructor() {
    let pattern = [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ];
    super(pattern, Color.T);
  }
}
class Z extends Mino {
  constructor() {
    let pattern = [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ];
    super(pattern, Color.Z);
  }
}
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

//let board;

onload = function(){
	txt = document.getElementById('code');
	initCanvas();
};

function initCanvas() {
  let canvas = document.getElementById("holdCanvas");
	let board = new Board(4, 4, canvas);
	let p = new J();
	board.setColors(p.getColors());
	board.repaint();
	setInterval(() => {
		p.rotateL();
		console.log(p.getColors());
		board.setColors(p.getColors());
		board.repaint();
	}, 1000)
	
	canvas = document.getElementById("mainCanvas");
  let board2 = new Board(10, 20, canvas);
	board2.repaint();
	
	canvas = document.getElementById("nextCanvas");
  let board3 = new Board(4, 4, canvas);
  board3.repaint();
}

document.onkeydown = function (e) {
	txt.innerText = e.keyCode;
	keyBuf[e.keyCode] = true;
};

document.onkeyup = function (e) {
	keyBuf[e.keyCode] = false;
};
