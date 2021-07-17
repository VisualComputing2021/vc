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
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML-full">
</script>

# Image and video processing

A pesar de que el método del promedio rgb produce una escala de grises convincente, no se apega a la manera en que el ojo humano procesa los colores, de hecho, el ojo prioriza unos colores sobre otros, por lo tanto, se busca desarrollar una escala de grises que priorice los colores de una forma similar.

Para ello se usa un promedio ponderado de los valores rgb de cada pixel:

\\[ r * 0.299 + g * 0.587 + b * 0.0114 \\]


### Usando Luma
> :Tabs
> > :Tab title=Presentación
> > > :P5 width=350, height=450
> > >
> > > let img3;
> > > function preload(){
> > >   img3 = loadImage('/vc/docs/sketches/eye-color.jpg');
> > >}
> > > function setup() {
> > >   createCanvas(350, 450);
> > >   image(img3, 0, 0,width,height);
> > > }
> > 
> > > :P5 width=350, height=450
> > >
> > > let img4
> > > function preload(){
> > >   img4 = loadImage('/vc/docs/sketches/eye-color.jpg');
> > >}
> > >
> > > function setup() {
> > >   createCanvas(350, 450);
> > >}
> > >function draw(){
> > >   image(img4, 0, 0,width,height);
> > >   let d = pixelDensity();
> > >   loadPixels();
> > >   let numPixels = 8 * (width * d) * (height / 2 * d);
> > >   
> > >   for (let i = 0; i < numPixels; i += 4) {
> > >      let r = red(pixels[i]);
> > >      let g = green(pixels[i]);
> > >      let b = blue(pixels[i]);
> > >      let y = r *0.299 + g *0.587 + b *0.0114;
> > >      let grayColor = color(y, y, y);
> > >      pixels[i] = red(grayColor);
> > >      pixels[i + 1] = green(grayColor);
> > >      pixels[i + 2] = blue(grayColor);
> > >    }
> > >
> > >   updatePixels();
> > > }
>
> > :Tab title=P5Code
> >
> > <center>IMAGEN BLANCO Y NEGRO<center/>
> >
> > ```md
> > > :P5 width=350, height=450
> > >
> > > let img4
> > > function preload(){
> > >   img4 = loadImage('/vc/docs/sketches/eye-color.jpg');
> > >}
> > >
> > > function setup() {
> > >   createCanvas(350, 450);
> > >}
> > >function draw(){
> > >   image(img4, 0, 0,width,height);
> > >   let d = pixelDensity();
> > >   loadPixels();
> > >   let numPixels = 8 * (width * d) * (height / 2 * d);
> > >   
> > >   for (let i = 0; i < numPixels; i += 4) {
> > >      let r = red(pixels[i]);
> > >      let g = green(pixels[i]);
> > >      let b = blue(pixels[i]);
> > >      let y = r *0.299 + g *0.587 + b *0.0114;
> > >      let grayColor = color(y, y, y);
> > >      pixels[i] = red(grayColor);
> > >      pixels[i + 1] = green(grayColor);
> > >      pixels[i + 2] = blue(grayColor);
> > >    }
> > >
> > >   updatePixels();
> > > }
> > ```
>


#### Luma Normalizado

En este caso se realiza la ponderación con una versión modificada de cada valor r, g, b

