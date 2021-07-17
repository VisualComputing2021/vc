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
> 
> > :Tab title=Luma Ponderado
> > >
> > > :P5 sketch=/docs/sketches/LumaShader/Luma_Ponderado/TextureShader.js, width=400, height=400
> 
> > :Tab title=Luma Normalizado
> > >
> > > :P5 sketch=/docs/sketches/LumaShader/Luma_Normalizado/TextureShader.js, width=400, height=400
> >

## VideoLuma

El reto aquí es poder enviar un video a la textura ya que está solo recibe imagenes, la solución la encontramos con el parametro setUniform del shader pasandole como parametro, la textura y el video, y el alto y el ancho de la misma como lo veremos en la presentación del código.

> :Tabs
> > :Tab title=Video Luma
> > >
> > > :P5 sketch=/docs/sketches/LumaShader/Luma_Video/TextureShader.js, width=400, height=400
> 

> :ToCPrevNext
