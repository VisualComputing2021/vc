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