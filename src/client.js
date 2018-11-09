let keyBuf = new Array();

let txt;

let board;

onload = function(){
	txt = document.getElementById('code');
	initCanvas();
};

function initCanvas() {
  let canvas = document.getElementById("holdCanvas");
  let board = new Board(4, 4, canvas);
	board.repaint();
	
	canvas = document.getElementById("mainCanvas");
  board = new Board(10, 20, canvas);
	board.repaint();
	
	canvas = document.getElementById("nextCanvas");
  board = new Board(4, 4, canvas);
  board.repaint();
}

document.onkeydown = function (e) {
	txt.innerText = e.keyCode;
	keyBuf[e.keyCode] = true;
};

document.onkeyup = function (e) {
	keyBuf[e.keyCode] = false;
};
