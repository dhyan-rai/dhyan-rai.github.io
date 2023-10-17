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

function preload() {
  ground = loadImage("ground.png");
  player = loadImage("player.png");
}


function setup() {
  createCanvas(ground.width, ground.height);
}

function draw() {
  x = mouseX;
  y = mouseY;
  
  //Setting the background
  imageMode(CORNER);
  background(ground);

  //Creating the player image
  imageMode(CENTER);
  image(player, mouseX, 387, player.width * playerScale, player.height * playerScale);

  //creating player hitbox
  ellipse(x + 3, hitBoxPosY, 100, 60);
  //rect(x + 3 - rectHitboxWidth, hitBoxPosY + rectHitboxHeight/4, rectHitboxWidth, rectHitboxHeight);
}


