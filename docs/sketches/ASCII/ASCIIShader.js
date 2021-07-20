let theShader;
let img;
let planeSide = 1000;
let button;
let debug;
let symbols = [];

function preload(){
  // load the shader
  theShader = loadShader('/vc/docs/sketches/ASCII/texture.vert','/vc/docs/sketches/ASCII/texture.frag');
  img = loadImage("/vc/docs/sketches/ASCII/dogo.jpg");
  symboll = loadImage("/vc/docs/sketches/ASCII/DeepMind.jpg");
  symbols[0] = loadImage('/vc/docs/sketches/ASCII/DeepMind.jpg');
  symbols[1] = loadImage('/vc/docs/sketches/ASCII/dogo.jpg');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(1000, 1000, WEBGL);
  textureMode(NORMAL);
  shader(theShader);
  // here we're using setUniform() to send our uniform values to the shader
  theShader.setUniform("image", img);
  theShader.setUniform("symboll", symboll);
  theShader.setUniform("resolution", 100);
  debug = true;
  theShader.setUniform("debug", debug);
}

function draw() {
  background(0);
  beginShape();
  vertex(-planeSide/2, -planeSide/2, 0, 0); // esquina inferior izquierda
  vertex(planeSide/2, -planeSide/2, 1, 0); // esquina inferior derecha
  vertex(planeSide/2, planeSide/2, 1, 1); // esquina superior derecha
  vertex(-planeSide/2, planeSide/2, 0, 1); // esquina superior izquierda
  endShape(CLOSE);
}

function keyPressed(){
  if (key === 'd'){
    debug = !debug;
    theShader.setUniform("debug", debug);
  }
}





