let posX
let velX
let posY
let velY

function setup() {
  createCanvas(500, 400)
  posX = 200
  velX = 7
  posY = 300
  velY = 5
}

function draw() {
  // Sfondo semitrasparente per creare la scia
  background(190, 50)

  // Movimento
  posX = posX + velX
  posY = posY + velY

  if (posX >= width || posX < 0) {
    velX = -velX
  }

  if (posY >= height || posY < 0) {
    velY = -velY
  }

  // Animazione colore e dimensione
  let d = map(sin(frameCount * 0.1), -1, 1, 20, 100)
  let r = map(sin(frameCount * 0.13), -1, 1, 0, 225)
  let g = map(sin(frameCount * 0.14), -1, 1, 0, 225)
  let b = map(sin(frameCount * 0.16), -1, 1, 0, 225)

  // Bagliore
  drawingContext.shadowBlur = 20
  drawingContext.shadowColor = color(r, g, b)

  stroke(r, g, b)
  fill(r, g, b)

  // Rotazione della forma
  push()
  translate(posX, posY)
  rotate(frameCount * 0.05)
  drawStar(0, 0, d * 0.3, d, 5)
  pop()
}

// Funzione per disegnare una stella
function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints
  let halfAngle = angle / 2.0
  beginShape()
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2
    let sy = y + sin(a) * radius2
    vertex(sx, sy)
    sx = x + cos(a + halfAngle) * radius1
    sy = y + sin(a + halfAngle) * radius1
    vertex(sx, sy)
  }
  endShape(CLOSE)
}