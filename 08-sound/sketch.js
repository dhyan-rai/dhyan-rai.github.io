// Images and Sounds Demo

let  mario;
let marioScale = 0.8;
let gameOver;
let backgroundSound;


function preload() {
  mario = loadImage("mario.png");
  gameOver = loadSound("gameover.mp3");
  backgroundSound = loadSound("background-sound.mp3");
  backgroundSound.setVolume(0.5);
  gameOver.setVolume(1);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);

  image(mario, mouseX, mouseY, mario.width * marioScale, mario.height * marioScale);
}

// function mouseWheel(event){
//   marioScale *= event.delta * 0.001;
// }

function mouseClicked() {
  gameOver.play();

  if(!backgroundSound.isPlaying()) {
    backgroundSound.loop();
  }

}