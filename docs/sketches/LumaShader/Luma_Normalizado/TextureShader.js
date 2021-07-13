let theShader;
let img;
let planeSide = 400;
let button;
function preload(){
  // load the shader
  theShader = loadShader('/vc/docs/sketches/LumaShader/Luma_Normalizado/texture.vert','/vc/docs/sketches/LumaShader/Luma_Normalizado/texture.frag');
  img = loadImage("/vc/docs/sketches/LumaShader/Luma_Normalizado/DeepMind.jpg");
}
function setup() {
  // shaders require WEBGL mode to work
  createCanvas(400, 400, WEBGL);
  textureMode(NORMAL);
  shader(theShader);
  // here we're using setUniform() to send our uniform values to the shader
  theShader.setUniform("texture", img);
}
function draw() {
  background(125);
  beginShape();
  vertex(-planeSide/2, -planeSide/2, 0, 0); // esquina inferior izquierda
  vertex(planeSide/2, -planeSide/2, 1, 0); // esquina inferior derecha
  vertex(planeSide/2, planeSide/2, 1, 1); // esquina superior derecha
  vertex(-planeSide/2, planeSide/2, 0, 1); // esquina superior izquierda
  endShape(CLOSE);
}




