let theShader;
let video;
let planeSide = 400;


function preload(){
  // load the shader
  theShader = loadShader('/vc/docs/sketches/LumaShader/Luma_Ponderado/texture.vert','/vc/docs/sketches/LumaShader/Luma_Ponderado/texture.frag');
  video = createVideo("/vc/docs/sketches/LumaShader/Luma_Video/SpaceJam.mp4");
}
function setup() {
  // shaders require WEBGL mode to work
  
  createCanvas(400, 400, WEBGL);
  video.hide();
  video.volume(0);
  video.autoplay(true);
  video.size(710, 400);
  video.loop();
  shader(theShader)
  textureMode(NORMAL);
  shader(theShader);
  // here we're using setUniform() to send our uniform values to the shader
}
function draw() {
  background(255);
  textSize(20);
  text("Frame con frameRate() = ");

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
