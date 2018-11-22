class Srs {

  static isIllegalPosition(colors, mino) {
    for (let j=0; j<mino.length; j++) {
      for (let i=0; i<mino[j].length; i++) {
        if (colors[j][i] !== Color.EMPTY
            && (mino.x + i < 0 || mino.x + i >= MainBoard._WIDTH || mino.y + j >= MainBoard._HEIGHT + MainBoard._HIDE_HEIGHT
            || colors[minoY + j][minoX + i] !== Color.EMPTY)) {
          return true;
        }
      }
    }
    return false;
  }

  rotateLeft(colors, mino, minoX, minoY) {
    this._rotL(mino);
  }
  
  rotateRight(colors, mino) {
    this._rotR(mino);
  }

  _rotR(mino) {
    this._transpose();
    for (let j = 0; j < mino.length; j++) {
      for (let i = 0; i < mino.length / 2; i++) {
        let tmp = mino[j][i];
        mino[j][i] = mino[j][mino.length - i - 1];
        mino[j][mino.length - i - 1] = tmp;
      }
    }
  }

  _rotL(mino) {
    this._transpose();
    for (let i = 0; i < mino.length / 2; i++) {
      let tmp = mino[i];
      mino[i] = mino[mino.length - i - 1];
      mino[mino.length - i - 1] = tmp;
    }
  }

  _transpose(mino) {
    for (let j = 0; j < mino.length; j++) {
      for (let i = 0; i < j; i++) {
        let tmp = mino[j][i];
        mino[j][i] = mino[i][j];
        mino[i][j] = tmp;
      }
    }
  }
}