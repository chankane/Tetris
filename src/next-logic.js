class NextLogic {
  constructor() {
    this.mino = MinoFactory.create();
  }
  
  next(mino) {
    mino = this.mino;
    this.mino = MinoFactory.create();
  }
}