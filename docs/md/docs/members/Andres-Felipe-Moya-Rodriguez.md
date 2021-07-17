# Andres Felipe Moya Rodríguez

## Bio
Nacido en Bogotá, Colombia.
Estudiante de ingeniería de sistemas y computación en la Universidad Nacional de Colombia.

## Interests

Desarrollo de software, estructuras de datos, deep learning.

## Contributions

*Problema de Simon*: Caso especial del problema del subgrupo oculto. Puede ser resuelto con la ayuda de algoritmos cuánticos.
https://es.wikipedia.org/wiki/Problema_de_Simon

## Hobbies

Películas, series de televisión, música y videojuegos.


## Ilusión

En 1904, Mary Everest Boole (matemática inglesa) inventó las ***Curve stitching*** (curva de costura), una forma de arte donde se "crean" líneas curvas a través de líneas rectas. Este fenómeno de crear una aparente curvatura ocurre gracias al hecho que una curva se puede aproximar mediante el trazo de una cantidad finita de tangentes a la misma.

> :Tabs
> > :Tab title=Presentación
> > >
> > > :P5 width=800, height=800
> > >
> > >function setup() {
> > >  createCanvas(800, 800);
> > >}
> > >
> > >function draw() {
> > >  background(220);
> > >  let startx = 400;
> > >  let starty = 0;
> > >  let endx = 0;
> > >  let endy=10;
> > >  let step = 10;
> > >  while(startx!=0){
> > >    line(startx, starty, endx, endy);
> > >    startx-=step;
> > >    endy+=step;
> > >  }
> > >  
> > >  startx = 400;
> > >  starty = 0;
> > >  endx = 390;
> > >  endy=400;
> > >  step = 10;
> > >  while(endx!=0){
> > >    line(startx, starty, endx, endy);
> > >    starty+=step;
> > >    endx-=step;
> > >  }
> > >  
> > >  
> > >  startx = 400;
> > >  starty = 0;
> > >  endx = 800;
> > >  endy = 10;
> > >  while(startx!=800){
> > >    line(startx, starty, endx, endy);
> > >    startx+=step;
> > >    endy+=step;
> > >  }
> > >  
> > >  
> > >  startx = 400;
> > >  starty = 0;
> > >  endx = 410;
> > >  endy = 400;
> > >  while(endx!=800){
> > >    line(startx, starty, endx, endy);
> > >    endx+=step;
> > >    starty+=step;
> > >  }
> > >  
> > >  startx = 0;
> > >  starty = 400;
> > >  endx = 400;
> > >  endy = 410;
> > >  while(startx!=400){
> > >    line(startx, starty, endx, endy);
> > >    startx+=step;
> > >    endy+=step;
> > >  }
> > >  
> > >  startx = 0;
> > >  starty = 400;
> > >  endx = 10;
> > >  endy = 800;
> > >  while(endx!=400){
> > >    line(startx, starty, endx, endy);
> > >    starty+=step;
> > >    endx+=step;
> > >  } 
> > >
> > >  startx = 400;
> > >  starty = 800;
> > >  endx = 410;
> > >  endy = 400;
> > >  while(starty!=400){
> > >    line(startx, starty, endx, endy);
> > >    starty-=step;
> > >    endx+=step;
> > >  } 
> > > 
> > >  startx = 800;
> > >  starty = 400;
> > >  endx = 790;
> > >  endy = 800;
> > >  while(endx!=400){
> > >    line(startx, starty, endx, endy);
> > >    starty+=step;
> > >    endx-=step;
> > >  }
> > >  line(0,400,800,400);
> > >  line(400,0,400,800);
> > >  line(400,390,0,400);
> > >  line(400,390,800,400);
> > >  
> > >}
>
> > :Tab title=P5Code
> >
> > ```js
> > > :P5 width=800, height=800
> > >
> > >function setup() {
> > >  createCanvas(800, 800);
> > >}
> > >
> > >function draw() {
> > >  background(220);
> > >  let startx = 400;
> > >  let starty = 0;
> > >  let endx = 0;
> > >  let endy=10;
> > >  let step = 10;
> > >  while(startx!=0){
> > >    line(startx, starty, endx, endy);
> > >    startx-=step;
> > >    endy+=step;
> > >  }
> > >  
> > >  startx = 400;
> > >  starty = 0;
> > >  endx = 390;
> > >  endy=400;
> > >  step = 10;
> > >  while(endx!=0){
> > >    line(startx, starty, endx, endy);
> > >    starty+=step;
> > >    endx-=step;
> > >  }
> > >  
> > >  
> > >  startx = 400;
> > >  starty = 0;
> > >  endx = 800;
> > >  endy = 10;
> > >  while(startx!=800){
> > >    line(startx, starty, endx, endy);
> > >    startx+=step;
> > >    endy+=step;
> > >  }
> > >  
> > >  
> > >  startx = 400;
> > >  starty = 0;
> > >  endx = 410;
> > >  endy = 400;
> > >  while(endx!=800){
> > >    line(startx, starty, endx, endy);
> > >    endx+=step;
> > >    starty+=step;
> > >  }
> > >  
> > >  startx = 0;
> > >  starty = 400;
> > >  endx = 400;
> > >  endy = 410;
> > >  while(startx!=400){
> > >    line(startx, starty, endx, endy);
> > >    startx+=step;
> > >    endy+=step;
> > >  }
> > >  
> > >  startx = 0;
> > >  starty = 400;
> > >  endx = 10;
> > >  endy = 800;
> > >  while(endx!=400){
> > >    line(startx, starty, endx, endy);
> > >    starty+=step;
> > >    endx+=step;
> > >  } 
> > >
> > >  startx = 400;
> > >  starty = 800;
> > >  endx = 410;
> > >  endy = 400;
> > >  while(starty!=400){
> > >    line(startx, starty, endx, endy);
> > >    starty-=step;
> > >    endx+=step;
> > >  } 
> > > 
> > >  startx = 800;
> > >  starty = 400;
> > >  endx = 790;
> > >  endy = 800;
> > >  while(endx!=400){
> > >    line(startx, starty, endx, endy);
> > >    starty+=step;
> > >    endx-=step;
> > >  }
> > >  line(0,400,800,400);
> > >  line(400,0,400,800);
> > >  line(400,390,0,400);
> > >  line(400,390,800,400);
> > >  
> > >}
> > ```


## 3Doge

¡Puede interactuar con el entorno 3D!
- Mueva la cámara con el mouse
- Puede moverse con las flechas de su tecládo o las teclas awsd
- Puede saltar con la barra de espacio
- ¡Oprima el botón **Rotar doge** y observe lo que ocurre con la imagen!

Si no puede interactuar con el entorno, haga click dentro de él

> :Tabs
> > :Tab title=Presentación
> > >
> > > :P5 sketch=/docs/sketches/dogeGame.js, width=400, height=300
>
> > :Tab title=P5Code
> >
> > ```js
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
  img = loadImage("doge.jpg");
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
> > ```

> :ToCPrevNext