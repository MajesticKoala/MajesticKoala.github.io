function Snake() {

	this.reset = function(){
		started = false;
		this.x = gridSize*floor((width/gridSize)/2);
		this.y = gridSize*30;
		this.xdir = 0;
		this.ydir = 0;
		this.segmentNumber = 1;
		this.snakeArray = [];
		remainingSegs = floor(Math.random()*10) + 10;
		foodColor = color(70, 70, 70);
	}

	this.dir = function(x, y){
		this.xdir = x;
		this.ydir = y;
	}

	this.checkTailHit = function() {
		for (var i = 0; i < this.snakeArray.length; i++) {
			if(this.x === this.snakeArray[i].x && this.y === this.snakeArray[i].y){
				return true;
			}
		}
	}

	this.checkWallHit = function() {
		if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
			return true;
		}
	}

	this.newPos = function() {
		if(this.segmentNumber === this.snakeArray.length){
			this.snakeArray.shift();
			}
			this.snakeArray[this.segmentNumber-1] = createVector(this.x, this.y);


		this.x = this.x + this.xdir*gridSize;
		this.y = this.y + this.ydir*gridSize;
	}

	this.drawSnake = function() {
		fill(50);
		for (var i = 0; i < this.snakeArray.length; i++) {
			rect(this.snakeArray[i].x, this.snakeArray[i].y, gridSize, gridSize);
		}
		noStroke();
		fill(50);
		rect(this.x, this.y, gridSize, gridSize);
	}

	this.eat = function(posx, posy) {
		if (this.x === posx && this.y === posy) {
			this.segmentNumber++;
			return true;
		}
	}
}
