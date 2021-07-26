# Mosaico de una imagen a partir de imagenes pequeñas

Para este caso se intentó en una primera instancia utilizar la metodología que se realizó en el taller de software, la cual se fundamenta en utilizar una gran cantidad de imágenes con diferentes tonalidades y gradientes de colores con el fin de substituir cada pixel de la imagen principal con una imagen de la base de datos, pero esto no es posible por las siguientes razones:

1) GLSL solo permite en los shader un máximo de 16 texturas.

2) No hay una forma fácil de manipular grandes cantidades de imágenes en el fragment shader, ya que no se pueden manipular arreglos.

3) No es posible enviar directamente arreglos de imágenes desde el código de js.

Por lo mismo, se utilizó un arreglo de 15 imágenes en blanco y negro con diferente saturación o brillo, a estas se les aplico transparencia a la vez de "mezclar" su color con el del fondo, esto para dar la sensación de un mosaico, pero manteniendo la idea de la imagen original. La fórmula fue la siguiente:

> :Formula
>
> Asciichar = (Asciichar * u_tintColor)/normTint;

Donde cada variable es:

Asciichar => vec4

u_tintColor => vec4( texturaOriginal.r , texturaOriginal.g , texturaOriginal.b , 1.0 )

normTint = 0.30 * u_tintColor.r + 0.59 * u_tintColor.g + 0.11 * u_tintColor.b

