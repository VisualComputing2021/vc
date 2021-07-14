# Image and video processing

Para esta sección se desarrolló un programa para generar el negativo de una imagen. Para ello se reemplazó los valores rgb de cada pixel por su negativo, es decir:


> :Formula align=center
> ```
> r := 255 - r
> ```
> g := 255 - g
> ```
> b := 255 - b
> ```

## Negativo en imágenes

> :Tabs
> > :Tab title=Presentación
> > >
> > > :P5 width=350, height=450
> > >
> > > let img;
> > > function preload(){
> > >   img = loadImage('/vc/docs/sketches/movie.jpg');   
> > >}
> > > function setup() {
> > >   createCanvas(350, 450);
> > >   image(img, 0, 0,width,height);
> > > }
> > 
> > 
> > > :P5 width=350, height=450
> > >
> > > let img;
> > > function preload(){
> > >   img = loadImage('/vc/docs/sketches/movie.jpg');   
> > >}
> > > function setup() {
> > >   createCanvas(350, 450);
> > >   image(img, 0, 0,width,height);
> > >   let d = pixelDensity();
> > >   loadPixels();
> > >   let numPixels = 8 * (width * d) * (height / 2 * d);
> > >   for (let i = 0; i < numPixels; i += 4) {
> > >      //pixels[i] = red(pink);
> > >      let r = red(pixels[i]);
> > >      let g = green(pixels[i]);
> > >      let b = blue(pixels[i]);
> > >      let negative = color(255 - r, 255 - g, 255 - b);
> > >      pixels[i] = red(negative);
> > >      pixels[i + 1] = green(negative);
> > >      pixels[i + 2] = blue(negative);
> > >    }
> > >   updatePixels();
> > > }
>
> > :Tab title=P5Code
> >
> > <center>IMAGEN EN NEGATIVO<center/>
> >
> > ```js
> > > :P5 width=350, height=450
> > >
> > > let img;
> > > function preload(){
> > >   img = loadImage('/vc/docs/sketches/movie.jpg');   
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
> > >      let negative = color(255 - r, 255 - g, 255 - b);
> > >      pixels[i] = red(negative);
> > >      pixels[i + 1] = green(negative);
> > >      pixels[i + 2] = blue(negative);
> > >    }
> > >   updatePixels();
> > > }
> > ```
## Negativo en videos

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
> > >       let negative = color(255 - r, 255 - g, 255 - b);
> > >       pixels[index] = red(negative);
> > >       pixels[index + 1] = green(negative);
> > >       pixels[index + 2] = blue(negative);
> > >      }
> > >  }
> > >  updatePixels();
> > >}
>
> > :Tab title=P5Code
> >
> > <center>VIDEO EN NEGATIVO<center/>
> >
> > ```js
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
> > >       let negative = color(255 - r, 255 - g, 255 - b);
> > >       pixels[index] = red(negative);
> > >       pixels[index + 1] = green(negative);
> > >       pixels[index + 2] = blue(negative);
> > >      }
> > >  }
> > >  updatePixels();
> > >}
> > ```

>:ToCPrevNext