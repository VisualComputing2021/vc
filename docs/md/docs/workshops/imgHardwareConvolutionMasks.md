# Image and video processing

## Convolución en imágenes

El poder de paralelización que ofrecen los núcleos de una gpu puede ser aprovechado para el cálculo de convolución de imágenes, ya que, en esencia, esta consiste en una serie de operaciones sobre pixeles que son completamente independientes una de la otra, siendo candidatos ideales para la paralelización.

Para este ejemplo se implementaron máscaras de convolución de 3x3.

Además de las variables varaying usadas en ejercicios anteriores, aquí se definen variables uniformes. Estas son:
-   u_img_unit: Vector de dos posiciones que contiene las dimensiones de cada texel de la imagen original. Esta variable permitirá acceder a los texeles adyacentes al actual para poder hacer el cálculo.
- u_mask: Corresponde a la matriz de convolución que se quiera aplicar colapsada a una sola dimensión. El usuario puede escoger entre cuatro máscaras diferentes.

En el fragment shader se accede a los valores de color de los 8 texeles adyacentes de la imagen (sumado al texel actual), obteniendo 9 valores diferentes, los cuales se operan en una suma ponderada, donde los 9 pesos van indicados en el vector u_mask; y finalmente el valor resultante es asignado al fragmento correspondiente.


> :Tabs
> > :Tab title=Presentación
> > >
> > > :P5 sketch=/docs/sketches/ConvolutionShader/Convolution.js, width=710, height=400
>
> > :Tab title=P5Code
> >
> > ```js
let img;
let theShader;
let planeSide = 400;
let button;
let button_2;
let button_3;
let button_4;
let filterChoice = 1;
let mask;
function preload(){
  theShader = loadShader("/vc/docs/sketches/ConvolutionShader/conv.vert","/vc/docs/sketches/ConvolutionShader/conv.frag");
  img = loadImage("/vc/docs/sketches/ConvolutionShader/cheems.jpg");
}
function setup() {
  createCanvas(710, 400, WEBGL);
  button = createButton('Sin filtro');
  button.position(600, 10);
  button.style("color", "#00b5e2");
  button.mousePressed(function () {
    filterChoice = 1;
    button.style("color", "#00b5e2");
    button_2.style("color", "#000000");
    button_3.style("color", "#000000");
    button_4.style("color", "#000000"); 
  });
  button_2 = createButton('Filtro   1');
  button_2.position(600, 40);
  button_2.mousePressed(function () {
    filterChoice = 2;
    button_2.style("color", "#00b5e2");
    button.style("color", "#000000");
    button_3.style("color", "#000000");
    button_4.style("color", "#000000");  
  });
  button_3 = createButton('Filtro   2');
  button_3.position(600, 70);
  button_3.mousePressed(function () {
    filterChoice = 3;
    button_3.style("color", "#00b5e2");
    button_2.style("color", "#000000");
    button.style("color", "#000000");
    button_4.style("color", "#000000"); 
  });
  button_4 = createButton('Filtro   3');
  button_4.position(600, 100);
  button_4.mousePressed(function () {
    filterChoice = 4;
    button_4.style("color", "#00b5e2");
    button_2.style("color", "#000000");
    button_3.style("color", "#000000");
    button.style("color", "#000000"); 
  });
  textureMode(NORMAL);
  shader(theShader);
  theShader.setUniform("u_img_unit", [1/img.width, 1/img.height]);
  theShader.setUniform("u_texture", img);
}
function draw() {
  background(220);
  switch (filterChoice) {
    case 1:
        mask = [0, 0, 0, 0, 1, 0, 0, 0, 0];
        break;
    case 2:
        mask = [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9];
        break;  
    case 3:
      mask = [-1, -1, -1, -1, +9, -1, -1, -1, -1];
      break;
    case 4:
      mask = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
      break;
    default:
      break;
  }
  theShader.setUniform("u_mask", mask);
  beginShape();
  vertex(-planeSide/2, -planeSide/2, 0, 0); // esquina inferior izquierda
  vertex(planeSide/2, -planeSide/2, 1, 0); // esquina inferior derecha
  vertex(planeSide/2, planeSide/2, 1, 1); // esquina superior derecha
  vertex(-planeSide/2, planeSide/2, 0, 1); // esquina superior izquierda
  endShape(CLOSE);
}
> > ```
>
> > :Tab title=Fragment Shader
> >
> > ```glsl
// texture.frag 
precision mediump float;
//uniform variables coming from p5
uniform sampler2D u_texture;
uniform vec2 u_img_unit;
uniform float u_mask[9]; 
// interpolated color (same name as in vertex shader)
varying vec4 vVertexColor;
// interpolated texcoord (same name as in vertex shader)
varying vec2 vTexCoord;
void main() {
  vec2 textureIndexes[9];
  int index = 0;
  textureIndexes[0] = vTexCoord + vec2(-u_img_unit.s, +u_img_unit.t);
  textureIndexes[1] = vTexCoord + vec2(          0.0, +u_img_unit.t);
  textureIndexes[2] = vTexCoord + vec2(+u_img_unit.s, +u_img_unit.t);
  textureIndexes[3] = vTexCoord + vec2(-u_img_unit.s,           0.0);
  textureIndexes[4] = vTexCoord + vec2(          0.0,           0.0);
  textureIndexes[5] = vTexCoord + vec2(+u_img_unit.s,           0.0);
  textureIndexes[6] = vTexCoord + vec2(-u_img_unit.s, -u_img_unit.t);
  textureIndexes[7] = vTexCoord + vec2(          0.0, -u_img_unit.t);
  textureIndexes[8] = vTexCoord + vec2(+u_img_unit.t, -u_img_unit.t);
  vec4 textureValues[9];
  for(int i = 0; i < 9; i++){
    textureValues[i] = texture2D(u_texture, textureIndexes[i]);
  }
  vec4 convolution = vec4(0, 0, 0, 0);
  for(int i = 0; i < 9; i++){
    convolution += textureValues[i] * u_mask[i];
  }
  convolution.a = 1.0;
  gl_FragColor = convolution * vVertexColor;  
}
> > ```

> :ToCPrevNext