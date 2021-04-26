let angle = 0;
let img;
let camX;
let camY;
let camZ;
let camPosX = 0;
let camPosY = 0;
let jump = false;
let jumpCount = 0;
let button;
let rotate = false;

function preload(){
  img = loadImage("/vc/docs/sketches/doge.jpg");
}
function setup() {
  // crea un lienzo de 400 pixeles de ancho, 300 de alto configurado para mostrar gráficos en 3D
  createCanvas(400, 300, WEBGL);
  
  camZ = (height/2)/tan(PI/6);
  button = createButton('Rotar doge');
  button.position(0, 0);
  button.mousePressed(changeBG);
}


function draw() {
  //Fondo del canvas color gris
  background(175);
  //valores de x, y que varían mientras se mueve el mouse
  camX = map(mouseX, 0, width, -200, 200);
  camY = map(mouseY, 0, height, -200, 200);
  planeSide = 200;
  let fieldOfView = PI / 3.0;
    
  //Controles del juego para mover cámara
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    camPosX-=3;
  }else if(keyIsDown(RIGHT_ARROW) || keyIsDown(68) ) {
    camPosX+=3;
  }else if(keyIsDown(UP_ARROW)|| keyIsDown(87)){
    camZ-=3;
    
  }else if(keyIsDown(DOWN_ARROW)|| keyIsDown(83)){
    camZ+=3;
  }
  //Controla la función de saltar
  if(jump){
    if(jumpCount < 30){
      camPosY--;
    }else{
      camPosY++;
    }
    if(camPosY == 0){
      jump = false;
      jumpCount = 0;
    }
    jumpCount++;
  }
  /*
  posición de la camara: (camPosX,0,camZ)
  dirección donde la cámara apunta (camX + camPosX,camY,0)
  */
  camera(camPosX,camPosY,camZ,camX + camPosX,camY + camPosY,0,0,1,0);
  
  //Modifica el campo de visión según mueve el mouse, aspect ratio (w/h), y planos que truncan el fov (height/2)/(10*tan(PI/6)), (10*height/2)/(tan(PI/6)))
   perspective(fieldOfView, width / height, camZ/10, 10* camZ);
  
  //no dibuja los bordes de la figura ni sus primitivas
  noStroke();
  
 
  if(rotate){
    //hace rotar las figuras
    rotateX(angle);
    rotateY(angle/2);
    rotateZ(angle*2);
  }
  
  
  
 
  //Normaliza las coordenadas de la imagen de textura para mapearlas en la figura
  
  //carga la imagen como skin de la figura
  texture(img);
  textureMode(NORMAL); 
  beginShape();
  vertex(-planeSide/2, -planeSide/2, 0, 0); // esquina inferior izquierda
  vertex(planeSide/2, -planeSide/2, 1, 0); // esquina inferior derecha
  vertex(planeSide/2, planeSide/2, 1, 1); // esquina superior derecha
  vertex(-planeSide/2, planeSide/2, 0, 1); // esquina superior izquierda
  endShape(CLOSE);
  

  
  angle += 0.007 ;
}

function keyPressed() {
  //cuando se presiona espacio
  if (keyCode === 32) {
    jump = true;
  }
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