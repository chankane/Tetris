import Board from 'board.js';
//const Board = require('./board.js');

let keyBuf = new Array();

let txt;

onload = function(){
	txt = document.getElementById('code');
	createCanvas();
	console.log(Board.blockNumX);
};

function createCanvas() {
	let canvas = document.createElement("canvas");
	canvas.width = 64;
	canvas.height = 64;
	var context = canvas.getContext('2d');
	context.fillStyle = "rgb(0,0,192)";
	context.fillRect(0, 0, 64, 64);
}

document.onkeydown = function (e) {
	if(!e) e = window.event;
	txt.innerText = e.keyCode;
	keyBuf[e.keyCode] = true;
};

document.onkeyup = function (e) {
	if(!e) e = window.event;
	keyBuf[e.keyCode] = false;
};