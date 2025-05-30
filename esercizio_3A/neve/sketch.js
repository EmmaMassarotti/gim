let fiocchi = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  noStroke();
  for (let i = 0; i < 900; i++) {
    let z = random(0.1, 1); // Profondità (0.1 = lontano, 1 = vicino)
    fiocchi.push({
      px: random(0, width),
      py: random(-height, 0),
      z: z,
      dim: map(z, 0.1, 1, 4, 16),
      vel: map(z, 0.1, 1, 0.5, 3),
      angleOffset: random(TWO_PI)
    });
  }
}

function draw() {
  background(0);
  fill(255);

  for (let i = 0; i < fiocchi.length; i++) {
    let f = fiocchi[i];

    // Movimento oscillante più ampio per fiocchi vicini
    f.px += sin(frameCount * 0.01 + f.angleOffset) * map(f.z, 0.1, 1, 0.1, 1);
    f.py += f.vel;

    if (f.py > height) {
      f.py = random(-50, -10);
      f.px = random(0, width);
    }

    textSize(f.dim);
    // Puoi anche usare alpha per simulare nebbia: fill(255, 255 * f.z);
    text("*", f.px, f.py);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}