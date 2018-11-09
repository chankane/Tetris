class T extends Mino {
  constructor() {
    let pattern = [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ];
    let colors = new Array(pattern.length);
    for (let j = 0; j < pattern.length; j++) {
      colors[j] = new Array(pattern[j].length);
      for (let i = 0; i < pattern.length; i++) {
        if(pattern[j][i]) {
          colors[j][i] = Color.T;
        } else {
          colors[j][i] = Color.EMPTY;
        }
      }
    }
    super(colors);
  }
}