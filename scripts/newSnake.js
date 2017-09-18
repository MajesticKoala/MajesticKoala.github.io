var canvas, ctx, grid;
canvas = document.getElementById('snakeCanvas');
grid = 15;

var snake = {
  x: 0,
  y: 0,
  xdir: 1,
  ydir: 0,
  segments: []

}

var food = {
  size: grid,
  x: 0,
  y: 0

}


function main() {

  console.log('main running');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext('2d');


  window.addEventListener('resize', function(){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
  });

  document.addEventListener('keydown', function(e) {
    e.preventDefault();

    switch (e.keyCode) {
      case 37:
        if (snake.xdir != 1) {
          snake.xdir = -1;
          snake.ydir = 0;
        }
        break;
      case 38:
        if (snake.ydir != 1) {
          snake.ydir = -1;
          snake.xdir = 0;
        }

        break;
      case 39:
        if (trusnake.xdir != -1) {
          snake.xdir = 1;
          snake.ydir = 0;
        }

        break;
      case 40:
      if (snake.ydir != -1) {
        snake.ydir = 1;
        snake.xdir = 0;
      }
        break;
      default:
        console.log('knowing me Ill leave this in');
    }
  });

  init();
  loop();
}

function init() {

  snake.x = Math.floor(canvas.width/grid)*5;
  snake.y = Math.floor(canvas.height/grid)*5;

  console.log(Math.floor(Math.random()*(canvas.width/grid)*grid));
  food.x = Math.floor(Math.random()*(canvas.width/grid)*grid);
  food.y = Math.floor(Math.random()*(canvas.height/grid)*grid);
}

function loop() {
  update();
  draw();
  window.requestAnimationFrame(loop, canvas);
}

function update() {
  snake.x += snake.xdir*grid;
  snake.y += snake.ydir*grid;
}

function draw() {
  //draw background
  ctx.fillStyle = "#333";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

  //draw food
  ctx.fillStyle = "#111";
	ctx.fillRect(food.x, food.y, food.size, food.size);

  //draw snake
  ctx.fillStyle = "#fff";
	ctx.fillRect(snake.x, snake.y, grid, grid);
}

main();
