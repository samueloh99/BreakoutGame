var canvas = document.querySelector("canvas");


var ctx = canvas.getContext("2d");


// Medidas
var radius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var barraRowAc = 5;
var barraColumnAc = 3;
var barraWidth = 75;
var barraHeight = 20;
var barraPadding = 10;
var barraOffsetTop = 30;
var barraOffsetLeft = 30;
var pontos = 0;
var vida = 3;


var barra = [];
for(var c=0; c<barraColumnAc; c++) {
  barra[c] = [];
  for(var r=0; r<barraRowAc; r++) {
    barra[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function collisionDetection() {
  for(var c=0; c<barraColumnAc; c++) {
    for(var r=0; r<barraRowAc; r++) {
      var b = barra[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+barraWidth && y > b.y && y < b.y+barraHeight) {
          dy = -dy;
          b.status = 0;
          pontos++;
          if(pontos == barraRowAc*barraColumnAc) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
          }
        }
      }
    }
  }
}



function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*2);
  ctx.fillStyle = "purple";
  ctx.fill();
  ctx.closePath();
}

function drawPrancha() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}
function drawBarra() {
  for(var c=0; c<barraColumnAc; c++) {
    for(var r=0; r<barraRowAc; r++) {
      if(barra[c][r].status == 1) {
        var brickX = (r*(barraWidth+barraPadding))+barraOffsetLeft;
        var brickY = (c*(barraHeight+barraPadding))+barraOffsetTop;
        barra[c][r].x = brickX;
        barra[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, barraWidth, barraHeight);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function drawPontos() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Pontuação: "+pontos, 8, 20);
}
function drawVida() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Vida: "+vida, canvas.width-65, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBarra();
  drawBall();
  drawPrancha();
  drawPontos();
  drawVida();
  collisionDetection();

  if(x + dx > canvas.width-radius || x + dx < radius) {
    dx = -dx;
  }
  if(y + dy < radius) {
    dy = -dy;
  }
  else if(y + dy > canvas.height-radius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      vida--;
      if(!vida) {
        alert("YOU LOST !!!");
        document.location.reload();
      }
      else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width-paddleWidth)/2;
      }
    }
  }

  

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2;
  }
}

draw();