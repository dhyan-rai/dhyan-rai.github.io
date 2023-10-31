// Grid Assignment
// Dhyan Rai
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = [];
let backgroundImg;
let backgroundScale = 0.7;

function preload() {
  backgroundImg = loadImage("background-image.jpg");
}

function setup() {
  createCanvas(720 * backgroundScale, 960 * backgroundScale);
}

function draw() {
  background(backgroundImg);
}
