var snake;
var gridSize = 15;
var food;
var canvas;
var started = false;
var arrow = document.getElementById('arrowKeys');

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
	snake.update();
	snake.show();

	if (started) {
		if (snake.eat(food.x, food.y)) {
			food.changeLocation();
		}
		fill(50);
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

	if (keyCode === UP_ARROW) {
		snake.dir(0, -1);
	} else if (keyCode === DOWN_ARROW) {
		snake.dir(0, 1);
	}else if (keyCode === RIGHT_ARROW) {
		snake.dir(1, 0);
	}else if (keyCode === LEFT_ARROW) {
		snake.dir(-1, 0);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	snake.reset();
	arrow.style.opacity = "1";
}
