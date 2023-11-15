// Ball OOP


let theBall;
let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  theBall = new Ball(width/2, height/2);
  ballArray.push(theBall);
}

function draw() {
  background(220);

  for(let someBall of ballArray) {
    someBall.move();
    for (let otherBall of ballArray) {
      //avoid checking if hitting self
      if (someBall !== otherBall) {
        someBall.bounceOff(otherBall);
      }
    }
    someBall.display();
  }

}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = random(15, 30);
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    if(this.x + this.radius >= width || this.x - this.radius <= 0) {
      this.dx *= -1;
    }
    if(this.y + this.radius >= height || this.y - this.radius <= 0) {
      this.dy *= -1;
    }
  }

  display() {
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.radius * 2);
  }

  bounceOff(otherBall) {
    let radiiSum = this.radius + otherBall.radius;
    let distanceApart = dist(this.x, this.y, otherBall.x, otherBall.y);
    if (radiiSum > distanceApart) {
      //hitting each other...
      let tempX = this.dx;
      let tempY = this.dy;

      this.dx = otherBall.dx;
      this.dy = otherBall.dy;
      
      otherBall.dx = tempX;
      otherBall.dy = tempY;
    }
  }


}

function mousePressed() {
  ballArray.push(new Ball(mouseX, mouseY));
}
