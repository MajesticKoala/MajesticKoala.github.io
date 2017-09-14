var canvas, ctx;
var paddle, enemy;
var ball;
var keystate;

paddle = {
	width: 20,
	height: 100,
	x: 0,
	y: 0,
	score: 0
}
enemy = {
	width: 20,
	height: 100,
	x: 0,
	y: 0,
	score: 0
}

ball = {
	size: 10,
	xpos: 50,
	ypos: 50,
	xvel: 0,
	yvel: 0
}


function main() {
	canvas = document.createElement("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx = canvas.getContext('2d');
	document.body.appendChild(canvas);

	keystate = {};
	document.addEventListener('keydown', function(evt) {
		keystate[evt.keyCode] = true;
	});
	document.addEventListener('keyup', function(evt) {
		delete keystate[evt.keyCode];
	});
	init();
	loop();
}

function init() {
	paddle.y = (canvas.height-paddle.height)/2;
	enemy.y = (canvas.height-enemy.height)/2;
	enemy.x = canvas.width - enemy.width;

	ball.xvel = -4;
	ball.yvel = -2;
	ball.x = canvas.width/2;
	ball.y = canvas.height/2;
}

function loop() {
	update();
	draw();
	window.requestAnimationFrame(loop, canvas);
}

function update(){

	//check Paddle Hits
	if (ball.x <= paddle.width && ball.y >= paddle.y && ball.y <= paddle.y+paddle.height) {
		if (ball.y > paddle.y+ (paddle.height/2) -20) {
			ball.yvel+=1;
		} else if (ball.y < paddle.y+ (paddle.height/2) +20) {
			ball.yvel-=1;
		}
		ball.xvel*=-1;
	} else if (ball.x >= enemy.x-ball.size && ball.y >= enemy.y && ball.y <= enemy.y+enemy.height) {
		if (ball.y > enemy.y+ (enemy.height/2) -20) {
			ball.yvel+=1;
		} else if (ball.y < enemy.y+ (enemy.height/2) +20) {
			ball.yvel-=1;
		}
		ball.xvel*=-1;
	}
	//check vert wall Hits
	if (ball.x < 0 ) {
		enemy.score++;
		init();
	} else if (ball.x > canvas.width) {
		paddle.score++;
		init();
	}
	//check top and bottom Hits
	if (ball.y > canvas.height-ball.size || ball.y < 0) {
		ball.yvel*=-1;
	}
	//Move ball
	ball.x += ball.xvel;
	ball.y += ball.yvel;

	//Move enemy
	if (ball.y > enemy.y+(enemy.height - 30) && enemy.y < canvas.height-enemy.height) {
		enemy.y += 3;
	} else if (ball.y < enemy.y + 30 && enemy.y > 0) {
		enemy.y -= 3;
	}

	//Move paddle
	if (keystate[38] && paddle.y > 0) {
		paddle.y -= 3;
	} else if (keystate[40] && paddle.y < canvas.height-paddle.height) {
		paddle.y += 3;
	}
}

function draw() {
	ctx.fillStyle = "#ddd";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//Draws score
	ctx.font = "300px monospace";
	ctx.fillStyle = "#eee";
	ctx.fillText(paddle.score, canvas.width/2 - 250, canvas.height/2 + 100);
	ctx.fillText(enemy.score, canvas.width/2 + 80, canvas.height/2 + 100);

	ctx.fillStyle = "#333";
	//draws ball
	ctx.fillRect(ball.x, ball.y, ball.size, ball.size);
	//Draws player and enemy paddles
	ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
	ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);


}

main();
