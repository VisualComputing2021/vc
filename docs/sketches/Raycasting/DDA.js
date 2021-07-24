const ROWS = 40;
const COLS = 40;
const LENGTH = 20;
var quadrille
var c;
let x = 200
let y = 200
let drawLine = false
let start, end
let prevStart, prevEnd
function setup() {
  createCanvas(COLS * LENGTH, ROWS * LENGTH);
  c = color('#007ACC');
  
  quadrille = createQuadrille(floor(ROWS), floor(COLS));
  prevStart = createVector(0,0)
  prevEnd = createVector(0,0)
  
}

function draw() {
  background('#060621');
  
  drawQuadrille(quadrille, 0, 0, LENGTH, 1, 'black', true);
  end = createVector(mouseX, mouseY)
  let stopCell = getCellIndex(mouseX, mouseY)

  fill(0,255,0)
  stroke(0,255,0)
  circle(mouseX, mouseY, 10)

  fill(255, 0, 0)
  stroke(255, 0, 0)
  updatePosition()
  circle(x, y, 10)
  
  stroke(255, 255, 0)
  start = createVector(x, y)

  if(start.x != prevStart.x || start.y != prevStart.y || end.x != prevEnd.x || end.y != prevEnd.y){
    quadrille.clear()
  }
  
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
let stopRay = false;
let fMaxDistance = 10000.0;
let fDistance = 0.0;

  while (!stopRay && fDistance < fMaxDistance)
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

    let {thisRow, thisColumn} = getCellIndex(currentPositionVector.x, currentPositionVector.y)
    quadrille.fill(thisRow, thisColumn, color(200,0,10))
    if (currentPositionVector.x >= 0 && currentPositionVector.x < width && currentPositionVector.y >= 0 && currentPositionVector.y < height)
    {
      //console.log("(",thisRow,", ", thisColumn, "), ", "(",stopRow,", ", stopColumn,"), ")
      if (thisRow == stopCell.thisRow && thisColumn == stopCell.thisColumn){
        stopRay = true
      }
    }
  }
  
  prevStart.set(start.x, start.y)
  prevEnd.set(end.x, end.y)

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

  /* let thisRow = map(mouseY, 0, height, 0, ROWS, true)
  let thisColumn = map(mouseX, 0, width, 0, COLS, true)
  quadrille.fill(floor(thisRow), floor(thisColumn),c) */
  let {thisRow, thisColumn} = getCellIndex(mouseX, mouseY)
  quadrille.fill(thisRow, thisColumn,c)
}


function getCellIndex(xPos, yPos){

  let thisRow = floor(map(yPos, 0, height, 0, ROWS, true))
  let thisColumn = floor(map(xPos, 0, width, 0, COLS, true))
  return{thisRow, thisColumn}
}

