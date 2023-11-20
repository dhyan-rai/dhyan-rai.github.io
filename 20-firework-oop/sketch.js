// Fireworks OOP Demo

let auto = false;

let theFireworks = [];

class Particle {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = 5;
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.alpha = 255;
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.alpha);
    circle(this.x, this.y, this.radius * 2);
  }

  update() {
    //move
    this.x += this.dx;
    this.y += this.dy;
    this.alpha -= 2;


  }

  isDead() {
    return this.alpha <= 0;
  }

  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for (let i = theFireworks.length - 1; i >= 0; i--) {
    let particle = theFireworks[i];
    particle.update();
    if (particle.isDead()) {
      //remove from array
      theFireworks.splice(i, 1);
    }
    else {
      particle.display();
    }
  }
  
  if (auto) {
    for (let i = 0; i < 100; i++) {
      let dx = random(-5, 5);
      let dy = random(-5, 5);
      let someParticle = new Particle(mouseX, mouseY, dx, dy);
      theFireworks.push(someParticle);
    }
  }
}

function mousePressed() {
  for (let i = 0; i < 360; i += 6) {
    let rand = 1;
    let dx = cos(i) * rand;
    let dy = sin(i) * rand;
    let someParticle = new Particle(mouseX, mouseY, dx, dy);
    theFireworks.push(someParticle);
  }
}

function keyTyped() {
  if (key === "a") {
    auto = !auto;
  }
}
