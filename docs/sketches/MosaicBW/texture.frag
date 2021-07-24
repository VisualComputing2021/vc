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

   if( gray < 0.05 ) 
    {
        Asciichar = texture2D(Gr1, symbolCoord) * vVertexColor;
    }
    else if( gray < 0.1 ) 
    {
        Asciichar = texture2D(Gr2, symbolCoord) * vVertexColor;
    }
    else if( gray < 0.25 )
    {
        Asciichar = texture2D(Gr3, symbolCoord) * vVertexColor;
    }
    else if( gray < 0.3 )
    {
        Asciichar = texture2D(Gr4, symbolCoord) * vVertexColor;
    }
    else if(gray < 0.35 ) 
    {
        Asciichar = texture2D(Gr5, symbolCoord) * vVertexColor;
    }
    else if(gray < 0.4 ) 
    {
        Asciichar = texture2D(Gr6, symbolCoord) * vVertexColor;
    }
    else if(gray < 0.45 )
    {
        Asciichar = texture2D(Gr7, symbolCoord) * vVertexColor;
    }
    else if(gray < 0.5 ) 
    {
        Asciichar = texture2D(Gr8, symbolCoord) * vVertexColor;
    }
    else if(gray < 0.55 ) 
    {
        Asciichar = texture2D(Gr9, symbolCoord) * vVertexColor;
    }
    else if(gray < 0.6 ) 
    {
        Asciichar = texture2D(Gr10, symbolCoord) * vVertexColor;
    }
    else if(gray < 0.65 ) 
    {
        Asciichar = texture2D(Gr11, symbolCoord) * vVertexColor;
    }
    else if(gray < 0.7 ) 
    {
        Asciichar = texture2D(Gr12, symbolCoord) * vVertexColor;
    }
    else if(gray < 0.75 ) 
    {
        Asciichar = texture2D(Gr13, symbolCoord) * vVertexColor;
    }
    else if(gray < 0.8 ) 
    {
        Asciichar = texture2D(Gr14, symbolCoord) * vVertexColor;
    }
    else 
    {
        Asciichar = texture2D(Gr15, symbolCoord) * vVertexColor;
    }

  //get vec4 color hash index
  vec4 index = texture2D(image, imageCoord);
  gray =  (index.r + index.g + index.b)/3.0;
  index.r = gray;
  index.g = gray;
  index.b = gray;
  index.a = 1.0;

  //TODO goal: get symboll form hash index
  gl_FragColor = debug ? index : Asciichar;
}

