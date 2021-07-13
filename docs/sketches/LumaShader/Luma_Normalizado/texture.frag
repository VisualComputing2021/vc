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