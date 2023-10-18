// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//Images
let ground;
let player;

let playerScale = 0.8;
let rectHitboxWidth = 100;
let rectHitboxHeight = 115;
let gravity;
let playerPos;
let jumpForce;
let canJump = true;
let isJumping = false;
let easing = 0.065;
let cookieImg;
let cookieScale = 0.25;
let cookies = [];

let cookieCollected = false;

//Hitbox measures
//dimesnions for player hitbox
let w1 = 100;
let h1 = 115;

//dimesnions for bowl hitbox
let w2 = 83;
let h2 = 50;



//Hitboxes
let bowlHitbox = {};
let playerHitbox = {};





function preload() {
  ground = loadImage("ground.png");
  player = loadImage("player.png");
  cookieImg = loadImage("cookie.png");
}


function setup() {
  createCanvas(ground.width, ground.height);
  gravity = createVector(0, 2);
  jumpForce = createVector(0, -13);
  playerPos = createVector(width/2, 385);
  angleMode(DEGREES);
  //rectMode(CENTER);
}

function draw() {
  
  //Setting the background
  imageMode(CORNER);
  background(ground);

  //creating player hitbox


  //Creating the player image
  imageMode(CENTER);

  
  //player follows mouse with easing
  addEasing();
  
  //applying forces
  applyJumping();
  applyGravity();

  //displaying player
  displayPlayer();

  //applying hitboxes
  applyHitboxes();

  //dropping cookies periodically!!
  dropCookies();
  for(let i = 0; i < cookies.length; i++){
    cookies[i].spawn();
    cookies[i].drop();
    cookies[i].checkCollision();
  }

  //check cookie collected
  if(cookieCollected) {
    cookies.shift();
    cookieCollected = false;
  }


}

function applyGravity() {
  playerPos.add(gravity);
  gravity.y += 0.5;
  if(playerPos.y > 385){
    playerPos.y = 385;
    gravity.y = 2;
    canJump = true;
    isJumping = false;
  }
}

function applyJumping() {
  if (isJumping) {
    playerPos.add(jumpForce);
  }
  canJump = false;
}

function mouseClicked() {
  if(canJump) {
    isJumping = true;
  }
}

function applyHitboxes() {
  push();
  noStroke();
  noFill();
  //rect(playerPos.x - w1/2 + 4, playerPos.y - 30, w1, h1);
  playerHitbox = {
    x: playerPos.x - w1/2 + 4,
    y: playerPos.y - 30,
    w: w1,
    h: h1,
  };

  bowlHitbox = {
    x: playerPos.x - w2/2 + 4,
    y: playerPos.y - 85,
    w: w2,
    h: h2,
  };
  pop();
}

function displayPlayer() {
  image(player, playerPos.x, playerPos.y, player.width * playerScale, player.height * playerScale);
}

function addEasing() {
  let targetX = mouseX;
  let dx = targetX - playerPos.x;
  playerPos.x += dx * easing;
  playerPos.x = constrain(playerPos.x, 240, 1020);
}




class Cookie {
  constructor() {
    this.y = 0 - cookieImg.height/2;
    this.x = random(240, 1020);
    this.dx = random(-6, 6) / 10;
    this.gravity = createVector(0, 1.5);
    this.angle = random(360);
  }

  spawn() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    image(cookieImg, 0, 0, cookieImg.width * cookieScale, cookieImg.height * cookieScale);
    noStroke();
    noFill();
    circle(0, 0 + 3, cookieImg.width * 0.12);
    this.angle += 2.4;
    this.x += this.dx;
    this.x = constrain(this.x, 240, 1020);
    pop();
  }

  drop() {
    this.y += this.gravity.y;
    this.gravity.y += 0.04;
  }

  checkCollision(){
    if (collideRectCircle(bowlHitbox.x, bowlHitbox.y, bowlHitbox.w, bowlHitbox.h, this.x, this.y + 3, cookieImg.width * 0.12)) {
      cookieCollected = true;
    }
  }

}

//function to drop cookies periodically
let lastDropTime = 0;
let waitTime = 2000;
function dropCookies() {
  if (millis() > lastDropTime + waitTime){
    cookies.push(new Cookie());
    lastDropTime = millis();
  }
}