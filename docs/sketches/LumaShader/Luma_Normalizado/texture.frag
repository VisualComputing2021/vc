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
  float r_norm = red/255.0
  float g_norm = green/255.0
  float b_norm = blue/255.0
  float r_prim = 255.0 * pow(r_norm,0.45);
  float g_prim = 255.0 * pow(g_norm,0.45);
  float b_prim = 255.0 * pow(b_norm,0.45);
  gray = (r_prim*0.299 + g_prim*0.587 + b_prim*0.0114);
  grayTextureColor.r = gray;
  grayTextureColor.g = gray;
  grayTextureColor.b = gray;
  grayTextureColor.a = 1.0;

  gl_FragColor = grayTextureColor * vVertexColor;  
}