const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const jumpStrength = -8;
const groundH = 50;
const pipeW = 60;
let pipeX = canvas.width - pipeW - 10;
let gapY = 200;
const gapH = 140;
let pipeSpeed = 2;
let gameOver = false;
let score = 0;
let passed=false;
console.log('Canvas hazır',canvas.clientWidth,canvas.height);
ctx.fillStyle="gold";
ctx.beginPath();
let birdY = canvas.height / 2;
let birdVy = 0;
const gravity = 0.5;
const birdImg = new Image();
let started = false;
birdImg.src = "bird.png";
birdImg.onload = function() {
    ctx.drawImage(birdImg,80,canvas.height/2-12,36,36);
};
ctx.fill();
function rectsOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

function loop() {
    
if (!gameOver && started) {
  birdVy += gravity;
  birdY  += birdVy;

  if (birdY + 36 > canvas.height - groundH) {
    birdY = canvas.height - groundH - 36;
    birdVy = 0;
    gameOver = true;
  }

  pipeX -= pipeSpeed;
  if (pipeX + pipeW < 0) {
    pipeX = canvas.width + 20;
    gapY = 100 + Math.floor(Math.random() * 260);
    passed = false;
  }

  if (birdY < 0) { birdY = 0; birdVy = 0; }
if (!passed && pipeX + pipeW < 80) {
  score+=10 ;
  passed = true;
}
  
}
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
ctx.font = 'bold 24px sans-serif';
ctx.fillText('Skor: ' + score, 10, 30);

  if (!gameOver) {
  const birdX = 80;
  const birdW = 36, birdH = 36;

  const topPipe = { x: pipeX, y: 0,            w: pipeW, h: gapY };
  const botPipe = { x: pipeX, y: gapY + gapH,  w: pipeW, h: canvas.height - groundH - (gapY + gapH) };

  const hitTop = rectsOverlap(birdX, birdY, birdW, birdH, topPipe.x, topPipe.y, topPipe.w, topPipe.h);
  const hitBot = rectsOverlap(birdX, birdY, birdW, birdH, botPipe.x, botPipe.y, botPipe.w, botPipe.h);

  if (hitTop || hitBot) {
    gameOver = true;
  }
}

    ctx.fillStyle="black";
    ctx.fillRect(pipeX,0,pipeW,gapY);
    ctx.fillRect(pipeX, gapY + gapH, pipeW, canvas.height - groundH - (gapY + gapH));
    ctx.drawImage(birdImg, 80, birdY, 36, 36);
    ctx.fillStyle="green";
    ctx.fillRect(0,canvas.height-groundH,canvas.width,groundH);
    if (gameOver) {
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'white';
  ctx.font = 'bold 32px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);

  ctx.font = '16px sans-serif';
  ctx.fillText('R: restart', canvas.width / 2, canvas.height / 2 + 28);
  ctx.textAlign = 'start';
}
if (!started) {
  ctx.fillStyle = 'black';
  ctx.font = '20px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Space to get started', canvas.width/2, canvas.height/2);
  ctx.textAlign = 'start';
}

  
    requestAnimationFrame(loop);

}
loop();
window.addEventListener("keydown",(e)=>{
if (e.code === 'Space') {
  e.preventDefault();
  if (!started) {
    started = true;   
  } else if (!gameOver) {
    birdVy = jumpStrength; 
  }
}

if (e.code === 'KeyR') {
  birdY = canvas.height / 2;
  birdVy = 0;
  pipeX = canvas.width - pipeW - 10;
  gapY  = 200;
  gameOver = false;
  score = 0;
  passed = false;
}

})

