function Snake() {

	this.reset = function(){
		started = false;
		this.x = gridSize*floor((windowWidth/gridSize)/2);
		this.y = 480;
		this.xdir = 0;
		this.ydir = 0;
		this.total = 1;
		this.tail = [];
	}

	this.fadeOut = function() {
			for (var i = 0; i < this.tail.length; i++) {
				fill(50, 1);
				rect(this.tail[i].x, this.tail[i].y, gridSize, gridSize);
			}
		}

	this.dir = function(x, y){
		this.xdir = x;
		this.ydir = y;
	}

	this.checkTailHit = function() {
		for (var i = 0; i < this.tail.length; i++) {
			if(this.x === this.tail[i].x && this.y === this.tail[i].y){
				return true;
			}
		}
	}

	this.checkWallHit = function() {
		if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
			return true;
		}
	}

	this.update = function() {
		if(this.total === this.tail.length){
			this.tail.shift();
		}
		this.tail[this.total-1] = createVector(this.x, this.y);

		this.x = this.x + this.xdir*gridSize;
		this.y = this.y + this.ydir*gridSize;
	}

	this.show = function() {
		fill(50);
		for (var i = 0; i < this.tail.length; i++) {
			rect(this.tail[i].x, this.tail[i].y, gridSize, gridSize);
		}
		noStroke();
		fill(50);
		rect(this.x, this.y, gridSize, gridSize);
	}

	this.eat = function(posx, posy) {
		if (this.x === posx && this.y === posy) {
			this.total++;
			return true;
		}
	}
}
