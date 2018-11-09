class T extends Mino {
  constructor() {
    let colors = [
      [null   , Color.T, null   ],
      [Color.T, Color.T, Color.T],
      [null   , null   , null   ],
    ];
    super(colors);
  }
}