\\[ r' * 0.299 + g' * 0.587 + b' * 0.0114 \\]

Donde

\\[ r' = 255 * ( \frac{r}{255}) ^ {exp} \\]
\\[ g' = 255 * ( \frac{g}{255}) ^ {exp} \\]
\\[ b' = 255 * ( \frac{b}{255}) ^ {exp} \\]

En el código desarrollado se usaron 
\\[ exp = \frac{1}{2.2} , exp = \frac{1}{4} , exp = 4\\]
> :Tabs
> > :Tab title= \\[ 255 * ( \frac{r}{255}) ^ { 1/2.2 } \\]
> > >
> > > :P5 width=350, height=450
> > >
> > > let img4
> > > function preload(){
> > >   img4 = loadImage('/vc/docs/sketches/eye-color.jpg');
> > >}
> > >
> > > function setup() {
> > >   createCanvas(350, 450);
> > >}
> > >
> > >function draw(){
> > >   image(img4, 0, 0,width,height);
> > >   let d = pixelDensity();
> > >   loadPixels();
> > >   let numPixels = 8 * (width * d) * (height / 2 * d);
> > >   
> > >   for (let i = 0; i < numPixels; i += 4) {
> > >      let r = red(pixels[i]);
> > >      let g = green(pixels[i]);
> > >      let b = blue(pixels[i]);
> > >      let r_norm = r/255;
> > >      let g_norm = g/255;
> > >      let b_norm = b/255;
> > >      let r_prim = 255 * Math.pow((r_norm),(1/2.2));
> > >      let g_prim = 255 * Math.pow((g_norm),(1/2.2));
> > >      let b_prim = 255 * Math.pow((b_norm),(1/2.2));
> > >      let y = 0.2999 * r_prim + 0.587 * g_prim + 0.114 * b_prim;
> > >      let grayColor = color(y, y, y);
> > >      pixels[i] = red(grayColor);
> > >      pixels[i + 1] = green(grayColor);
> > >      pixels[i + 2] = blue(grayColor);
> > >    }
> > >
> > >   updatePixels();
> > > }
> 
> > :Tab title= \\[ 255 * ( \frac{r}{255}) ^ { 1/4 } \\]
> > > 
> > > :P5 width=350, height=450
> > >
> > > let img4
> > > function preload(){
> > >   img4 = loadImage('/vc/docs/sketches/eye-color.jpg');
> > >}
> > >
> > > function setup() {
> > >   createCanvas(350, 450);
> > >}
> > >
> > >function draw(){
> > >   image(img4, 0, 0,width,height);
> > >   let d = pixelDensity();
> > >   loadPixels();
> > >   let numPixels = 8 * (width * d) * (height / 2 * d);
> > >   
> > >   for (let i = 0; i < numPixels; i += 4) {
> > >      let r = red(pixels[i]);
> > >      let g = green(pixels[i]);
> > >      let b = blue(pixels[i]);
> > >      let r_norm = r/255;
> > >      let g_norm = g/255;
> > >      let b_norm = b/255;
> > >      let r_prim = 255 * Math.pow((r_norm),(1/4));
> > >      let g_prim = 255 * Math.pow((g_norm),(1/4));
> > >      let b_prim = 255 * Math.pow((b_norm),(1/4));
> > >      let y = 0.2999 * r_prim + 0.587 * g_prim + 0.114 * b_prim;
> > >      let grayColor = color(y, y, y);
> > >      pixels[i] = red(grayColor);
> > >      pixels[i + 1] = green(grayColor);
> > >      pixels[i + 2] = blue(grayColor);
> > >    }
> > >
> > >   updatePixels();
> > > }
> 
> > :Tab title= \\[ 255 * ( \frac{r}{255}) ^ { 4 } \\]
> > >
> > > :P5 width=350, height=450
> > >
> > > let img4
> > > function preload(){
> > >   img4 = loadImage('/vc/docs/sketches/eye-color.jpg');
> > >}
> > >
> > > function setup() {
> > >   createCanvas(350, 450);
> > >}
> > >
> > >function draw(){
> > >   image(img4, 0, 0,width,height);
> > >   let d = pixelDensity();
> > >   loadPixels();
> > >   let numPixels = 8 * (width * d) * (height / 2 * d);
> > >   
> > >   for (let i = 0; i < numPixels; i += 4) {
> > >      let r = red(pixels[i]);
> > >      let g = green(pixels[i]);
> > >      let b = blue(pixels[i]);
> > >      let r_norm = r/255;
> > >      let g_norm = g/255;
> > >      let b_norm = b/255;
> > >      let r_prim = 255 * Math.pow((r_norm),(4));
> > >      let g_prim = 255 * Math.pow((g_norm),(4));
> > >      let b_prim = 255 * Math.pow((b_norm),(4));
> > >      let y = 0.2999 * r_prim + 0.587 * g_prim + 0.114 * b_prim;
> > >      let grayColor = color(y, y, y);
> > >      pixels[i] = red(grayColor);
> > >      pixels[i + 1] = green(grayColor);
> > >      pixels[i + 2] = blue(grayColor);
> > >    }
> > >
> > >   updatePixels();
> > > }
> 


## VideoLuma
> :Tabs
> > :Tab title=Presentación
> > >
> > > :P5 width=350, height=250
> > >
> > > let vid;
> > >
> > > function setup() {
> > >   createCanvas(350, 250);
> > >   vid = createVideo(['/vc/docs/sketches/youWinTheInternet.mp4']);
> > >   vid.hide();
> > >   vid.loop();
> > >}
> > >
> > > function draw() {
> > >  background(0);
> > >  image(vid, 0, 0, 350, 250);
> > >  loadPixels();
> > >  const step = 1;
> > >  for (let y = 0; y < height; y+= step) {
> > >    for (let x = 0; x < width; x+= step) {
> > >       let index = 4 * (x + width * y);
> > >       let r = pixels[index];
> > >       let g = pixels[index + 1];
> > >       let b = pixels[index + 2];
> > >       let gamma = r * 0.299 + g * 0.587 + b * 0.0114;
> > >       let grayColor = color(gamma, gamma, gamma);
> > >       pixels[index] = gamma;
> > >       pixels[index + 1] = gamma;
> > >       pixels[index + 2] = gamma;
> > >      }
> > >  }
> > >  updatePixels();
> > > }
> 
> > :Tab title=Code P5
> > 
> > <center>IMAGEN ORIGINAL<center/>
> >
> > ```md
> > > :P5 width=350, height=250
> > >
> > > let vid;
> > >
> > > function setup() {
> > >   createCanvas(350, 250);
> > >   vid = createVideo(['/vc/docs/sketches/youWinTheInternet.mp4']);
> > >   vid.hide();
> > >   vid.loop();
> > >}
> > >
> > > function draw() {
> > >  background(0);
> > >  image(vid, 0, 0, 350, 250);
> > >  loadPixels();
> > >  const step = 1;
> > >  for (let y = 0; y < height; y+= step) {
> > >    for (let x = 0; x < width; x+= step) {
> > >       let index = 4 * (x + width * y);
> > >       let r = pixels[index];
> > >       let g = pixels[index + 1];
> > >       let b = pixels[index + 2];
> > >       let gamma = r * 0.299 + g * 0.587 + b * 0.0114;
> > >       let grayColor = color(gamma, gamma, gamma);
> > >       pixels[index] = gamma;
> > >       pixels[index + 1] = gamma;
> > >       pixels[index + 2] = gamma;
> > >      }
> > >  }
> > >  updatePixels();
> > > }
> > ```
>

>:ToCPrevNext
