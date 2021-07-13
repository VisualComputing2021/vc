// texture.frag 
precision mediump float;

uniform sampler2D texture;

// interpolated color (same name as in vertex shader)
varying vec4 vVertexColor;

vec4 grayTextureColor;
float gray;
float red;
float blue;
float r_norm;
float g_norm;
float b_norm;
float r_prim;
float g_prim;
float b_prim;
// interpolated texcoord (same name as in vertex shader)
varying vec2 vTexCoord;

void main() {
  
  grayTextureColor = texture2D(texture, vTexCoord);
  red = grayTextureColor.r;
  r_norm = red/255.0;
  r_prim = 255.0 * pow(r_norm,0.45);
  g_prim = 255.0 * pow(r_norm,0.45);
  b_prim = 255.0 * pow(r_norm,0.45);
  gray = (r_prim*0.299 + g_prim*0.587 + b_prim*0.0114);
  grayTextureColor.r = gray;
  grayTextureColor.g = gray;
  grayTextureColor.b = gray;
  grayTextureColor.a = 1.0;

  gl_FragColor = grayTextureColor * vVertexColor;  
}
