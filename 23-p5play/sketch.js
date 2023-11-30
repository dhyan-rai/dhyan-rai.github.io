// P5 Play


let sA, sB, j;
function setup() {
  new Canvas(500, 500);
  world.gravity.y = 10;  
  sA = new Sprite(250, 0, 10, 50, 'k');
  sB = new Sprite(100, 20, 20);  
  j = new DistanceJoint(sA, sB);
  j.offsetA.y = 25;  
  j.springiness = 1.0; // try changing this!
}

function draw() {
  clear();
  sA.moveTowards(mouse);
}