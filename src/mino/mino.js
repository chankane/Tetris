class Mino {
  constructor(colors) {
    this.colors = new Array(colors.length);
    for (let j=0; j<colors.length; j++) {
      this.colors[j] = new Array(colors[j].length);
      for (let i=0; i<colors[j].length; i++) {
        this.colors[j][i] = colors[j][i];
      }
    }
  }

  getColors() {
    return this.colors;
  }
}