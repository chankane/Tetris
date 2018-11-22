class AbstractBoard {
  static _calcPixelWidth() {
    throw new Error('Override _calcPixelWidth()');
  }
  
  static _calcPixelHeight() {
    throw new Error('Override _calcPixelHeight()');
  }

  constructor(canvas) {
    canvas.style.backgroundColor = 'gray';
    this._context = canvas.getContext('2d');
  }

  repaint() {
    throw new Error('Override repaint()');
  }

  _clearScreen() {
    throw new Error('Override _clearScreen()');
  }
}
