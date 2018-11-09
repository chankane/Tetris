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
