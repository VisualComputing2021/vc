let theShader;
let img;
let angle = 0;
let rotate = false;
let planeSide = 400;
let button;
function preload(){
  // load the shader
  theShader = loadShader('/vc/docs/sketches/TextureShader/texture.vert','/vc/docs/sketches/TextureShader/texture.frag');
  img = loadImage("/vc/docs/sketches/TextureShader/doge.jpg");
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(710, 400, WEBGL);
  button = createButton('Rotar doge');
  button.position(0, 0);
  button.mousePressed(changeBG);
  textureMode(NORMAL);
  shader(theShader);
  // here we're using setUniform() to send our uniform values to the shader
  theShader.setUniform("texture", img);
}

function draw() {
  background(255);
  
    if(rotate){
    //hace rotar las figuras
    rotateX(angle);
    rotateY(angle/2);
    rotateZ(angle*2);
    }
    angle+=0.007;
    beginShape();
    vertex(-planeSide/2, -planeSide/2, 0, 0); // esquina inferior izquierda
    vertex(planeSide/2, -planeSide/2, 1, 0); // esquina inferior derecha
    vertex(planeSide/2, planeSide/2, 1, 1); // esquina superior derecha
    vertex(-planeSide/2, planeSide/2, 0, 1); // esquina superior izquierda
    endShape(CLOSE);
}

function changeBG() {
  if(!rotate){
    rotate = true;
    button.html("No rotar doge");
  }else{
    rotate = false;
    button.html("Rotar doge");
  }
}
