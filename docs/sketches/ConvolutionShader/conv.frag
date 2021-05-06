// texture.frag 
precision mediump float;

//uniform variables coming from p5
uniform sampler2D u_texture;
uniform vec2 u_img_unit;
uniform float u_mask[9]; 

// interpolated color (same name as in vertex shader)
varying vec4 vVertexColor;

// interpolated texcoord (same name as in vertex shader)
varying vec2 vTexCoord;

void main() {
  vec2 textureIndexes[9];
  int index = 0;
  textureIndexes[0] = vTexCoord + vec2(-u_img_unit.s, +u_img_unit.t);
  textureIndexes[1] = vTexCoord + vec2(          0.0, +u_img_unit.t);
  textureIndexes[2] = vTexCoord + vec2(+u_img_unit.s, +u_img_unit.t);
  textureIndexes[3] = vTexCoord + vec2(-u_img_unit.s,           0.0);
  textureIndexes[4] = vTexCoord + vec2(          0.0,           0.0);
  textureIndexes[5] = vTexCoord + vec2(+u_img_unit.s,           0.0);
  textureIndexes[6] = vTexCoord + vec2(-u_img_unit.s, -u_img_unit.t);
  textureIndexes[7] = vTexCoord + vec2(          0.0, -u_img_unit.t);
  textureIndexes[8] = vTexCoord + vec2(+u_img_unit.t, -u_img_unit.t);

  vec4 textureValues[9];
  for(int i = 0; i < 9; i++){
    textureValues[i] = texture2D(u_texture, textureIndexes[i]);
  }
  
  vec4 convolution = vec4(0, 0, 0, 0);
  for(int i = 0; i < 9; i++){
    convolution += textureValues[i] * u_mask[i];
  }
  convolution.a = 1.0;
  gl_FragColor = convolution * vVertexColor;  
}