> :Tabs
> > :Tab title=Color
> > >
> > > :P5 sketch=/docs/sketches/Mosaico/MosaicShader.js, width=1000, height=1000
> > 
>
> > :Tab title=Video
> > >
> > > :P5 sketch=/docs/sketches/Mosaico/MosaicVideo.js, width=1000, height=1000
>
> > :Tab title=JavaScript code
> >
> > ```js
let theShader;
let img;
let planeSide = 1000;
let button;
let debug;
let slider;
let Grayimgs = new Array(10);

function preload(){
  // load the shader
  theShader = loadShader('/vc/docs/sketches/Mosaico/texture.vert','/vc/docs/sketches/Mosaico/texture.frag');
  img = loadImage("/vc/docs/sketches/Mosaico/dogos.jpg");
  var k = 0;
  for (let i=0; i<15; i++){
    Grayimgs[k] = loadImage("/vc/docs/sketches/Mosaico/gray"+(i+1)+".jpg");
    k = k + 1;
  }
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(1000, 1000, WEBGL);
  textureMode(NORMAL);
  shader(theShader);
  // here we're using setUniform() to send our uniform values to the shader
  theShader.setUniform("image", img);
  var str = ""
  for (var i=0 ; i<15 ; i++){
    str = "Gr"+String(15-i);
    theShader.setUniform(str, Grayimgs[i]);
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
> > ```
>
> > :Tab title=Fragment Shader code
> > 
> >  ```glsl
precision mediump float;

//image send by the sketch
uniform sampler2D image;

// grey images
uniform sampler2D Gr1;
uniform sampler2D Gr2;
uniform sampler2D Gr3;
uniform sampler2D Gr4;
uniform sampler2D Gr5;
uniform sampler2D Gr6;
uniform sampler2D Gr7;
uniform sampler2D Gr8;
uniform sampler2D Gr9;
uniform sampler2D Gr10;
uniform sampler2D Gr11;
uniform sampler2D Gr12;
uniform sampler2D Gr13;
uniform sampler2D Gr14;
uniform sampler2D Gr15;

// toggles image display
uniform bool debug;
//taget horizontal & vertical resolution
uniform float resolution;

// interpolated color
varying vec4 vVertexColor;
// interpolated textcord
varying vec2 vTexCoord;

//-------LUMA-------------
vec4 grayTextureColor;
float gray;
//-------------------

void main(){

  // remap symbolCooord to [0.0, resolution] R
  vec2 symbolCoord = vTexCoord * resolution;
  // remap imageCoord to [0.0, resolution] Z
  vec2 imageCoord = floor(symbolCoord);
  // remap symbolCoord to [0.0, 1.0] R
  symbolCoord = symbolCoord - imageCoord;
  //remap imageCoord to [0.0, 1.0] R
  imageCoord = imageCoord * vec2(1.0)/vec2(resolution);

  //color
  vec4 fallback = vec4(0.0,0.0,0.0,0.0);
  vec4 black = vec4(0.0,0.0,0.0,1.0);
  vec4 charTexel;
  vec4 threshold = vec4(0.1);

  grayTextureColor = texture2D(image, vTexCoord);
  gray =  (grayTextureColor.r + grayTextureColor.g + grayTextureColor.b)/3.0;
  float cha = 0.;
  vec4 Asciichar;
  vec4 u_tintColor = vec4(grayTextureColor.r,grayTextureColor.g,grayTextureColor.b,1.0);
  float normTint = 0.30 * u_tintColor.r + 0.59 * u_tintColor.g + 0.11 * u_tintColor.b;

   if( gray < 0.05 ) 
    {
        Asciichar = texture2D(Gr1, symbolCoord) * vVertexColor;
        Asciichar = (Asciichar * u_tintColor)/normTint;
    }
    else if( gray < 0.1 ) 
    {
        Asciichar = texture2D(Gr2, symbolCoord) * vVertexColor;
        Asciichar = (Asciichar * u_tintColor)/normTint;
    }
    else if( gray < 0.25 )
    {
        Asciichar = texture2D(Gr3, symbolCoord) * vVertexColor;
        Asciichar = (Asciichar * u_tintColor)/normTint;
    }
    else if( gray < 0.3 )
    {
        Asciichar = texture2D(Gr4, symbolCoord) * vVertexColor;
        Asciichar = (Asciichar * u_tintColor)/normTint;
    }
    else if(gray < 0.35 ) 
    {
        Asciichar = texture2D(Gr5, symbolCoord) * vVertexColor;
        Asciichar = (Asciichar * u_tintColor)/normTint;
    }
    else if(gray < 0.4 ) 
    {
        Asciichar = texture2D(Gr6, symbolCoord) * vVertexColor;
        Asciichar = (Asciichar * u_tintColor)/normTint;
    }
    else if(gray < 0.45 )
    {
        Asciichar = texture2D(Gr7, symbolCoord) * vVertexColor;
        Asciichar = (Asciichar * u_tintColor)/normTint;
    }
    else if(gray < 0.5 ) 
    {
        Asciichar = texture2D(Gr8, symbolCoord) * vVertexColor;
        Asciichar = (Asciichar * u_tintColor)/normTint;
    }
    else if(gray < 0.55 ) 
    {
        Asciichar = texture2D(Gr9, symbolCoord) * vVertexColor;
        Asciichar = (Asciichar * u_tintColor)/normTint;
    }
    else if(gray < 0.6 ) 
    {
        Asciichar = texture2D(Gr10, symbolCoord) * vVertexColor;
        Asciichar = (Asciichar * u_tintColor)/normTint;
    }
    else if(gray < 0.65 ) 
    {
        Asciichar = texture2D(Gr11, symbolCoord) * vVertexColor;
        Asciichar = (Asciichar * u_tintColor)/normTint;
    }
    else if(gray < 0.7 ) 
    {
        Asciichar = texture2D(Gr12, symbolCoord) * vVertexColor;
        Asciichar = (Asciichar * u_tintColor)/normTint;
    }
    else if(gray < 0.75 ) 
    {
        Asciichar = texture2D(Gr13, symbolCoord) * vVertexColor;
        Asciichar = (Asciichar * u_tintColor)/normTint;
    }
    else if(gray < 0.8 ) 
    {
        Asciichar = texture2D(Gr14, symbolCoord) * vVertexColor;
        Asciichar = (Asciichar * u_tintColor)/normTint;
    }
    else 
    {
        Asciichar = texture2D(Gr15, symbolCoord) * vVertexColor;
        Asciichar = (Asciichar * u_tintColor)/normTint;
    }

  //get vec4 color hash index
  vec4 index = texture2D(image, imageCoord);

  //TODO goal: get symboll form hash index
  gl_FragColor = debug ? index : Asciichar;
}
> >  ```
>
> > :Tab title=BW
> > >
> > > :P5 sketch=/docs/sketches/MosaicBW/MosaicBWShader.js, width=1000, height=1000


> :ToCPrevNext