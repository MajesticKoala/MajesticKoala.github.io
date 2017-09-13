var snake;
var gridSize = 15;
var food;
var canvas;
var started = false;
var arrow = document.getElementById('arrowKeys');
var remainingSegs = 15;

function setup(){
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1');
	snake = new Snake();
	snake.reset();
	frameRate(30);
}

function draw(){
	background(238, 238, 238);
	snake.newPos();
	snake.drawSnake();

	if (started) {
		if (snake.eat(food.x, food.y)) {
			food.changeLocation();
			remainingSegs+=5;
		} else if (remainingSegs > 0) {
			snake.eat(snake.x, snake.y);
			remainingSegs--;
		}
		fill(70);
		rect(food.x, food.y, gridSize, gridSize);
	}

	if (snake.checkWallHit()){
		snake.reset();
		arrow.style.opacity = "1";
	}
	if (snake.checkTailHit()){
		snake.reset();
		arrow.style.opacity = "1";
	}
}

function keyPressed(){
	if (!started) {
		arrow.style.opacity = "0";
		food = new Food();
		started = true;
	}
	if (keyCode === 37 && snake.xdir != 1) {
		snake.dir(-1, 0);
	} else if (keyCode === 38 && snake.ydir != 1) {
		snake.dir(0, -1);
	} else if (keyCode === 39 && snake.xdir != -1) {
		snake.dir(1, 0);
	} else if (keyCode === 40 && snake.ydir != -1) {
		snake.dir(0, 1);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	snake.reset();
	arrow.style.opacity = "1";
}
