let keyBuf = new Array();

let board;

onload = () => {
	let canvas = document.getElementById("holdCanvas");
	let holdBoard = new Board(canvas, BlockSize.MEDIUM);

	canvas = document.getElementById("nextCanvas");
	let nextBoard = new NextBoard(canvas, BlockSize.MEDIUM);
	
	canvas = document.getElementById("mainCanvas");
	board = new MainBoard(canvas, BlockSize.MEDIUM, holdBoard, nextBoard);
	
	holdBoard.repaint();
	board.repaint();
	nextBoard.repaint();

	canvas = document.getElementById("t");
	let context = canvas.getContext('2d');
	context.fillRect(-50, -50, 100, 100);
};

document.onkeydown = (e) => {
	keyBuf[e.keyCode] = true;
	switch (e.keyCode) {
	case KeyEvent.DOM_VK_Z:
		board.rotateLeft();
		board.repaint();
		break;
	case KeyEvent.DOM_VK_X:
		board.rotateRight();
		board.repaint();
		break;
	case KeyEvent.DOM_VK_SPACE:
		board.hold();
		board.repaint();
		break;
	case KeyEvent.DOM_VK_UP:
		board.hardDrop();
		board.repaint();
		break;
	case KeyEvent.DOM_VK_DOWN:
		board.softDrop();
		board.repaint();
		break;
	case KeyEvent.DOM_VK_LEFT:
		board.moveLeft();
		board.repaint();
		break;
	case KeyEvent.DOM_VK_RIGHT:
		board.moveRight();
		board.repaint();
		break;
	}
};

document.onkeyup = (e) => {
	keyBuf[e.keyCode] = false;
};
