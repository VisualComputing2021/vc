const ROWS = 30;
const COLS = 30;
const LENGTH = 20;
var quadrille
var c;
let x = 200
let y = 200
let drawLine = false
let start, end
function setup() {
  createCanvas(COLS * LENGTH, ROWS * LENGTH);
  c = color('#007ACC');
  
  quadrille = createQuadrille(floor(ROWS), floor(COLS));
  
  for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < COLS; column++) {
      if((row == 0 || row == ROWS - 1) || (column == 0 || column == COLS - 1))
        quadrille.fill(floor(row), floor(column),c)
    }
    
  }
}

function draw() {
  background('#060621');

  end = createVector(mouseX, mouseY)
  drawQuadrille(quadrille, 0, 0, LENGTH, 1, 'black', true);

  fill(0,255,0)
  stroke(0,255,0)
  circle(mouseX, mouseY, 10)

  fill(255, 0, 0)
  stroke(255, 0, 0)
  updatePosition()
  circle(x, y, 10)
  
  stroke(255, 255, 0)
  start = createVector(x, y)
  let direction = end.sub(start).normalize()

  let scalingVector = createVector(
    sqrt(1 + pow(direction.y/direction.x, 2)),
    sqrt(1 + pow(direction.x/direction.y, 2)) 
    )



let currentPositionVector = createVector(start.x, start.y);
let rayLengths = createVector(0, 0);
let stepVector = createVector();

// Establish Starting Conditions
if (direction.x < 0)
{
  //console.log(direction.x, direction.y)
  stepVector.set(-1, stepVector.y)
  rayLengths.set((start.x - currentPositionVector.x) * scalingVector.x, rayLengths.y);
}
else
{
  stepVector.set(1, stepVector.y);
  rayLengths.set((currentPositionVector.x + 1 - start.x) * scalingVector.x, rayLengths.y);
}

if (direction.y < 0)
{
  //console.log(direction.x, direction.y)
  stepVector.set(stepVector.x, -1);
  rayLengths.set(rayLengths.x, (start.y - currentPositionVector.y) * scalingVector.y);
}
else
{
  stepVector.set(stepVector.x, 1);
  rayLengths.set(rayLengths.x, (currentPositionVector.y + 1 - start.y) * scalingVector.y);
}
//console.log(scalingVector.toString())
let bTileFound = false;
let fMaxDistance = 600.0;
let fDistance = 0.0;

  while (!bTileFound && fDistance < fMaxDistance)
  {
    // Walk along shortest path
    if (rayLengths.x < rayLengths.y)
    {
      currentPositionVector.x += stepVector.x;
      fDistance = rayLengths.x;
      rayLengths.x += scalingVector.x;
    }
    else
    {
      currentPositionVector.y += stepVector.y;
      fDistance = rayLengths.y;
      rayLengths.y += scalingVector.y;
    }

    if (currentPositionVector.x >= 0 && currentPositionVector.x < width && currentPositionVector.y >= 0 && currentPositionVector.y < height)
    {
      
      if(quadrille.read(floor(currentPositionVector.y/LENGTH), floor(currentPositionVector.x/LENGTH)) == c)
      {
        bTileFound = true;
        stroke(255, 255, 255)
        noFill()
        circle(currentPositionVector.x, currentPositionVector.y, 10)
        stroke(255, 255, 0)
        line(start.x, start.y, currentPositionVector.x, currentPositionVector.y)
      }
    }
  }
  

}

function updatePosition(){
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    x-=5;
  }else if(keyIsDown(RIGHT_ARROW) || keyIsDown(68) ) {
    x+=5;
  }else if(keyIsDown(UP_ARROW)|| keyIsDown(87)){
    y-=5;
  }else if(keyIsDown(DOWN_ARROW)|| keyIsDown(83)){
    y+=5;
  }

  return {"x": x, "y": y}
}


function mouseDragged(){

  let thisRow = map(mouseY, 0, height, 0, ROWS, true)
  let thisColumn = map(mouseX, 0, width, 0, COLS, true)
  quadrille.fill(floor(thisRow), floor(thisColumn),c)
}

