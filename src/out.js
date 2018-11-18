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
const BlockSize = {
  LARGE: 20,
  MEDIUM: 20,
  SMALL: 20
}
class Board {
  constructor(canvas, blockSize) {
	  canvas.width = blockSize * Board._WIDTH;
    canvas.height = blockSize * Board._HEIGHT;
    canvas.style.backgroundColor = 'gray';
    this.blockSize = blockSize;
    this.context = canvas.getContext('2d');
    this.mino = null;
  }

  getMino() {
    return this.mino;
  }

  setMino(mino) {
    this.mino = mino;
  }

  repaint() {
    if (this.mino === null) {
      return;
    }

    this.context.clearRect(0, 0, this.blockSize * Board._WIDTH, this.blockSize * Board._HEIGHT);

    let colors = this.mino.getColors();
    for (let j=0; j<colors.length; j++) {
      for (let i=0; i<colors[j].length; i++) {
        this.context.fillStyle = colors[j][i];
        this.context.fillRect(this.blockSize * i, this.blockSize * j, this.blockSize - 2, this.blockSize - 2);
      }
    }
  }
}

Board._WIDTH = 5;
Board._HEIGHT = 4;
let keyBuf = new Array();

let board;

onload = () => {
	let canvas = document.getElementById("holdCanvas");
	let holdBoard = new Board(canvas, BlockSize.MEDIUM);

	canvas = document.getElementById("nextCanvas");
	let nextBoard = new NextBoard(canvas, BlockSize.MEDIUM);
	
	canvas = document.getElementById("mainCanvas");
	board = new MainBoard(canvas, BlockSize.MEDIUM, holdBoard, nextBoard);
	
	holdBoard.repaint();
	board.repaint();
	nextBoard.repaint();

	canvas = document.getElementById("t");
	let context = canvas.getContext('2d');
	context.fillRect(-50, -50, 100, 100);
};

document.onkeydown = (e) => {
	keyBuf[e.keyCode] = true;
	switch (e.keyCode) {
	case KeyEvent.DOM_VK_Z:
		board.rotateLeft();
		board.repaint();
		break;
	case KeyEvent.DOM_VK_X:
		board.rotateRight();
		board.repaint();
		break;
	case KeyEvent.DOM_VK_SPACE:
		board.hold();
		board.repaint();
		break;
	case KeyEvent.DOM_VK_UP:
		board.hardDrop();
		board.repaint();
		break;
	case KeyEvent.DOM_VK_DOWN:
		board.softDrop();
		board.repaint();
		break;
	case KeyEvent.DOM_VK_LEFT:
		board.moveLeft();
		board.repaint();
		break;
	case KeyEvent.DOM_VK_RIGHT:
		board.moveRight();
		board.repaint();
		break;
	}
};

