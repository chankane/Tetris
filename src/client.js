let keyBuf = new Array();

let txt;

//let board;

onload = function(){
	txt = document.getElementById('code');
	initCanvas();
};

function initCanvas() {
  let canvas = document.getElementById("holdCanvas");
	let board = new Board(4, 4, canvas);
	let p = new J();
	//board.setColors(p.getColors());
	board.setMino(p);
	board.repaint();
	setInterval(() => {
		p.rotateL();
		console.log(p.getColors());
		board.setColors(p.getColors());
		board.repaint();
	}, 1000);
	
	canvas = document.getElementById("mainCanvas");
  let board2 = new Board(10, 20, canvas);
	board2.repaint();
	let q = new J();
	//board.setColors(p.getColors());
	board2.setMino(q);
	board2.repaint();
	setInterval(() => {
		q.rotateL();
		board2.down();
//		board2.setColors(q.getColors());
		board2.repaint();
	}, 1000);
	
	canvas = document.getElementById("nextCanvas");
  let board3 = new Board(4, 4, canvas);
  board3.repaint();
}

document.onkeydown = function (e) {
	txt.innerText = e.keyCode;
	keyBuf[e.keyCode] = true;
};

document.onkeyup = function (e) {
	keyBuf[e.keyCode] = false;
};
