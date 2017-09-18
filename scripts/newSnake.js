$(document).ready(function() {
   var empty = [];
   var canvas, ctx, grid;
   grid = 15;
   var started = false;

   var fps = 15;
   var now;
   var then = Date.now();
   var interval = 1000/fps;
   var delta;

   var snake = {
      x: 0,
      y: 0,
      xdir: 0,
      ydir: 0,
      remainingSegs: Math.floor(Math.random()*10) + 10,
      segNumber: 1,
      segments: [],
      updatePos: function() {
         if(this.segNumber === this.segments.length){
   			this.segments.shift();
   			}
   			this.segments[this.segNumber-1] = {x: this.x, y: this.y};

            this.x += this.xdir*grid;
            this.y += this.ydir*grid;
      },
      checkWallHit: function() {
         if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            return true;
         }
      },
      checkTailHit: function() {
         for (var i = 0; i < this.segments.length; i++) {
   			if(this.x === this.segments[i].x && this.y === this.segments[i].y){
   				return true;
   			}
   		}
      },
      eatFood: function(posx, posy) {
         if (this.x === posx && this.y === posy) {
   			this.segNumber++;
   			return true;
   		}
      }
   }

   var food = {
      size: grid,
      x: 0,
      y: 0,
      changeLocation: function() {
         food.x = (Math.floor(Math.random()*(canvas.width/grid)))*grid;
         food.y = (Math.floor(Math.random()*(canvas.height/grid)))*grid;
      }

   }


   function main() {

      canvas = document.getElementById('snakeCanvas');
      ctx = canvas.getContext('2d');
      canvas.width = $(window).width();;
      canvas.height = $(window).height();;

      window.addEventListener('resize', function(){
         canvas.width =$(window).width();
         canvas.height = $(window).height();
         init();
      });

      document.addEventListener('keydown', function(e) {
         e.preventDefault();
         if (!started) {
            started = true;
         }
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
            if (snake.xdir != -1) {
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
         }
      });

      init();
      loop();
   }

   function init() {

      started = false;
      snake.x = grid*Math.floor((canvas.width/grid)/2);
      snake.y = grid*Math.floor((canvas.height/grid)/2);
      snake.xdir = 0;
      snake.ydir = 0;
      snake.segmentNumber = 1;
      var numberof = snake.segments.length;
      console.log(numberof);
      console.log('before');
      console.dir(snake.segments);
      snake.segments.splice(1, 10);
      console.log('after');
      console.dir(snake.segments);
      snake.remainingSegs = Math.floor(Math.random()*10) + 10;

      //console.log(snake.segments);
      //console.log(snake.segments.length);

      food.x = (Math.floor(Math.random()*(canvas.width/grid)))*grid;
      food.y = (Math.floor(Math.random()*(canvas.height/grid)))*grid;
   }


   function loop() {
       window.requestAnimationFrame(loop);
       now = Date.now();
       delta = now - then;
       if (delta > interval) {
           then = now - (delta % interval);
           update();
       }
   }

   function update() {
      ctx.fillStyle = "#333";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      snake.updatePos();
      if (snake.checkWallHit()) {
         init();
      }

      ctx.fillStyle = "#fff";

		for (var i = 0; i < snake.segments.length; i++) {
			ctx.fillRect(snake.segments[i].x, snake.segments[i].y, grid, grid);
		}

      if (started) {
         if (snake.eatFood(food.x, food.y)) {
   			let randomSeg = Math.floor(Math.random()*10);
   			food.changeLocation();
   			snake.remainingSegs+= randomSeg + 6;
            /*
   			if (randomSeg >= 7) {
   				remainingSegs += 10;
   				foodColor = color(200, 0, 100);
   			} else {
   				foodColor = 70;
   			}
            */
   		} else if (snake.remainingSegs > 0) {
   			snake.eatFood(snake.x, snake.y);
   			snake.remainingSegs--;
   		}
         ctx.fillStyle = "#111";
         ctx.fillRect(food.x, food.y, food.size, food.size);

      }
   }
   main();
});
