class MainBoard extends AbstractBoard {

  static _calcPixelWidth() {
    return MainBoard._BLOCK_SIZE * MainBoard._WIDTH;
  }
  
  static _calcPixelHeight() {
    return MainBoard._BLOCK_SIZE * MainBoard._HEIGHT;
  }

  _initColors() {
    this._colors = new Array(Math.floor(MainBoard._HEIGHT));
    for (let j = 0; j < MainBoard._HEIGHT + MainBoard._HIDE_HEIGHT; j++) {
      this._colors[j] = new Array(MainBoard._WIDTH).fill(Color.EMPTY);
    }
    this._colors.x = 0;
    this._colors.y = 0;
  }

  constructor(canvas, holdBoard, nextBoard) {
    super(canvas);
    canvas.width = MainBoard._calcPixelWidth();
    canvas.height = MainBoard._calcPixelHeight();
    this._minoX = this._minoY = 0;
    this._initColors();
    this._holdBoard = holdBoard;
    this._nextBoard = nextBoard;
    this.setMino(nextBoard.getMino());
    this.startDropping();
  }

  startDropping() {
    setInterval(() => {
      this._minoY++;
      if (Srs._isIllegalPosition()) {
        this._minoY--;
        this._next();
      }
      this.repaint();
    }, 1000);
  }

  _next() {
    this._fixMino();
    this._minoY = 0;
    this._mino = this._nextBoard.getMino();
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

  repaint(colors) {
    this._clearScreen();
    for (let j=0; j<colors.length; j++) {
      for (let i=0; i<colors[j].length; i++) {
        this.context.fillStyle = colors[j][i];
        this.context.fillRect(MainBoard._BLOCK_SIZE * i, MainBoard._BLOCK_SIZE * (j - MainBoard._HIDE_HEIGHT + 0.25),
        MainBoard._BLOCK_SIZE - 2, MainBoard._BLOCK_SIZE - 2);
      }
    }

    /*if (this.mino === null) {
      return;
    }
    for (let j=0; j<this.mino.length; j++) {
      for (let i=0; i<this.mino[j].length; i++) {
        if (this.mino[j][i] == Color.EMPTY) {
          continue;
        }
        this.context.fillStyle = this.mino[j][i];
        this.context.fillRect(MainBoard._BLOCK_SIZE * (this.minoX + i), MainBoard._BLOCK_SIZE * (this.minoY + j - MainBoard._HIDE_HEIGHT + 0.25),
        MainBoard._BLOCK_SIZE - 2, MainBoard._BLOCK_SIZE - 2);
      }
    }*/
  }

  _clearScreen() {
    this._context.clearRect(0, 0, MainBoard._calcPixelWidth(), MainBoard._calcPixelHeight());
  }
}

MainBoard._BLOCK_SIZE = 20;
MainBoard.WIDTH = MainLogic._WIDTH;
MainBoard.HEIGHT = 20.25;