document.onkeyup = (e) => {
	keyBuf[e.keyCode] = false;
};
if (typeof KeyEvent === "undefined") { 
  var KeyEvent = { 
   DOM_VK_CANCEL: 3, 
   DOM_VK_HELP: 6, 
   DOM_VK_BACK_SPACE: 8, 
   DOM_VK_TAB: 9, 
   DOM_VK_CLEAR: 12, 
   DOM_VK_RETURN: 13, 
   DOM_VK_ENTER: 14, 
   DOM_VK_SHIFT: 16, 
   DOM_VK_CONTROL: 17, 
   DOM_VK_ALT: 18, 
   DOM_VK_PAUSE: 19, 
   DOM_VK_CAPS_LOCK: 20, 
   DOM_VK_ESCAPE: 27, 
   DOM_VK_SPACE: 32, 
   DOM_VK_PAGE_UP: 33, 
   DOM_VK_PAGE_DOWN: 34, 
   DOM_VK_END: 35, 
   DOM_VK_HOME: 36, 
   DOM_VK_LEFT: 37, 
   DOM_VK_UP: 38, 
   DOM_VK_RIGHT: 39, 
   DOM_VK_DOWN: 40, 
   DOM_VK_PRINTSCREEN: 44, 
   DOM_VK_INSERT: 45, 
   DOM_VK_DELETE: 46, 
   DOM_VK_0: 48, 
   DOM_VK_1: 49, 
   DOM_VK_2: 50, 
   DOM_VK_3: 51, 
   DOM_VK_4: 52, 
   DOM_VK_5: 53, 
   DOM_VK_6: 54, 
   DOM_VK_7: 55, 
   DOM_VK_8: 56, 
   DOM_VK_9: 57, 
   DOM_VK_SEMICOLON: 59, 
   DOM_VK_EQUALS: 61, 
   DOM_VK_A: 65, 
   DOM_VK_B: 66, 
   DOM_VK_C: 67, 
   DOM_VK_D: 68, 
   DOM_VK_E: 69, 
   DOM_VK_F: 70, 
   DOM_VK_G: 71, 
   DOM_VK_H: 72, 
   DOM_VK_I: 73, 
   DOM_VK_J: 74, 
   DOM_VK_K: 75, 
   DOM_VK_L: 76, 
   DOM_VK_M: 77, 
   DOM_VK_N: 78, 
   DOM_VK_O: 79, 
   DOM_VK_P: 80, 
   DOM_VK_Q: 81, 
   DOM_VK_R: 82, 
   DOM_VK_S: 83, 
   DOM_VK_T: 84, 
   DOM_VK_U: 85, 
   DOM_VK_V: 86, 
   DOM_VK_W: 87, 
   DOM_VK_X: 88, 
   DOM_VK_Y: 89, 
   DOM_VK_Z: 90, 
   DOM_VK_CONTEXT_MENU: 93, 
   DOM_VK_NUMPAD0: 96, 
   DOM_VK_NUMPAD1: 97, 
   DOM_VK_NUMPAD2: 98, 
   DOM_VK_NUMPAD3: 99, 
   DOM_VK_NUMPAD4: 100, 
   DOM_VK_NUMPAD5: 101, 
   DOM_VK_NUMPAD6: 102, 
   DOM_VK_NUMPAD7: 103, 
   DOM_VK_NUMPAD8: 104, 
   DOM_VK_NUMPAD9: 105, 
   DOM_VK_MULTIPLY: 106, 
   DOM_VK_ADD: 107, 
   DOM_VK_SEPARATOR: 108, 
   DOM_VK_SUBTRACT: 109, 
   DOM_VK_DECIMAL: 110, 
   DOM_VK_DIVIDE: 111, 
   DOM_VK_F1: 112, 
   DOM_VK_F2: 113, 
   DOM_VK_F3: 114, 
   DOM_VK_F4: 115, 
   DOM_VK_F5: 116, 
   DOM_VK_F6: 117, 
   DOM_VK_F7: 118, 
   DOM_VK_F8: 119, 
   DOM_VK_F9: 120, 
   DOM_VK_F10: 121, 
   DOM_VK_F11: 122, 
   DOM_VK_F12: 123, 
   DOM_VK_F13: 124, 
   DOM_VK_F14: 125, 
   DOM_VK_F15: 126, 
   DOM_VK_F16: 127, 
   DOM_VK_F17: 128, 
   DOM_VK_F18: 129, 
   DOM_VK_F19: 130, 
   DOM_VK_F20: 131, 
   DOM_VK_F21: 132, 
   DOM_VK_F22: 133, 
   DOM_VK_F23: 134, 
   DOM_VK_F24: 135, 
   DOM_VK_NUM_LOCK: 144, 
   DOM_VK_SCROLL_LOCK: 145, 
   DOM_VK_COMMA: 188, 
   DOM_VK_PERIOD: 190, 
   DOM_VK_SLASH: 191, 
   DOM_VK_BACK_QUOTE: 192, 
   DOM_VK_OPEN_BRACKET: 219, 
   DOM_VK_BACK_SLASH: 220, 
   DOM_VK_CLOSE_BRACKET: 221, 
   DOM_VK_QUOTE: 222, 
   DOM_VK_META: 224 
  }; 
} 
class MainBoard extends Board {

  _initColors() {
    this.colors = new Array(MainBoard._HEIGHT + MainBoard._HIDE_HEIGHT);
    for (let j = 0; j < MainBoard._HEIGHT + MainBoard._HIDE_HEIGHT; j++) {
      this.colors[j] = new Array(MainBoard._WIDTH).fill(Color.EMPTY);
    }
  }

