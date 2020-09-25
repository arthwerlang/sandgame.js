var CANVAS = document.getElementById('cvs');
var CTX = CANVAS.getContext('2d');
var CELLS = [];
//FPS AND TIME
var stop = false;
var frameCount = 0;
var fps = 60;
var fpsInterval, startTime, now, then, elapsed;

var mousedown = false;

class Cell {
	constructor(type, x, y){
		this.type = type; // SAND, WATER, STONE, FIRE
		this.x = x; // X ON THE GRID
		this.y = y; // Y ON THE GRID
		this.moved = false;
		this.accel = undefined; // MAKE IT SMOOTHER -> implement later.

	}
	update(){
		this.moved = true;
		if(this.y < CANVAS.width/5 - 5 && CELLS[this.x][this.y+1] == undefined){
			CELLS[this.x][this.y] = undefined;
			this.y+=1;
			CELLS[this.x][this.y] = this;
		}else if(this.y < CANVAS.width/5 - 5 && this.x > 0 && CELLS[this.x-1][this.y+1] == undefined){
			CELLS[this.x][this.y] = undefined;
			this.y+=1;
			this.x -=1
			CELLS[this.x][this.y] = this;
		}else if(this.y < CANVAS.width/5 - 5 && this.x < CANVAS.height/5 - 5 && CELLS[this.x+1][this.y+1] == undefined){
			CELLS[this.x][this.y] = undefined;
			this.y+=1;
			this.x +=1
			CELLS[this.x][this.y] = this;
		}
	}

}
function onMouseDown(pEvt){
	mousedown = true
	gridX = Math.floor(pEvt.offsetX/5);
	gridY = Math.floor(pEvt.offsetY/5);
	if(CELLS[gridX][gridY] != undefined) return;
	else{
		cell = new Cell('SAND', gridX, gridY);
		CELLS[cell.x][cell.y] = cell;
	}
}
function INIT(){
	window.onmousedown = onMouseDown;
	for(var i = 0; i < CANVAS.width/5; i++){
		CELLS[i] = [];
	}

    fpsInterval = 1000 / fps;
    then = Date.now();
    console.log(then);
    startTime = then;
	UPDATE();
}

function UPDATE(){
	window.requestAnimationFrame(UPDATE);
	now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

		CTX.fillStyle = '#ffffff';
		CTX.fillRect(0,0, CANVAS.width, CANVAS.height);

		for(var i = 0; i < CELLS.length; i++){
			for(var j = 0; j < CELLS[i].length; j++){
				if(CELLS[i][j] != undefined && CELLS[i][j].moved){ 
					CELLS[i][j].moved = false; 
					CTX.fillStyle = '#ebb207';
					CTX.fillRect(i*5, j*5, 5, 5);
					continue; 
				}
				else if(CELLS[i][j] != undefined && !CELLS[i][j].moved){
					
					CELLS[i][j].update();
					CTX.fillStyle = '#ebb207';
					CTX.fillRect(i*5, j*5, 5, 5);
				}else{
					continue;
				}
			}
		}
    }

}
window.onLoad = INIT();