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
  red = grayTextureColor.r
  green = grayTextureColor.g
  blue = grayTextureColor.b
  r_norm = red/255
  g_norm = green/255
  b_norm = blue/255
  r_prim = 255 * pow((r_norm),(1/2.2));
  g_prim = 255 * pow((g_norm),(1/2.2));
  b_prim = 255 * pow((b_norm),(1/2.2));
  gray = (r_prim*0.299 + g_prim*0.587 + b_prim*0.0114);
  grayTextureColor.r = gray;
  grayTextureColor.g = gray;
  grayTextureColor.b = gray;
  grayTextureColor.a = 1.0;

  gl_FragColor = grayTextureColor * vVertexColor;  
}