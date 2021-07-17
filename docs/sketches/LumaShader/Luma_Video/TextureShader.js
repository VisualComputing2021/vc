let theShader;
let img;
let planeSide = 400;
let button;
function preload(){
  // load the shader
  theShader = loadShader('/vc/docs/sketches/LumaShader/Luma_Ponderado/texture.vert','/vc/docs/sketches/LumaShader/Luma_Ponderado/texture.frag');
  video = createVideo("/vc/docs/sketches/LumaShader/Luma_Video/SpaceJam.mp4");
}
function setup() {
  // shaders require WEBGL mode to work
  createCanvas(400, 400, WEBGL);
  video.loop();
  video.hide();
  video.volume(0);
  noStroke();
  shader(theShader)
  textureMode(NORMAL);
  shader(theShader);
  // here we're using setUniform() to send our uniform values to the shader
}
function draw() {
  background(255);
  beginShape();
  vertex(-planeSide/2, -planeSide/2, 0, 0); // esquina inferior izquierda
  vertex(planeSide/2, -planeSide/2, 1, 0); // esquina inferior derecha
  vertex(planeSide/2, planeSide/2, 1, 1); // esquina superior derecha
  vertex(-planeSide/2, planeSide/2, 0, 1); // esquina superior izquierda
  endShape(CLOSE);

  theShader.setUniform("texture", video);
  theShader.setUniform("textureWidth", 400.0);
  theShader.setUniform("textureHeight", 400.0)
}




