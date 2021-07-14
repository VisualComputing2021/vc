# Image and video processing

## Arte ASCII

Para esta sección se desarrolló un programa que, basado en la escala de grises de una imagen, calcula el nivel de intensidad de cada pixel, y basado en ello dibuja en el lienzo un caracter ASCII con un nivel de intensidad similar (de forma intuitiva se entiende que un caracter como "@" tiene más intensidad que otro como ".").

> :Tabs
> > :Tab title=Presentación
> > > :P5 width=350, height=450
> > > 
> > >  let img;
> > >  function preload(){
> > >    img = loadImage('/vc/docs/sketches/tree.jpg');
> > > }
> > >  function setup() {
> > >    createCanvas(350, 450);
> > >    image(img, 0, 0,width,height);
> > >  }
> >
> > > :P5 width=350, height=450
> > >
> > >let img;
> > >let total = 0;
> > >
> > >
> > >function preload() {
> > > img = loadImage('/vc/docs/sketches/tree.jpg');
> > >}
> > >function setup() {
> > >  createCanvas(350,450);
> > >  background(255);
> > >  fill(0);
> > >  textFont("Courier", 6);
> > >  img.resize(width,height);
> > >  img.filter(GRAY);
> > >  img.loadPixels();
> > >  
> > >  let i = 0;
> > >  
> > >  for (let y = 0; y < height; y += 8) {
> > >    for (let x = 0; x < width; x += 8) {
> > >      let pixel = img.pixels[(y * img.width + x)];
> > >      let r = red(pixel);
> > >      let g = green(pixel);
> > >      let b = blue(pixel);
> > >      total = total + r + g + b;
> > >      i++;
> > >    }
> > >  }
> > >  
> > >  total = total / i;
> > >  for (let y = 0; y < height; y += 2) {
> > >    for (let x = 0; x < width; x += 2) {
> > >        let pixel = img.pixels[4*(y * img.width + x)];
> > >        let r = red(pixel);
> > >        let g = green(pixel);
> > >        let b = blue(pixel);
> > >        let S=r+g+b;
> > >        S = S/total;
> > >        if (S<0.15){
> > >          text("@", x, y);
> > >        }
> > >        else if (S<0.30){
> > >          text("#", x, y);
> > >        }
> > >        else if (S<0.45){
> > >          text("M", x, y);
> > >        }
> > >        else if (S<0.60){
> > >          text("H", x, y);
> > >        }
> > >        else if (S<0.75){
> > >          text("L", x, y);
> > >        }
> > >        else if (S<1){
> > >          text("i", x, y);
> > >        }
> > >        else if (S<1.15){
> > >          text(":", x, y);
> > >        }
> > >        else if (S<=1.3){
> > >          text(".", x, y);
> > >        }
> > >    }
> > >  }
> > >}
>
> > :Tab title=P5Code
> > ```js
> > > :P5 width=350, height=450
> > > 
> > >  let img;
> > >  function preload(){
> > >    img = loadImage('/vc/docs/sketches/tree.jpg');
> > > }
> > >  function setup() {
> > >    createCanvas(350, 450);
> > >    image(img, 0, 0,width,height);
> > >  }
> >
> > > :P5 width=350, height=450
> > >
> > >let img;
> > >let total = 0;
> > >
> > >
> > >function preload() {
> > > img = loadImage('/vc/docs/sketches/tree.jpg');
> > >}
> > >function setup() {
> > >  createCanvas(350,450);
> > >  background(255);
> > >  fill(0);
> > >  textFont("Courier", 6);
> > >  img.resize(width,height);
> > >  img.filter(GRAY);
> > >  img.loadPixels();
> > >  
> > >  let i = 0;
> > >  
> > >  for (let y = 0; y < height; y += 8) {
> > >    for (let x = 0; x < width; x += 8) {
> > >      let pixel = img.pixels[(y * img.width + x)];
> > >      let r = red(pixel);
> > >      let g = green(pixel);
> > >      let b = blue(pixel);
> > >      total = total + r + g + b;
> > >      i++;
> > >    }
> > >  }
> > >  
> > >  total = total / i;
> > >  for (let y = 0; y < height; y += 2) {
> > >    for (let x = 0; x < width; x += 2) {
> > >        let pixel = img.pixels[4*(y * img.width + x)];
> > >        let r = red(pixel);
> > >        let g = green(pixel);
> > >        let b = blue(pixel);
> > >        let S=r+g+b;
> > >        S = S/total;
> > >        if (S<0.15){
> > >          text("@", x, y);
> > >        }
> > >        else if (S<0.30){
> > >          text("#", x, y);
> > >        }
> > >        else if (S<0.45){
> > >          text("M", x, y);
> > >        }
> > >        else if (S<0.60){
> > >          text("H", x, y);
> > >        }
> > >        else if (S<0.75){
> > >          text("L", x, y);
> > >        }
> > >        else if (S<1){
> > >          text("i", x, y);
> > >        }
> > >        else if (S<1.15){
> > >          text(":", x, y);
> > >        }
> > >        else if (S<=1.3){
> > >          text(".", x, y);
> > >        }
> > >    }
> > >  }
> > >}
> > ```

En la siguiente prueba se puede modificar el tamaño de letra con la slider suministrada en la parte inferior de la imagen.

