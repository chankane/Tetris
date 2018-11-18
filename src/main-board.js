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
