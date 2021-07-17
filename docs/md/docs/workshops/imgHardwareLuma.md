<style TYPE="text/css">
code.has-jax {font: inherit; font-size: 100%; background: inherit; border: inherit;}
</style>
<script type="text/x-mathjax-config">
MathJax.Hub.Config({
    tex2jax: {
        inlineMath: [['$','$'], ['\\(','\\)']],
        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'] // removed 'code' entry
    }
});
MathJax.Hub.Queue(function() {
    var all = MathJax.Hub.getAllJax(), i;
    for(i = 0; i < all.length; i += 1) {
        all[i].SourceElement().parentNode.className += ' has-jax';
    }
});
</script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML-full"></script>

# Gama de grises usando Luma

## Imagen

Mediante el canvas 3d que proporciona WEBGL se genera una figura rectangular a partir de cuatro vértices. Esta figura va a servir como "marco" para contener la imagen que se quiere mostrar. La imagen se define como una textura que se va aplicar al rectángulo.

Al igual que el anterior metodo de RGB aqui usamos la variable varying vTexCoord  para poder acceder a las coordenadas, y posteriormente el color de cada texel de la imagen y luego poder operar sobre él haciendo un promedio ponderado en el primer de los casos con la fórmula \\[ r * 0.299 + g * 0.587 + b * 0.0114 \\] de los valores de cada canal rgb y asignándoselo al fragmento (pixel) correspondiente y luego en el LUMA normalizado usando \\[ r' * 0.299 + g' * 0.587 + b' * 0.0114 \\] dónde \\[ r' = 255 * ( \frac{r}{255}) ^ {1/2.2} \\] \\[ g' = 255 * ( \frac{g}{255}) ^ {1/2.2} \\] \\[ b' = 255 * ( \frac{b}{255}) ^ {1/2.2} \\].

> :Tabs
> > :Tab title=Imagen Original
> > >
> > > :P5 width=400, height=400
> > >
> > > let img;
> > > function preload(){
> > >   img = loadImage('/vc/docs/sketches/LumaShader/Luma_Normalizado/DeepMind.jpg');
> > >}
> > > function setup() {
> > >   createCanvas(400, 400);
> > >   image(img, 0, 0,width,height);
> > > }
> >
> 
> > :Tab title=Luma Ponderado
> > >
> > > :P5 sketch=/docs/sketches/LumaShader/Luma_Ponderado/TextureShader.js, width=400, height=400
> 
> > :Tab title=Codigo GLSL Ponderado
> >
> > ```glsl
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
  gray = (grayTextureColor.r*0.299 + grayTextureColor.g*0.587 + grayTextureColor.b*0.0114);
  grayTextureColor.r = gray;
  grayTextureColor.g = gray;
  grayTextureColor.b = gray;
  grayTextureColor.a = 1.0;
  gl_FragColor = grayTextureColor * vVertexColor;  
}
> > ```
>
> > :Tab title=Luma Normalizado
> > >
> > > :P5 sketch=/docs/sketches/LumaShader/Luma_Normalizado/TextureShader.js, width=400, height=400
> 
> > :Tab title=Codigo GLSL Normalizado
> >
> > ```glsl
// texture.frag 
precision mediump float;
uniform sampler2D texture;
// interpolated color (same name as in vertex shader)
varying vec4 vVertexColor;
vec4 grayTextureColor;
float gray;
float red;
float gr;
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
  g_norm = gr/255.0;
  b_norm = blue/255.0;
  r_prim = 255.0 * pow(r_norm,0.45);
  g_prim = 255.0 * pow(g_norm,0.45);
  b_prim = 255.0 * pow(b_norm,0.45);
  gray = (r_prim*0.299 + g_prim*0.587 + b_prim*0.0114);
  grayTextureColor.r = gray;
  grayTextureColor.g = gray;
  grayTextureColor.b = gray;
  grayTextureColor.a = 1.0;
  gl_FragColor = grayTextureColor * vVertexColor;  
}
> > ```
>

## VideoLuma

El reto aquí es poder enviar un video a la textura ya que está solo recibe imagenes, la solución la encontramos con el parametro setUniform del shader pasandole como parametro, la textura y el video, y el alto y el ancho de la misma como lo veremos en la presentación del código.

> :Tabs
> > :Tab title=Video Original
> > >
> > > :P5 width=400, height=400
> > >
> > > let vid;
> > >
> > > function setup() {
> > >  noCanvas();
> > >
> > >  vid = createVideo(
> > >    ['/vc/docs/sketches/LumaShader/Luma_Video/SpaceJam.mp4'],
> > >    vidLoad
> > >  );
> > >
> > >  vid.size(400, 400);
> > >}
> > >
> > >// This function is called when the video loads
> > > function vidLoad() {
> > >  vid.loop();
> > >  vid.volume(0);
> > >} 
>
> > :Tab title=Video Luma
> > >
> > > :P5 sketch=/docs/sketches/LumaShader/Luma_Video/TextureShader.js, width=400, height=400
>
> > :Tab title=P5Code
> >
> > ```js
let theShader;
let video;
let planeSide = 400;
function preload(){
  // load the shader
  theShader = loadShader('/vc/docs/sketches/LumaShader/Luma_Ponderado/texture.vert','/vc/docs/sketches/LumaShader/Luma_Ponderado/texture.frag');
  video = createVideo("/vc/docs/sketches/LumaShader/Luma_Video/SpaceJam.mp4");
}
function setup() {
  // shaders require WEBGL mode to work
  createCanvas(400, 400, WEBGL);
  video.loop();
  video.hide();
  video.volume(0);
  noStroke();
  shader(theShader)
  textureMode(NORMAL);
  shader(theShader);
  // here we're using setUniform() to send our uniform values to the shader
}
function draw() {
  background(255);
  beginShape();
  vertex(-planeSide/2, -planeSide/2, 0, 0); // esquina inferior izquierda
  vertex(planeSide/2, -planeSide/2, 1, 0); // esquina inferior derecha
  vertex(planeSide/2, planeSide/2, 1, 1); // esquina superior derecha
  vertex(-planeSide/2, planeSide/2, 0, 1); // esquina superior izquierda
  endShape(CLOSE);
  theShader.setUniform("texture", video);
  theShader.setUniform("textureWidth", 400.0);
  theShader.setUniform("textureHeight", 400.0)
}
> > ```

> :ToCPrevNext
