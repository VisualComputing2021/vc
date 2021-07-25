let theShader;
let video;
let planeSide = 1000;
let button;
let debug;
let symbols = [];
let slider;

function preload(){
  // load the shader
  theShader = loadShader('/vc/docs/sketches/ASCII/texture.vert','/vc/docs/sketches/ASCII/texture.frag');
  video = createVideo("/vc/docs/sketches/LumaShader/Luma_Video/SpaceJam.mp4");
  var str = "";
  for (var i=0 ; i<10 ; i++){
    str = "/vc/docs/sketches/ASCII/A"+String(i+1)+".png";
    symbols[i] = loadImage(str);
  }
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(1000, 1000, WEBGL);
  textureMode(NORMAL);
  video.loop();
  video.hide();
  video.volume(0);
  noStroke();
  shader(theShader);
  // here we're using setUniform() to send our uniform values to the shader
  for (var i=0 ; i<10 ; i++){
    str = "A"+String(i+1);
    theShader.setUniform(str, symbols[i]);
  }
  theShader.setUniform("resolution", 100);
  debug = true;
  theShader.setUniform("debug", debug);

  //Slider Config
  slider = createSlider(10,500,100,10);
  slider.position( 100, 30);
  slider.style('width', '200px');
  showPixel = createElement('h2', 'px '+100);
  showPixel.position( 30, 0);
}

function draw() {
  theShader.setUniform("image", video);
  theShader.setUniform("resolution", slider.value());
  showPixel.html('px '+slider.value());
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