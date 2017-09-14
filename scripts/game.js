var snake;
var gridSize = 15;
var food;
var canvas;
var started = false;
var remainingSegs = 15;
var arrow = document.getElementById('arrowKeys');
var score = document.getElementById('score');


function setup(){
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1');
	snake = new Snake();
	snake.reset();
	frameRate(20);
}

function draw(){
	background(238, 238, 238);
	snake.newPos();
	snake.drawSnake();

	if (started) {
		if (snake.eat(food.x, food.y)) {
			food.changeLocation();
			remainingSegs+=10;
		} else if (remainingSegs > 0) {
			snake.eat(snake.x, snake.y);
			remainingSegs--;
		}
		fill(70);
		rect(food.x, food.y, gridSize, gridSize);
		score.innerHTML = snake.snakeArray.length;
	}

	if (snake.checkWallHit()){
		snake.reset();
		arrow.style.opacity = "1";
		score.style.opacity = '0';
	}
	if (snake.checkTailHit()){
		snake.reset();
		arrow.style.opacity = "1";
		score.style.opacity = '0';
	}

}

function keyPressed(){
	if (!started) {
		arrow.style.opacity = "0";
		score.style.opacity = '1';
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
	score.style.opacity = '0';
}