> :Tabs
> > :Tab title=Presentación
> > > :P5 width=1000, height=891
> > >
> > >let img;
> > >let total = 0;
> > >let fontSize = 3;
> > >let slider;
> > >let showPixel;
> > >let step = 1;
> > >
> > >function preload() {
> > > img = loadImage('/vc/docs/sketches/tree.jpg');
> > >}
> > >
> > >function drawAgain(){
> > >  fontSize = slider.value();
> > >  redraw();
> > >}
> > >
> > >function setup() {
> > >  createCanvas(1000,891);
> > >  background(255);
> > >  fill(0);
> > >
> > >  //Slider Config
> > >  slider = createSlider(3,50,5);
> > >  slider.position(30, height-20);
> > >  slider.style('width', '200px');
> > >  slider.changed(drawAgain);
> > >  showPixel = createElement('h2', 'px '+fontSize);
> > >  showPixel.position(0, height-20);
> > >}
> > >  
> > >function draw() {
> > >
> > >  background(255);
> > >  showPixel.html('px '+fontSize);
> > >  textFont("Courier", fontSize);
> > >
> > >  img.resize(width,height-20);
> > >  img.filter(GRAY);
> > >  img.loadPixels();
> > >
> > >  let i = 0;
> > >  
> > >  for (let y = 0; y < height; y += 8) {
> > >    for (let x = 0; x < width; x += 8) {
> > >      let pixel = img.pixels[(y * img.width + x)];
> > >      let r = red(pixel);
> > >      let g = green(pixel);
> > >      let b = blue(pixel);
> > >      total = total + r + g + b;
> > >      i++;
> > >    }
> > >  }
> > >
> > >  step = (98 / 100) * fontSize;
> > >  step = ceil(step);
> > >  
> > >  total = total / i;
> > >  for (let y = 0; y < height; y += step) {
> > >    for (let x = 0; x < width; x += step) {
> > >        let pixel = img.pixels[4*(y * img.width + x)];
> > >        let r = red(pixel);
> > >        let g = green(pixel);
> > >        let b = blue(pixel);
> > >        let S=r+g+b;
> > >        S = S/total;
> > >        if (S<0.15){
> > >          text("@", x, y);
> > >        }
> > >        else if (S<0.30){
> > >          text("#", x, y);
> > >        }
> > >        else if (S<0.45){
> > >          text("M", x, y);
> > >        }
> > >        else if (S<0.60){
> > >          text("H", x, y);
> > >        }
> > >        else if (S<0.75){
> > >          text("L", x, y);
> > >        }
> > >        else if (S<1){
> > >          text("i", x, y);
> > >        }
> > >        else if (S<1.15){
> > >          text(":", x, y);
> > >        }
> > >        else if (S<=1.3){
> > >          text(".", x, y);
> > >        }
> > >    }
> > >  }
> > >}
>
> > :Tab title=P5Code
> > ```js
> > > :P5 width=1000, height=891
> > >
> > >let img;
> > >let total = 0;
> > >let fontSize = 3;
> > >let slider;
> > >let showPixel;
> > >let step = 1;
> > >
> > >function preload() {
> > > img = loadImage('/vc/docs/sketches/tree.jpg');
> > >}
> > >
> > >function drawAgain(){
> > >  fontSize = slider.value();
> > >  redraw();
> > >}
> > >
> > >function setup() {
> > >  createCanvas(1000,891);
> > >  background(255);
> > >  fill(0);
> > >
> > >  //Slider Config
> > >  slider = createSlider(3,50,5);
> > >  slider.position(30, height-20);
> > >  slider.style('width', '200px');
> > >  slider.changed(drawAgain);
> > >  showPixel = createElement('h2', 'px '+fontSize);
> > >  showPixel.position(0, height-20);
> > >}
> > >  
> > >function draw() {
> > >
> > >  background(255);
> > >  showPixel.html('px '+fontSize);
> > >  textFont("Courier", fontSize);
> > >
> > >  img.resize(width,height-20);
> > >  img.filter(GRAY);
> > >  img.loadPixels();
> > >
> > >  let i = 0;
> > >  
> > >  for (let y = 0; y < height; y += 8) {
> > >    for (let x = 0; x < width; x += 8) {
> > >      let pixel = img.pixels[(y * img.width + x)];
> > >      let r = red(pixel);
> > >      let g = green(pixel);
> > >      let b = blue(pixel);
> > >      total = total + r + g + b;
> > >      i++;
> > >    }
> > >  }
> > >
> > >  step = (98 / 100) * fontSize;
> > >  step = ceil(step);
> > >  
> > >  total = total / i;
> > >  for (let y = 0; y < height; y += step) {
> > >    for (let x = 0; x < width; x += step) {
> > >        let pixel = img.pixels[4*(y * img.width + x)];
> > >        let r = red(pixel);
> > >        let g = green(pixel);
> > >        let b = blue(pixel);
> > >        let S=r+g+b;
> > >        S = S/total;
> > >        if (S<0.15){
> > >          text("@", x, y);
> > >        }
> > >        else if (S<0.30){
> > >          text("#", x, y);
> > >        }
> > >        else if (S<0.45){
> > >          text("M", x, y);
> > >        }
> > >        else if (S<0.60){
> > >          text("H", x, y);
> > >        }
> > >        else if (S<0.75){
> > >          text("L", x, y);
> > >        }
> > >        else if (S<1){
> > >          text("i", x, y);
> > >        }
> > >        else if (S<1.15){
> > >          text(":", x, y);
> > >        }
> > >        else if (S<=1.3){
> > >          text(".", x, y);
> > >        }
> > >    }
> > >  }
> > >}
> > ```

> :ToCPrevNext
