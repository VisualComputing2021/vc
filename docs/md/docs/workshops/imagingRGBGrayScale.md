# Image and video processing

## Gama de grises

Para esta sección se desarrolló un programa que genera la gama de grises de una imagen calculando el promedio de los valores de rojo, verde y azul para cada pixel; posteriormente se reemplaza cada valor rgb por dicho promedio.
 
p5js también posee una función diseñada para obtener este mismo resultado, la cual fue empleada para obtener la escala de grises de un video.

### Usando Promedio RGB
> :Tabs
> > :Tab title=Presentación
> > >
> > > :P5 width=350, height=450
> > >
> > > let img;
> > > function preload(){
> > >   img = loadImage('/vc/docs/sketches/Stormlight.jpg');
> > >}
> > > function setup() {
> > >   createCanvas(350, 450);
> > >   image(img, 0, 0,width,height);
> > > }
> >
> > > :P5 width=350, height=450
> > >
> > > let img;
> > > let img2
> > > function preload(){
> > >   img = loadImage('/vc/docs/sketches/Stormlight.jpg');
> > >}
> > > function setup() {
> > >   createCanvas(350, 450);
> > >   image(img, 0, 0,width,height);
> > >   let d = pixelDensity();
> > >   loadPixels();
> > >   let numPixels = 8 * (width * d) * (height / 2 * d);
> > >   for (let i = 0; i < numPixels; i += 4) {
> > >      let r = red(pixels[i]);
> > >      let g = green(pixels[i]);
> > >      let b = blue(pixels[i]);
> > >      let gray = (r+b+g)/3;
> > >      let grayColor = color(gray, gray, gray);
> > >      pixels[i] = red(grayColor);
> > >      pixels[i + 1] = green(grayColor);
> > >      pixels[i + 2] = blue(grayColor);
> > >    }
> > >   updatePixels();
> > > }
>
> > :Tab title=P5Code
> >
> > <center>IMAGEN ORIGINAL<center/>
> >
> > ```js
> > > :P5 width=350, height=450
> > >
> > > let img;
> > > function preload(){
> > >   img = loadImage('/vc/docs/sketches/Stormlight.jpg');
> > >}
> > > function setup() {
> > >   createCanvas(350, 450);
> > >   image(img, 0, 0,width,height);
> > > }
> > ```
> > <center>IMAGEN BLANCO Y NEGRO<center/>
> >
> > ```js
> > > :P5 width=350, height=450
> > >
> > > let img;
> > > let img2
> > > function preload(){
> > >   img = loadImage('/vc/docs/sketches/Stormlight.jpg');
> > >}
> > > function setup() {
> > >   createCanvas(350, 450);
> > >   image(img, 0, 0,width,height);
> > >   let d = pixelDensity();
> > >   loadPixels();
> > >   let numPixels = 8 * (width * d) * (height / 2 * d);
> > >   for (let i = 0; i < numPixels; i += 4) {
> > >      let r = red(pixels[i]);
> > >      let g = green(pixels[i]);
> > >      let b = blue(pixels[i]);
> > >      let gray = (r+b+g)/3;
> > >      let grayColor = color(gray, gray, gray);
> > >      pixels[i] = red(grayColor);
> > >      pixels[i + 1] = green(grayColor);
> > >      pixels[i + 2] = blue(grayColor);
> > >    }
> > >   updatePixels();
> > > }
> > ```

### Gama de grises en video


> :Tabs
> > :Tab title=Presentación
> > >
> > > :P5 width=350, height=250
> > >
> > >let vid;
> > >function setup() {
> > >  noCanvas();
> > >
> > >  vid = createVideo(
> > >    ['/vc/docs/sketches/youWinTheInternet.mp4'],
> > >    vidLoad
> > >  );
> > >
> > >  vid.size(350, 250);
> > >}
> > >
> > >// This function is called when the video loads
> > >function vidLoad() {
> > >  vid.loop();
> > >  vid.volume(0);
> > >}
> > 
> > 
> > > :P5 width=350, height=250
> > >
> > >let vid;
> > >
> > >function setup() {
> > >  createCanvas(350, 250);
> > >  // specify multiple formats for different browsers
> > >  vid = createVideo(['/vc/docs/sketches/youWinTheInternet.mp4']);
> > >  vid.hide();
> > >  vid.loop();
> > >}
> > >
> > >function draw() {
> > >  background(0);
> > >  image(vid, 0, 0,350, 250); // draw the video frame to canvas
> > >  filter(GRAY);
> > >}
>
> > :Tab title=P5Code
> >
> > <center>VIDEO ORIGINAL<center/>
> >
> > ```js
> > > :P5 width=350, height=250
> > >
> > >let vid;
> > >function setup() {
> > >  noCanvas();
> > >
> > >  vid = createVideo(
> > >    ['/vc/docs/sketches/youWinTheInternet.mp4'],
> > >    vidLoad
> > >  );
> > >
> > >  vid.size(350, 250);
> > >}
> > >
> > >// This function is called when the video loads
> > >function vidLoad() {
> > >  vid.loop();
> > >  vid.volume(0);
> > >}
> > ```
> > <center>VIDEO EN BLANCO Y NEGRO<center/>
> >
> > ```js 
> > > :P5 width=350, height=250
> > >
> > >let vid;
> > >
> > >function setup() {
> > >  createCanvas(350, 250);
> > >  // specify multiple formats for different browsers
> > >  vid = createVideo(['/vc/docs/sketches/youWinTheInternet.mp4']);
> > >  vid.hide();
> > >  vid.loop();
> > >}
> > >
> > >function draw() {
> > >  background(0);
> > >  image(vid, 0, 0,350, 250); // draw the video frame to canvas
> > >  filter(GRAY);
> > >}
> > ```

> :ToCPrevNext