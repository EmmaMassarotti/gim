function setup() {
	createCanvas(windowWidth, windowHeight);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);
	translate(width / 2, height / 2);

	// Cerchio bianco più grande e alone luminoso
	drawingContext.shadowBlur = 40;
	drawingContext.shadowColor = color(255);
	stroke(255);
	strokeWeight(8);
	noFill();
	ellipse(0, 0, 440);  // Cerchio più grande per essere più lontano dai cuori
	drawingContext.shadowBlur = 0; // Disattiva bagliore

	noStroke();

	// Tacche: cuori pulsanti più grandi per le ore, linee per i minuti
	for (let i = 0; i < 60; i++) {
		push();
		rotate(i / 60 * TWO_PI);
		if (i % 5 == 0) {
			// Pulsazione più marcata e cuori più grandi
			let scaleFactor = map(sin(frameCount * 0.08 + i), -1, 1, 12, 18);
			drawHeart(0, -200, scaleFactor);
		} else {
			fill(150);
			rect(-0.5, -190, 1, 5);
		}
		pop();
	}

	// Lancetta ore (bianca)
	push();
	const angoloOre = (hour() % 12 + minute() / 60) * TWO_PI / 12;
	rotate(angoloOre);
	fill(255);
	rect(-2, 20, 4, -100, 2);
	pop();

	// Lancetta minuti (bianca)
	push();
	const angoloMinuti = (minute() + second() / 60) * TWO_PI / 60;
	rotate(angoloMinuti);
	fill(255);
	rect(-1.5, 20, 3, -150, 2);
	pop();

	// Lancetta secondi (rossa sottile) con alone luminoso
	push();
	const angoloSecondi = second() * TWO_PI / 60;
	rotate(angoloSecondi);
	drawingContext.shadowBlur = 20;
	drawingContext.shadowColor = color(255, 0, 0);
	fill(255, 0, 0);
	rect(-1, 20, 2, -170);
	drawingContext.shadowBlur = 0;
	pop();

	// Perno centrale bianco
	fill(255);
	noStroke();
	ellipse(0, 0, 10);
}

// Funzione cuore rosso
function drawHeart(x, y, size) {
	push();
	translate(x, y);
	scale(size / 100);
	fill(255, 0, 0);
	beginShape();
	vertex(0, -30);
	bezierVertex(-50, -80, -80, -20, 0, 30);
	bezierVertex(80, -20, 50, -80, 0, -30);
	endShape(CLOSE);
	pop();
}