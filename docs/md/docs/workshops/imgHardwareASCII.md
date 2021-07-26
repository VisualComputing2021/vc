# Mosaico ASCII de una imagen

En este caso se siguió el procesamiento similar al realizado en el taller de software, el cual consistió en enviar al shader 10 imágenes que representasen un carácter, ordenadas según su nivel de "oscuridad", por ejemplo, el carácter "@" es más oscuro que el carácter "*", luego se miden en el shader el nivel de brillo utilizando metodologías como las de luma y colocando el carácter correspondiente.

Para poder visualizar mejor la imagen se cambió el color de los caracteres por el fondo que representan y se utilizó un conjunto de imágenes con las mismas dimensiones 250x250 pixeles para evitar problemas de proporción, aunque es posible al aumentar o reducir el tamaño de los pixeles, llegar una configuración cuyas proporciones sean más concisas y visualmente más atrayentes.

> :Tabs
> > :Tab title=Resultado
> > >
> > > :P5 sketch=/docs/sketches/ASCII/ASCIIShader.js, width=1000, height=1000
> > 
>
> > :Tab title=Video
> > >
> > > :P5 sketch=/docs/sketches/ASCII/ASCIIVideo.js, width=1000, height=1000
>
> > :Tab title=JavaScript code
> >
> > ```js
let theShader;
let img;
let planeSide = 1000;
let button;
let debug;
let symbols = [];
let slider;

function preload(){
  // load the shader
  theShader = loadShader('/vc/docs/sketches/ASCII/texture.vert','/vc/docs/sketches/ASCII/texture.frag');
  img = loadImage("/vc/docs/sketches/ASCII/dogos.jpg");
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
  shader(theShader);
  // here we're using setUniform() to send our uniform values to the shader
  theShader.setUniform("image", img);
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
// symboll is send by the sketch
uniform sampler2D A1;
uniform sampler2D A2;
uniform sampler2D A3;
uniform sampler2D A4;
uniform sampler2D A5;
uniform sampler2D A6;
uniform sampler2D A7;
uniform sampler2D A8;
uniform sampler2D A9;
uniform sampler2D A10;

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

  //get vec4 color hash index
  vec4 index = texture2D(image, imageCoord);

 if( gray == 0.1 ) 
    {
        //Asciichar = texture2D(A1, symbolCoord) * vVertexColor;
        charTexel = texture2D(A1, symbolCoord);
    }
    else if( gray < 0.2 ) 
    {
        //Asciichar = texture2D(A2, symbolCoord) * vVertexColor;
        charTexel = texture2D(A2, symbolCoord);
    }
    else if( gray < 0.3 )
    {
        //Asciichar = texture2D(A3, symbolCoord) * vVertexColor;
        charTexel = texture2D(A3, symbolCoord);
    }
    else if( gray < 0.4 )
    {
        //Asciichar = texture2D(A4, symbolCoord) * vVertexColor;
        charTexel = texture2D(A4, symbolCoord);
    }
    else if(gray < 0.5 ) 
    {
        //Asciichar = texture2D(A5, symbolCoord) * vVertexColor;
        charTexel = texture2D(A5, symbolCoord);
    }
    else if(gray < 0.6 ) 
    {
        //Asciichar = texture2D(A6, symbolCoord) * vVertexColor;
        charTexel = texture2D(A6, symbolCoord);
    }
    else if(gray < 0.7 )
    {
        //Asciichar = texture2D(A7, symbolCoord) * vVertexColor;
        charTexel = texture2D(A7, symbolCoord);
    }
    else if(gray < 0.8 ) 
    {
        //Asciichar = texture2D(A8, symbolCoord) * vVertexColor;
        charTexel = texture2D(A8, symbolCoord);
    }
    else if(gray < 0.9 ) 
    {
        //Asciichar = texture2D(A9, symbolCoord) * vVertexColor;
        charTexel = texture2D(A9, symbolCoord);
    }
    else 
    {
        //Asciichar = texture2D(A10, symbolCoord) * vVertexColor;
        charTexel = texture2D(A10, symbolCoord);
    }

    Asciichar = all(lessThan(abs(charTexel-black),threshold)) ? index : fallback;

  //TODO goal: get symboll form hash index
  gl_FragColor = debug ? index : Asciichar;
}
> >  ```

> :ToCPrevNext