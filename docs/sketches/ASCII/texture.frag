precision mediump float;

//image send by the sketch
uniform sampler2D image;
// symboll is send by the sketch
uniform sampler2D symboll;

// toggles image display
uniform bool debug;
//taget horizontal & vertical resolution
uniform float resolution;

// interpolated color
varying vec4 vVertexColor;
// interpolated textcord
varying vec2 vTexCoord;

#define P(id,a,b,c,d,e,f,g,h) if( id == int(pos.y) ){ int pa = a+2*(b+2*(c+2*(d+2*(e+2*(f+2*(g+2*(h))))))); cha = floor(mod(float(pa)/pow(2.,float(pos.x)-1.),2.)); }

void main(){
  // remap symbolCooord to [0.0, resolution] R
  vec2 symbolCoord = vTexCoord * resolution;
  // remap imageCoord to [0.0, resolution] Z
  vec2 imageCoord = floor(symbolCoord);
  // remap symbolCoord to [0.0, 1.0] R
  symbolCoord = symbolCoord - imageCoord;
  //remap imageCoord to [0.0, 1.0] R
  imageCoord = imageCoord * vec2(1.0)/vec2(resolution);

  grayTextureColor = texture2D(image, vTexCoord);
  gray = (grayTextureColor.r*0.299 + grayTextureColor.g*0.587 + grayTextureColor.b*0.0114);
  float cha = 0.;

  if( gray < .125 )
    {
        P(11,0,0,0,0,0,0,0,0);
        P(10,0,0,0,0,0,0,0,0);
        P(9,0,0,0,0,0,0,0,0);
        P(8,0,0,0,0,0,0,0,0);
        P(7,0,0,0,0,0,0,0,0);
        P(6,0,0,0,0,0,0,0,0);
        P(5,0,0,0,0,0,0,0,0);
        P(4,0,0,0,0,0,0,0,0);
        P(3,0,0,0,0,0,0,0,0);
        P(2,0,0,0,0,0,0,0,0);
        P(1,0,0,0,0,0,0,0,0);
        P(0,0,0,0,0,0,0,0,0);
    }
    else if( gray < .25 ) // .
    {
        P(11,0,0,0,0,0,0,0,0);
        P(10,0,0,0,0,0,0,0,0);
        P(9,0,0,0,0,0,0,0,0);
        P(8,0,0,0,0,0,0,0,0);
        P(7,0,0,0,0,0,0,0,0);
        P(6,0,0,0,0,0,0,0,0);
        P(5,0,0,0,0,0,0,0,0);
        P(4,0,0,0,1,1,0,0,0);
        P(3,0,0,0,1,1,0,0,0);
        P(2,0,0,0,0,0,0,0,0);
        P(1,0,0,0,0,0,0,0,0);
        P(0,0,0,0,0,0,0,0,0);
    }
    else if( gray < .375 ) // ,
    {
        P(11,0,0,0,0,0,0,0,0);
        P(10,0,0,0,0,0,0,0,0);
        P(9,0,0,0,0,0,0,0,0);
        P(8,0,0,0,0,0,0,0,0);
        P(7,0,0,0,0,0,0,0,0);
        P(6,0,0,0,0,0,0,0,0);
        P(5,0,0,0,0,0,0,0,0);
        P(4,0,0,0,1,1,0,0,0);
        P(3,0,0,0,1,1,0,0,0);
        P(2,0,0,0,0,1,0,0,0);
        P(1,0,0,0,1,0,0,0,0);
        P(0,0,0,0,0,0,0,0,0);
    }
    else if( gray < .5 ) // -
    {
        P(11,0,0,0,0,0,0,0,0);
        P(10,0,0,0,0,0,0,0,0);
        P(9,0,0,0,0,0,0,0,0);
        P(8,0,0,0,0,0,0,0,0);
        P(7,0,0,0,0,0,0,0,0);
        P(6,1,1,1,1,1,1,1,0);
        P(5,0,0,0,0,0,0,0,0);
        P(4,0,0,0,0,0,0,0,0);
        P(3,0,0,0,0,0,0,0,0);
        P(2,0,0,0,0,0,0,0,0);
        P(1,0,0,0,0,0,0,0,0);
        P(0,0,0,0,0,0,0,0,0);
    }
    else if(gray < .625 ) // +
    {
        P(11,0,0,0,0,0,0,0,0);
        P(10,0,0,0,0,0,0,0,0);
        P(9,0,0,0,1,0,0,0,0);
        P(8,0,0,0,1,0,0,0,0);
        P(7,0,0,0,1,0,0,0,0);
        P(6,1,1,1,1,1,1,1,0);
        P(5,0,0,0,1,0,0,0,0);
        P(4,0,0,0,1,0,0,0,0);
        P(3,0,0,0,1,0,0,0,0);
        P(2,0,0,0,0,0,0,0,0);
        P(1,0,0,0,0,0,0,0,0);
        P(0,0,0,0,0,0,0,0,0);
    }
    else if(gray < .75 ) // *
    {
        P(11,0,0,0,0,0,0,0,0);
        P(10,0,0,0,1,0,0,0,0);
        P(9,1,0,0,1,0,0,1,0);
        P(8,0,1,0,1,0,1,0,0);
        P(7,0,0,1,1,1,0,0,0);
        P(6,0,0,0,1,0,0,0,0);
        P(5,0,0,1,1,1,0,0,0);
        P(4,0,1,0,1,0,1,0,0);
        P(3,1,0,0,1,0,0,1,0);
        P(2,0,0,0,1,0,0,0,0);
        P(1,0,0,0,0,0,0,0,0);
        P(0,0,0,0,0,0,0,0,0);
    }
    else if(gray < .875 ) // #
    {
        P(11,0,0,0,0,0,0,0,0);
        P(10,0,0,1,0,0,1,0,0);
        P(9,0,0,1,0,0,1,0,0);
        P(8,1,1,1,1,1,1,1,0);
        P(7,0,0,1,0,0,1,0,0);
        P(6,0,0,1,0,0,1,0,0);
        P(5,0,1,0,0,1,0,0,0);
        P(4,0,1,0,0,1,0,0,0);
        P(3,1,1,1,1,1,1,1,0);
        P(2,0,1,0,0,1,0,0,0);
        P(1,0,1,0,0,1,0,0,0);
        P(0,0,0,0,0,0,0,0,0);
    }
    else // @
    {
        P(11,0,0,0,0,0,0,0,0);
        P(10,0,0,1,1,1,1,0,0);
        P(9,0,1,0,0,0,0,1,0);
        P(8,1,0,0,0,1,1,1,0);
        P(7,1,0,0,1,0,0,1,0);
        P(6,1,0,0,1,0,0,1,0);
        P(5,1,0,0,1,0,0,1,0);
        P(4,1,0,0,1,0,0,1,0);
        P(3,1,0,0,1,1,1,1,0);
        P(2,0,1,0,0,0,0,0,0);
        P(1,0,0,1,1,1,1,1,0);
        P(0,0,0,0,0,0,0,0,0);
    }

  vec3 col = grayTextureColor.xyz/max(grayTextureColor.x,max(grayTextureColor.y,grayTextureColor.z));
  //get vec4 color hash index
  vec4 index = texture2D(image, imageCoord);
  //TODO goal: get symboll form hash index
  gl_FragColor = debug ? index : texture2D(symboll, symbolCoord) * vVertexColor;
}