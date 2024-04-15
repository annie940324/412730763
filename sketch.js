let mis = ["#7cb518", "#ffc300"];
let tane = ["#463f3a"];
let bg = ["#f4f3ee"];

let rr = [270];
let shapes = []; // Array to store shape objects

class Shape {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.offsetX = random(-100, 100); // Random offset
    this.offsetY = random(-100, 100);
    this.rotationSpeed = random(-0.5, 0.5); // Random rotation speed
    this.size = width / 5 * 0.8;
    this.moveSpeed = random(1, 2); // Random movement speed
    this.directionX = random([-1, 1]); // Random initial horizontal direction
    this.directionY = random([-1, 1]); // Random initial vertical direction
  }

  move() {
    // Move the shape horizontally
    this.x += this.moveSpeed * this.directionX;

    // If the shape reaches the edge, change its horizontal direction
    if (this.x < 0 || this.x > width) {
      this.directionX *= -1;
    }

    // Move the shape vertically
    this.y += this.moveSpeed * this.directionY;

    // If the shape reaches the edge, change its vertical direction
    if (this.y < 0 || this.y > height) {
      this.directionY *= -1;
    }
  }

  display() {
    push();
    translate(this.x + this.size / 2 + this.offsetX, this.y + this.size / 2 + this.offsetY);
    rotate(this.rotationSpeed);
    let d = this.size;

    noStroke();
    fill("#90623c");
    arc(0, 0, d * 1.5, d * 1.3, 90, 270, PIE);

    noStroke();
    let mi = random(mis);
    fill(mi);
    arc(0, 0, d * 1.1, d * 1.3, 0, 90 + random(rr), PIE);

    noStroke();
    fill("#f4f3ee");
    arc(0, 0, d * 0.3, d * 0.5, 0, 90 + random(rr), PIE);

    noFill();
    stroke("#f4f3ee");
    strokeWeight(d / 5);
    strokeCap(SQUARE);
    drawingContext.setLineDash([2, 5]);
    arc(0, 0, d * 0.6, d * 0.8, 0, 90 + random(rr));

    noFill();
    stroke(tane);
    strokeWeight(d / 20);
    strokeCap(ROUND);
    drawingContext.setLineDash([1, 11]);
    arc(0, 0, d * 0.5, d * 0.7, 0, 90 + random(rr));

    pop();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background(bg);

  // Create shape objects and add them to the array
  for (let i = 0; i < 25; i++) {
    shapes.push(new Shape(random(width), random(height)));
  }
}

function draw() {
  background(bg); // Clear previous frame
  for (let shape of shapes) {
    shape.move(); // Move shapes
    shape.display(); // Display shapes
  }
}

function mouseMoved() {
  // Update shape positions based on mouse movement
  for (let shape of shapes) {
    let dx = mouseX - width / 2;
    let dy = mouseY - height / 2;
    shape.x += dx * 0.01;
    shape.y += dy * 0.01;
  }
}

function mouseClicked() {
  shapes.push(new Shape(mouseX, mouseY)); // Add new shape at mouse position
}
