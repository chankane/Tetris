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
    this.minoX = this.minoY = 0;
    this.mino = null;
  }

  setColors(colors) {
    for (let j=0; j<colors.length; j++) {
      for (let i=0; i<colors[j].length; i++) {
        this.colors[j][i] = colors[j][i];
      }
    }
  }

  setMino(mino, x = 0, y = 0) {
    this.mino = mino;
    this.minoX = x;
    this.minoY = y;
  }

  down() {
    this.minoY++;
  }

  repaint() {
    this.context.clearRect(0, 0, Board.BLOCK_SIZE * this.blockNumX, Board.BLOCK_SIZE * this.blockNumY);
    for (let j=0; j<this.blockNumY; j++) {
      for (let i=0; i<this.blockNumX; i++) {
        this.context.fillStyle = this.colors[j][i];
        this.context.fillRect(Board.BLOCK_SIZE * i, Board.BLOCK_SIZE * j, Board.BLOCK_SIZE - 2, Board.BLOCK_SIZE - 2);
      }
    }

    if (this.mino === null) {
      return;
    }
    for (let j=0; j<this.mino.getColors().length; j++) {
      for (let i=0; i<this.mino.getColors().length; i++) {
        this.context.fillStyle = this.mino.getColors()[j][i];
        this.context.fillRect(Board.BLOCK_SIZE * (i + this.minoX), Board.BLOCK_SIZE * (j + this.minoY), Board.BLOCK_SIZE - 2, Board.BLOCK_SIZE - 2);
      }
    }
  }

  _isLegalPosition() {
    for (let j=0; j<this.mino.getColors().length; j++) {
      for (let i=0; i<this.mino.getColors().length; i++) {
        if (j + this.minoX < 0) {
          return false;
        }
        if (this.mino.getColors()[j + this.minoY][i + this.minoY] != Color.EMPTY) {
          return false;
        }
        this.context.fillStyle = this.mino.getColors()[j][i];
        this.context.fillRect(Board.BLOCK_SIZE * (i + this.minoX), Board.BLOCK_SIZE * (j + this.minoY), Board.BLOCK_SIZE - 2, Board.BLOCK_SIZE - 2);
      }
    }
  }
}

Board.BLOCK_SIZE = 20;