  constructor(canvas, blockSize, holdBoard, nextBoard) {
    super(canvas, blockSize);
    canvas.width = blockSize * MainBoard._WIDTH;
    canvas.height = blockSize * (MainBoard._HEIGHT + 0.25);
    this.minoX = this.minoY = 0;
    this.colors = null;
    this._initColors();
    this.holdBoard = holdBoard;
    this.nextBoard = nextBoard;
    this.setMino(nextBoard.getMino());
    this.startDropping();
  }

  startDropping() {
    setInterval(() => {
      this.minoY++;
      if (this._isIllegalPosition()) {
        this.minoY--;
        this._fixMino();
        this.minoY = 0;
        this.mino = this.nextBoard.getMino();
      }
      this.repaint();
    }, 1000);
  }

  hardDrop() {
    //?
  }

  softDrop() {
    this.minoY++;
  }

  moveLeft() {
    this.minoX--;
    if (this._isIllegalPosition()) {
      this.minoX++;
    }
  }

  moveRight() {
    this.minoX++;
    if (this._isIllegalPosition()) {
      this.minoX--;
    }
  }

  rotateLeft() {
    this.mino.rotateL();
  }

  rotateRight() {
    this.mino.rotateR();
  }

  hold() {
    //?
  }

  _fixMino() {
    let colors = this.mino.getColors();
    for (let j=0; j<colors.length; j++) {
      for (let i=0; i<colors[j].length; i++) {
        if (colors[j][i] !== Color.EMPTY) {
          this.colors[j + this.minoY][i + this.minoX] = colors[j][i];
        }
      }
    }
  }

  _isIllegalPosition() {
    let colors = this.mino.getColors();
    for (let j=0; j<colors.length; j++) {
      for (let i=0; i<colors[j].length; i++) {
        if (colors[j][i] !== Color.EMPTY
            && (this.minoX + i < 0 || this.minoX + i >= MainBoard._WIDTH || this.minoY + j >= MainBoard._HEIGHT + MainBoard._HIDE_HEIGHT
            || this.colors[this.minoY + j][this.minoX + i] !== Color.EMPTY)) {
          return true;
        }
      }
    }
    return false;
  }

  repaint() {
    this.context.clearRect(0, 0, this.blockSize * Board._WIDTH, this.blockSize * (Board._HEIGHT - MainBoard._HIDE_HEIGHT + 0.25));
    for (let j=0; j<this.colors.length; j++) {
      for (let i=0; i<this.colors[j].length; i++) {
        this.context.fillStyle = this.colors[j][i];
        this.context.fillRect(this.blockSize * i, this.blockSize * (j - MainBoard._HIDE_HEIGHT + 0.25),
            this.blockSize - 2, this.blockSize - 2);
      }
    }

    if (this.mino === null) {
      return;
    }
    let colors = this.mino.getColors();
    for (let j=0; j<colors.length; j++) {
      for (let i=0; i<colors.length; i++) {
        this.context.fillStyle = colors[j][i];
        this.context.fillRect(this.blockSize * (this.minoX + i), this.blockSize * (this.minoY + j - MainBoard._HIDE_HEIGHT + 0.25),
            this.blockSize - 2, this.blockSize - 2);
      }
    }
  }
}

MainBoard._WIDTH = 10;
MainBoard._HEIGHT = 20;
MainBoard._HIDE_HEIGHT = 4;
class MinoFactory {
  static create() {
    let mino;
    switch(Math.floor(Math.random() * 7)) {
    case 0:
      mino = new I();
      break;
    case 1:
      mino = new O();
      break;
    case 2:
      mino = new S();
      break;
    case 3:
      mino = new Z();
      break;
    case 4:
      mino = new J();
      break;
    case 5:
      mino = new L();
      break;
    case 6:
      mino = new T();
      break;
    }
    return mino;
  }
}
class NextBoard extends Board {
  constructor(canvas, blockSize) {
    super(canvas, blockSize);
    this.mino = MinoFactory.create();
  }

  getMino() {
    let mino = this.mino;
    this.mino = MinoFactory.create();
    return mino;
  }
}
