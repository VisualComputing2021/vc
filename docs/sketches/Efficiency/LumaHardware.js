let theShader;
let video;
let planeSide = 400;
let framecount;
let framerate = 0;
function preload(){
  // load the shader
  theShader = loadShader('/vc/docs/sketches/LumaShader/Luma_Ponderado/texture.vert','/vc/docs/sketches/LumaShader/Luma_Ponderado/texture.frag');
  video = createVideo("/vc/docs/sketches/LumaShader/Luma_Video/SpaceJam.mp4");
}
function setup() {
  // shaders require WEBGL mode to work
  createCanvas(710, 400, WEBGL);
  
  video.hide();
  video.volume(0);
  noStroke();
  
  frameRate(120)
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
  theShader.setUniform("textureWidth", 710.0);
  theShader.setUniform("textureHeight", 400.0)
  framecount = frameCount
  framerate += frameRate()
  text("Frame con frameRate() = " + framerate.toFixed(3), 100, 30);
  //console.log(framerate/framecount)
  //console.log('si')
}