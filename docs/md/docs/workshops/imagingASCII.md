# Image and video processing

Para esta sección se desarrolló un programa que, basado en la escala de grises de una imagen, calcula el nivel de intensidad de cada pixel, y basado en ello dibuja en el lienzo un caracter ASCII con un nivel de intensidad similar (de forma intuitiva se entiende que un caracter como "@" tiene más intensidad que otro como ".")

## Arte ASCII


> :P5 width=350, height=450
>
> let img;
> function preload(){
>   img = loadImage('/vc/docs/sketches/tree.jpg');
>}
> function setup() {
>   createCanvas(350, 450);
>   image(img, 0, 0,width,height);
> }


> :P5 width=350, height=450
>
>let img;
>let total = 0;
>
>
>function preload() {
> img = loadImage('/vc/docs/sketches/tree.jpg');
>}
>function setup() {
>  createCanvas(350,450);
>  background(255);
>  fill(0);
>  textFont("Courier", 6);
>  img.resize(width,height);
>  img.filter(GRAY);
>  img.loadPixels();
>  
>  let i = 0;
>  
>  for (let y = 0; y < height; y += 8) {
>    for (let x = 0; x < width; x += 8) {
>      let pixel = img.pixels[(y * img.width + x)];
>      let r = red(pixel);
>      let g = green(pixel);
>      let b = blue(pixel);
>      total = total + r + g + b;
>      i++;
>    }
>  }
>  
>  total = total / i;
>  for (let y = 0; y < height; y += 2) {
>    for (let x = 0; x < width; x += 2) {
>        let pixel = img.pixels[4*(y * img.width + x)];
>        let r = red(pixel);
>        let g = green(pixel);
>        let b = blue(pixel);
>        let S=r+g+b;
>        S = S/total;
>        if (S<0.15){
>          text("@", x, y);
>        }
>        else if (S<0.30){
>          text("#", x, y);
>        }
>        else if (S<0.45){
>          text("M", x, y);
>        }
>        else if (S<0.60){
>          text("H", x, y);
>        }
>        else if (S<0.75){
>          text("L", x, y);
>        }
>        else if (S<1){
>          text("i", x, y);
>        }
>        else if (S<1.15){
>          text(":", x, y);
>        }
>        else if (S<=1.3){
>          text(".", x, y);
>        }
>    }
>  }
>}
>

Prueba con mayor tamaño de letra:

> :P5 width=1000, height=871
>
>let img;
>let total = 0;
>
>
>function preload() {
> img = loadImage('/vc/docs/sketches/tree.jpg');
>}
>function setup() {
>  createCanvas(1000,871);
>  background(255);
>  fill(0);
>  textFont("Courier", 10);
>  img.resize(width,height);
>  img.filter(GRAY);
>  img.loadPixels();
>  
>  let i = 0;
>  
>  for (let y = 0; y < height; y += 8) {
>    for (let x = 0; x < width; x += 8) {
>      let pixel = img.pixels[(y * img.width + x)];
>      let r = red(pixel);
>      let g = green(pixel);
>      let b = blue(pixel);
>      total = total + r + g + b;
>      i++;
>    }
>  }
>  
>  total = total / i;
>  for (let y = 0; y < height; y += 8) {
>    for (let x = 0; x < width; x += 8) {
>        let pixel = img.pixels[4*(y * img.width + x)];
>        let r = red(pixel);
>        let g = green(pixel);
>        let b = blue(pixel);
>        let S=r+g+b;
>        S = S/total;
>        if (S<0.15){
>          text("@", x, y);
>        }
>        else if (S<0.30){
>          text("#", x, y);
>        }
>        else if (S<0.45){
>          text("M", x, y);
>        }
>        else if (S<0.60){
>          text("H", x, y);
>        }
>        else if (S<0.75){
>          text("L", x, y);
>        }
>        else if (S<1){
>          text("i", x, y);
>        }
>        else if (S<1.15){
>          text(":", x, y);
>        }
>        else if (S<=1.3){
>          text(".", x, y);
>        }
>    }
>  }
>}


> :ToCPrevNext
