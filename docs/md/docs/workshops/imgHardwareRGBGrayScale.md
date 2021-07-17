# Image and video processing


A continuación se evidencia el uso de shaders en las diferentes asignaciones que se desarrollaron anteriormente solo con las herramientas de software provistas por p5.js

## Gama de grises

Mediante el canvas 3d que proporciona WEBGL se genera una figura rectangular a partir de cuatro vértices. Esta figura va a servir como "marco" para contener la imagen que se quiere mostrar. La imagen se define como una textura que se va aplicar al rectángulo.

El vertex shader en este ejemplo, el cual es en escencia trivial y por lo tanto no se agrega en este informe, define la variable varying vTexCoord, de manera que el fragment shader es capaz de aprovecharla para poder acceder a las coordenadas, y posteriormente el color, de cada texel de la imagen. Es mediante este color que el fragment shader es capaz de generar la escala de grises, haciendo un promedio de los valores de cada canal rgb y asignándoselo al fragmento (pixel) correspondiente.

> :Tabs
> > :Tab title=Presentación
> > >
> > > :P5 sketch=/docs/sketches/TextureShader/TextureShader.js, width=400, height=400
>
> > :Tab title=P5Code
> >
> > ```js
let theShader;
let img;
let planeSide = 400;
let button;
function preload(){
  // load the shader
  theShader = loadShader('/vc/docs/sketches/TextureShader/texture.vert','/vc/docs/sketches/TextureShader/texture.frag');
  img = loadImage("/vc/docs/sketches/TextureShader/doge.jpg");
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
  background(255);
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
uniform sampler2D texture;
// interpolated color (same name as in vertex shader)
varying vec4 vVertexColor;
vec4 grayTextureColor;
float gray;
// interpolated texcoord (same name as in vertex shader)
varying vec2 vTexCoord;
void main() {
  grayTextureColor = texture2D(texture, vTexCoord);
  gray = (grayTextureColor.r + grayTextureColor.g + grayTextureColor.b)/3.0;
  grayTextureColor.r = gray;
  grayTextureColor.g = gray;
  grayTextureColor.b = gray;
  grayTextureColor.a = 1.0;
  gl_FragColor = grayTextureColor * vVertexColor;  
}
> > ```

## RGB Hardware Video

Usaremos el mismo shader creado para las imagenes para aplicar al video así no hacemos duplicación de codigo así el fragment shader es capaz de generar la escala de grises con los mismos parametros de las imagenes.

> :Tabs
> > :Tab title=Presentación
> > >
> > > :P5 sketch=/docs/sketches/TextureShader/TextureVideoShader.js, width=858, height=480
>
> > :Tab title=P5Code
> >
> > ```js
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
  createCanvas(858, 480, WEBGL);
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
  theShader.setUniform("textureWidth", 858.0);
  theShader.setUniform("textureHeight", 480.0);
}
> > ```
>

> :ToCPrevNext