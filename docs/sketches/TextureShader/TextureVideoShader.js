let theShader;
let video;
let planeSide = 400;
let button;
function preload() {
  // load the shader
  theShader = loadShader(
    "/vc/docs/sketches/TextureShader/texture.vert",
    "/vc/docs/sketches/TextureShader/texture.frag"
  );
  video = createVideo("/vc/docs/sketches/LumaShader/Luma_Video/SpaceJam.mp4");
}
function setup() {
  createCanvas(400, 400, WEBGL);
  video.loop();
  video.hide();
  video.volume(0);
  noStroke();
  shader(theShader);
  textureMode(NORMAL);
  shader(theShader);
}
function draw() {
  background(255);
  beginShape();
  vertex(-planeSide / 2, -planeSide / 2, 0, 0); // esquina inferior izquierda
  vertex(planeSide / 2, -planeSide / 2, 1, 0); // esquina inferior derecha
  vertex(planeSide / 2, planeSide / 2, 1, 1); // esquina superior derecha
  vertex(-planeSide / 2, planeSide / 2, 0, 1); // esquina superior izquierda
  endShape(CLOSE);

  theShader.setUniform("texture", video);
  theShader.setUniform("textureWidth", 400.0);
  theShader.setUniform("textureHeight", 400.0);
}
