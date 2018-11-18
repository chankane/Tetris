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