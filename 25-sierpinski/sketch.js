//Sierpinski Triangle - Recursion Demo

let initialTriangle = [
  {x: 400, y: 50},
  {x: 50, y: 550},
  {x: 750, y: 550}
];

let depth = 0;

function setup() {
  createCanvas(800, 600);

}

function draw() {
  background(220);
  sierpinski(initialTriangle, depth);
}

function sierpinski(points, depth) {
  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);

  if(depth > 0) {
    //upper triangle
    // for(let i = 0; i < points.length; points++) {
      
    //   sierpinski([points[i], getMidPoint(points[i], points[points.length - 1 - i]), getMidPoint(points[i], points[points.length - 2 - i])], depth - 1);
    // }

    sierpinski([points[0], getMidPoint(points[0], points[1]), getMidPoint(points[0], points[2])], depth - 1);
    sierpinski([points[1], getMidPoint(points[1], points[0]), getMidPoint(points[1], points[2])], depth - 1);
    sierpinski([points[2], getMidPoint(points[2], points[0]), getMidPoint(points[2], points[1])], depth - 1);

  }



}

function mousePressed() {
  depth++;
}

function getMidPoint(point1, point2) {
  let newX = (point1.x + point2.x) / 2;
  let newY = (point1.y + point2.y) / 2;

  return {x: newX, y: newY};
}