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
