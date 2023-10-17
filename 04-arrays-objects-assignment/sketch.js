// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x = 0;
let y = 0;
let ground;
let player;
let playerScale = 0.8;
let hitBoxPosY = 324;
let rectHitboxWidth = 80;
let rectHitboxHeight = 80;
let playerPos;
let gravity;

function preload() {
  ground = loadImage("ground.png");
  player = loadImage("player.png");
}


function setup() {
  createCanvas(ground.width, ground.height);
  playerPos = createVector(mouseX, 387);
  gravity = createVector(0, 1);
}

function draw() {
  x = mouseX;
  y = mouseY;
  
  //Setting the background
  imageMode(CORNER);
  background(ground);

  //creating player hitbox
  //ellipse(x + 3, hitBoxPosY, 100, 60);

  //Creating the player image
  imageMode(CENTER);
  // playerPos.add(gravity);
  // if(playerPos.y > 387){
  //   playerPos.y = 387;
  // }
  image(player, playerPos.x, playerPos.y, player.width * playerScale, player.height * playerScale);



  //rect(x + 3 - rectHitboxWidth, hitBoxPosY + rectHitboxHeight/4, rectHitboxWidth, rectHitboxHeight);
}


