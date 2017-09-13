function Food() {
	this.x = floor(random(windowWidth/gridSize))*gridSize;
	this.y = floor(random(windowHeight/gridSize))*gridSize;

	this.changeLocation = function() {
		this.x = floor(random(windowWidth/gridSize))*gridSize;
		this.y = floor(random(windowHeight/gridSize))*gridSize;
	}
}
