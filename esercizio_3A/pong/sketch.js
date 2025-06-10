// Posizione e velocità palla
let posX, posY;
let velX, velY;

// Paddle
let playerY, aiY;
let paddleWidth = 15;
let paddleHeight = 80;

// Punteggio
let playerScore = 0;
let aiScore = 0;

// Setup iniziale
function setup() {
  createCanvas(700, 500);
  resetBall();
  playerY = height / 2 - paddleHeight / 2;
  aiY = height / 2 - paddleHeight / 2;
  textFont('Courier New');
}

// Reset della palla
function resetBall() {
  posX = width / 2;
  posY = height / 2;
  velX = random([-5, 5]);
  velY = random(-3, 3);
}

function draw() {
  background(20, 30, 50);

  drawField();
  drawScores();

  // Paddles
  drawPaddle(20, playerY, color(0, 255, 200));
  drawPaddle(width - 35, aiY, color(255, 80, 100));

  // Movimento AI
  aiY += (posY - aiY - paddleHeight / 2) * 0.05;

  // Controllo paddle giocatore
  playerY = constrain(mouseY - paddleHeight / 2, 0, height - paddleHeight);

  // Movimento palla
  posX += velX;
  posY += velY;

  // Collisione su/giù
  if (posY < 0 || posY > height) {
    velY *= -1;
  }

  // Collisione paddle giocatore
  if (
    posX < 35 &&
    posY > playerY &&
    posY < playerY + paddleHeight
  ) {
    velX *= -1;
    velX *= 1.05;
  }

  // Collisione paddle AI
  if (
    posX > width - 50 &&
    posY > aiY &&
    posY < aiY + paddleHeight
  ) {
    velX *= -1;
    velX *= 1.05;
  }

  // Punto per AI
  if (posX < 0) {
    aiScore++;
    resetBall();
  }

  // Punto per player
  if (posX > width) {
    playerScore++;
    resetBall();
  }

  // Palla
  drawMagicBall(posX, posY);
}

function drawField() {
  // Campo centrale e righe
  stroke(255, 50);
  strokeWeight(2);
  for (let y = 0; y < height; y += 20) {
    line(width / 2, y, width / 2, y + 10);
  }

  noFill();
  stroke(255, 100);
  strokeWeight(4);
  rect(0, 0, width, height);
}

function drawScores() {
  textSize(32);
  fill(255);
  noStroke();
  textAlign(CENTER, TOP);
  text(playerScore, width / 4, 20);
  text(aiScore, (3 * width) / 4, 20);
}

function drawPaddle(x, y, c) {
  fill(c);
  noStroke();
  rect(x, y, paddleWidth, paddleHeight, 10);
}

function drawMagicBall(x, y) {
  // Scia con colori dinamici
  let d = map(sin(frameCount * 0.1), -1, 1, 15, 25);
  let r = map(sin(frameCount * 0.12), -1, 1, 100, 255);
  let g = map(sin(frameCount * 0.15), -1, 1, 100, 255);
  let b = map(sin(frameCount * 0.18), -1, 1, 100, 255);

  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = color(r, g, b);
  fill(r, g, b);
  noStroke();
  ellipse(x, y, d, d);
}