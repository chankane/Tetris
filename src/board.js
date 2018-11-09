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
