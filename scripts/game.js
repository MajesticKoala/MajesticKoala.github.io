var snake;
var gridSize = 15;
var food;
var canvas;
var started = false;
var remainingSegs;
var arrow = document.getElementById('arrowKeys');
var score = document.getElementById('score');
//var containCanvas = document.getElementsByClassName('pageTop');
var frames = 0;


function setup(){
	var foodColor = color(70, 70, 70);
	remainingSegs = floor(Math.random()*10) + 10;
	canvas = createCanvas($(window).width(), $(window).height());
	canvas.parent('p5canvas');
	canvas.position(0, 0);
	canvas.style('z-index', '-2');
	snake = new Snake();
	snake.reset();
	frameRate(20);
}

function draw(){
	background(255, 255, 255);
	snake.newPos();
	snake.drawSnake();

	if (started) {
		if (snake.eat(food.x, food.y)) {
			let randomSeg = floor(Math.random()*10);
			//console.log(randomSeg);
			food.changeLocation();
			remainingSegs+= randomSeg + 6;
			if (randomSeg >= 7) {
				remainingSegs += 10;
				foodColor = color(200, 0, 100);
			} else {
				foodColor = 70;
			}
		} else if (remainingSegs > 0) {
			snake.eat(snake.x, snake.y);
			remainingSegs--;
		}
		fill(foodColor);
		rect(food.x, food.y, gridSize, gridSize);
		score.innerHTML = snake.snakeArray.length;

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
}

function keyPressed(e){
	if (!started) {
		arrow.style.opacity = "0";
		score.style.opacity = '1';
		food = new Food();
		started = true;
	}
	if (keyCode === 37 && snake.xdir != 1) {
		e.preventDefault();
		snake.dir(-1, 0);
	} else if (keyCode === 38 ) {
		e.preventDefault();
		if (snake.ydir != 1) {
			snake.dir(0, -1);
		}
	} else if (keyCode === 39 && snake.xdir != -1) {
		e.preventDefault();
		snake.dir(1, 0);
	} else if (keyCode === 40) {
		e.preventDefault();
		if (snake.ydir != -1) {
			snake.dir(0, 1);
		}
	}
}

function windowResized() {
	resizeCanvas($(window).width(), $(window).height());
	snake.reset();
	arrow.style.opacity = "1";
	score.style.opacity = '0';
}
