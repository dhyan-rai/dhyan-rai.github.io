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
let cookiesCaught = 0;
let cookieBroken = false;
let groundLevel = 385;
let health = 5;
let startGame = true;
let gameOver = false;
let bullets1 = [];
let bullets2 = [];
let bulletImg;
let brokenCookieImg;
let youLoseImg;

//cookie variables
let cookieX;
let cookieY; 
let cookieAngle;
let startTime;
let cookieBreaking = false;

//sounds
let cookieDropSound;
let backgroundMusic;
let jumpSound;

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
  //loading images
  ground = loadImage("ground.png");
  player = loadImage("player.png");
  cookieImg = loadImage("cookie.png");
  brokenCookieImg = loadImage("broken-cookie.png");
  bulletImg = loadImage("bullet.png");
  youLoseImg = loadImage("you-lose-face.png");

  //loading sounds
  cookieDropSound = loadSound("cookie-drop-sound.mp3");
  backgroundMusic = loadSound("background-music.mp3");
  jumpSound = loadSound("jump.wav");
  backgroundMusic.setVolume(0.2);
  cookieDropSound.setVolume(1);
  jumpSound.setVolume(0.5);
}


function setup() {
  createCanvas(ground.width, ground.height);
  gravity = createVector(0, 2);
  jumpForce = createVector(0, -13);
  playerPos = createVector(width/2, groundLevel);
  angleMode(DEGREES);
}

function draw() {

  if (startGame) {
    //Setting the background
    imageMode(CORNER);
    background(ground);

    //playing background sound
    playBgSound();
  
    //Creating the player image
    imageMode(CENTER);
  
    //check break
    breakCookie();
    checkCookieBreak();
  
    //check cookie collected
    if(cookieCollected) {
      cookies.shift();
      cookiesCaught += 1;
      cookieCollected = !cookieCollected;
    }
  
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

    //check when player dies
    if(health === 0) {
      startGame = false;
      gameOver = true;
    }
  
    // console.log(cookiesCaught);
    // console.log(health);

    //shoot bullets
    shootBullets1();
    shootBullets2();
    for(let i = 0; i < bullets1.length; i++){
      bullets1[i].shoot();
      bullets1[i].collisionCheck();
    }
    for(let i = 0; i < bullets2.length; i++){
      bullets2[i].shoot();
      bullets2[i].collisionCheck();
    }


  } 
  else if (gameOver) {
    background("black");
    imageMode(CENTER);
    image(youLoseImg, width/2, height/2);
  }

}

function applyGravity() {
  playerPos.add(gravity);
  gravity.y += 0.5;
  if(playerPos.y > groundLevel){
    playerPos.y = groundLevel;
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

function mousePressed() {
  if(canJump && startGame) {
    isJumping = true;
    jumpSound.play();
  }
}

function applyHitboxes() {
  push();
  noStroke();
  noFill();

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
    if (this.y + 3 >= 460) {
      cookieX = this.x;
      cookieY = this.y + 3;
      cookieAngle = this.angle;
      cookieBroken = true;
      startTime = millis();
      cookieBreaking = true;
      
    }
  }

}

//function to drop cookies periodically
let playSound = false;
let lastDropTime = 0;
let waitTime = 2000;
function dropCookies() {
  if (millis() > lastDropTime + waitTime){
    cookies.push(new Cookie());
    if (cookiesCaught >= 5 && cookiesCaught <= 15) {
      waitTime *= 0.99;
      loadTime1 *= 0.99;
      loadTime2 *= 0.99;
      if (waitTime <= 1000) {
        waitTime = 1000;
      }
    } 
    else if (cookiesCaught >= 15 && cookiesCaught <= 30) {
      waitTime *= 0.85;
      loadTime1 *= 0.95;
      loadTime2 *= 0.95;
      if (waitTime <= 800) {
        waitTime = 800;
      }
    } 
    else if (cookiesCaught >= 30) {
      waitTime *= 0.78;
      loadTime1 *= 0.9;
      loadTime2 *= 0.9;
      if (waitTime <= 600) {
        waitTime = 600;
      }
    }
    lastDropTime = millis();
  }
}

function checkCookieBreak() {
  if(cookieBreaking) {
    if ((millis() - startTime) <= 2500) {
      push();
      translate(cookieX, cookieY);
      rotate(cookieAngle);
      image(brokenCookieImg, 0, 0, cookieImg.width * cookieScale, cookieImg.height * cookieScale);
      pop();
    } else {
      cookieBreaking = false;
    }
  }
}

function breakCookie() {
  if (cookieBroken) {
    cookies.shift();
    health--;
    cookieBroken = !cookieBroken;
  }
}

class Bullet {
  constructor(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
  }

  shoot() {
    push();
    fill("black");
    image(bulletImg, this.x, this.y, bulletImg.width * 0.225, bulletImg.height * 0.225);
    //circle(this.x, this.y, 40);
    this.x += this.velocity;
  }

  collisionCheck() {
    if(collideRectCircle(playerHitbox.x, playerHitbox.y, playerHitbox.w, playerHitbox.h, this.x, this.y, 40)){
      gameOver = true;
      startGame = false;
    }
  }

}


let lastShotTime1 = 0;
let loadTime1 = 7000;
function shootBullets1() {
  if (millis() > lastShotTime1 + loadTime1){
    bullets1.push(new Bullet(1167, 440, -8));
    lastShotTime1 = millis();
    if (loadTime1 <= 3000) {
      loadTime1 = 5000;
    }
  }
}

let lastShotTime2 = 0;
let loadTime2 = 15000;
function shootBullets2() {
  if (millis() > lastShotTime2 + loadTime2){
    bullets2.push(new Bullet(104, 440, 10));
    lastShotTime2 = millis();
    if (loadTime2 <= 5500) {
      loadTime2 = 5500;
    }
  }
}

function playBgSound() {
  if(!backgroundMusic.isPlaying()) {
    backgroundMusic.loop();
  }
}