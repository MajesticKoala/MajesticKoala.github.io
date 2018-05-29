var canvas, ctx, yscale, xscale;
var paddle, enemy;
var ball;
var keystate;

paddle = {
	width: 10,
	height: 300,
	x: 0,
	y: 0,
	score: 0
}
enemy = {
	width: 10,
	height: 300,
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
	//create initial variables
	canvas = document.createElement("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	yscale = canvas.height/14;
	xscale = canvas.width/14;
	ctx = canvas.getContext('2d');
	document.body.appendChild(canvas);

	window.addEventListener('resize', function(){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		yscale = canvas.height/14;
		xscale = canvas.width/14;
		init();
	});

	keystate = {};
	document.addEventListener('keydown', function(e) {
		e.preventDefault();
		keystate[e.keyCode] = true;
	});
	document.addEventListener('keyup', function(e) {
		e.preventDefault();
		delete keystate[e.keyCode];
	});
	init();
	loop();
}

//initialise game function
function init() {
	paddle.height = canvas.height/2;
	paddle.y = canvas.height/2-(paddle.height/2);

	enemy.height = canvas.height/2;
	enemy.y = canvas.height/2-(enemy.height/2);
	enemy.x = canvas.width - enemy.width;


	ball.xvel = xscale/8;
	ball.yvel = -yscale/20;
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
		if (ball.y > paddle.y+ (paddle.height/2.2)) {
			ball.yvel+=2;
		} else if (ball.y < paddle.y+ (paddle.height/1.8)) {
			ball.yvel-=2;
		}
		ball.xvel*=-1;
		if (paddle.height > 1.5*yscale) {
			paddle.height -= yscale;
		} else {
			paddle.height = yscale/2;
		}
	} else if (ball.x >= enemy.x-ball.size && ball.y >= enemy.y && ball.y <= enemy.y+enemy.height) {
		if (ball.y > enemy.y+ (enemy.height/2.2)) {
			ball.yvel+=2;
		} else if (ball.y < enemy.y+ (enemy.height/1.8)) {
			ball.yvel-=2;
		}
		ball.xvel*=-1;
		if (enemy.height > 1.5*yscale) {
			enemy.height -= yscale;
		} else {
			enemy.height = yscale/2;
		}
	}
	//check vert wall Hits
	if (ball.x < -10 ) {
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
	if (ball.y > enemy.y+(enemy.height *0.6) && enemy.y < canvas.height-enemy.height) {
		if (ball.y > enemy.y+(enemy.height *0.7)) {
			enemy.y += yscale/7;
		} else {
			enemy.y += yscale/20;
		}

	} else if (ball.y < enemy.y +(enemy.height *0.4) && enemy.y > 0) {
		if (ball.y < enemy.y+(enemy.height *0.3)) {
			enemy.y -= yscale/7;
		} else {
			enemy.y -= yscale/20;
		}
	}

	//Move paddle
	if (keystate[38] && paddle.y > 0) {
		paddle.y -= yscale/8;
	} else if (keystate[40] && paddle.y < canvas.height-paddle.height) {
		paddle.y += yscale/8;
	}
}

function draw() {
	ctx.fillStyle = "#fff";
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
