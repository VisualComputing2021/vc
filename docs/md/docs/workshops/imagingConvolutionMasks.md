# Image and video processing

## Máscaras de convolución

Una matriz de convolución o máscara es una matriz pequeña que se utiliza para desenfoque, enfoque, realce, detección de bordes.
Para hacer estos procesamientos se debe realizar una convolución entre un núcleo y una imagen.
El kernel de una imagen es una pequeña matriz cuadrada de tamaño impar que, por medio de la convolución entre el kernel y la imagen, se utiliza para aplicar distintos efectos en la imagen. La convolución es el proceso en el cual se suma cada píxel de la imagen con sus vecinos locales, teniendo en cuenta los pesos indicados por el kernel.

Usando la función general para la convolución:
> :Formula 
> 
>  g(x,y)= \omega * f(x,y) = \sum_{dx=-a}^{a} \sum_{dy=-b}^{b} \omega(dx,dy)f(x + dx, y + dy)


### Máscaras en Imágenes

> :Tabs
> > :Tab title=Original
> > > :P5 width=350, height=450
> > >
> > > let img;
> > > function preload(){
> > >   img = loadImage('/vc/docs/sketches/hushky.jpg');
> > >}
> > > function setup() {
> > >   createCanvas(350, 450);
> > >   image(img, 0, 0,width,height);
> > > }

#### Identidad
Retorna la misma imágen

> :Tabs
> > :Tab title=identidad
> > >:P5  width=350, height=500
> > >
> > >let img;
> > >
> > >let identity = [
> > >   [0, 0, 0],
> > >   [0, 1, 0],
> > >   [0, 0, 0]
> > >];
> > >
> > >function preload() {
> > >   img = loadImage('/vc/docs/sketches/hushky.jpg');
> > >}
> > >
> > > function setup() {
> > >    createCanvas(350, 500);
> > >    img.loadPixels();
> > >}
> > >
> > > function draw() {
> > >   identityImg = createImage(img.width, img.height);
> > >   identityImg.loadPixels();
> > >   for (let x = 1; x < img.width; x++) {
> > >     for (let y = 1; y < img.height; y++) {
> > >        let c = convolution(x, y, identity);
> > >            let index = 4 * (x + img.width * y);
> > >            identityImg.pixels[index] = red(c);
> > >            identityImg.pixels[index + 1] = green(c);
> > >            identityImg.pixels[index + 2] = blue(c);
> > >            identityImg.pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    identityImg.updatePixels();
> > >    image(identityImg, 0, 0,width,height);
> > >}
> > >
> > > function convolution(x, y, matrix) {
> > >    let rtotal = 0;
> > >    let gtotal = 0;
> > >    let btotal = 0;
> > >    for (kx = -1; kx <= 1; kx++) {
> > >        for (ky = -1; ky <= 1; ky++) {
> > >            let xpos = x + kx;
> > >            let ypos = y + ky;
> > >            let r = 0;
> > >            let g = 0;
> > >            let b = 0;
> > >            if ((xpos >= 0 && xpos < img.width) && (ypos >= 0 || ypos < img.height)) {
> > >                let index = 4 * (xpos + img.width * ypos);
> > >                r = img.pixels[index];
> > >                g = img.pixels[index + 1];
> > >                b = img.pixels[index + 2];
> > >            }
> > >            rtotal += matrix[kx + 1][ky + 1] * r;
> > >            gtotal += matrix[kx + 1][ky + 1] * g;
> > >            btotal += matrix[kx + 1][ky + 1] * b;
> > >        }
> > >    }
> > >    rtotal = constrain(rtotal, 0, 255);
> > >    gtotal = constrain(gtotal, 0, 255);
> > >    btotal = constrain(btotal, 0, 255);
> > >    return color(rtotal, gtotal, btotal);
> > >}
> 
> > :Tab title=Kernel 
> > > :Formula
> > >
> > > \begin{pmatrix}
> > > 0 & 0 & 0 `\\`      
> > > 0 & 1 & 0 `\\`
> > > 0 & 0 & 0
> > > \end{pmatrix}
> 
> > :Tab title=P5Code
> > ```js
> > > :P5  width=350, height=500
> > >
> > >let img;
> > >
> > >let identity = [
> > >   [0, 0, 0],
> > >   [0, 1, 0],
> > >   [0, 0, 0]
> > >];
> > >
> > >function preload() {
> > >   img = loadImage('/vc/docs/sketches/hushky.jpg');
> > >}
> > >
> > > function setup() {
> > >    createCanvas(350, 500);
> > >    img.loadPixels();
> > >}
> > >
> > > function draw() {
> > >   identityImg = createImage(img.width, img.height);
> > >   identityImg.loadPixels();
> > >   for (let x = 1; x < img.width; x++) {
> > >     for (let y = 1; y < img.height; y++) {
> > >        let c = convolution(x, y, identity);
> > >            let index = 4 * (x + img.width * y);
> > >            identityImg.pixels[index] = red(c);
> > >            identityImg.pixels[index + 1] = green(c);
> > >            identityImg.pixels[index + 2] = blue(c);
> > >            identityImg.pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    identityImg.updatePixels();
> > >    image(identityImg, 0, 0,width,height);
> > >}
> > >
> > > function convolution(x, y, matrix) {
> > >    let rtotal = 0;
> > >    let gtotal = 0;
> > >    let btotal = 0;
> > >    for (kx = -1; kx <= 1; kx++) {
> > >        for (ky = -1; ky <= 1; ky++) {
> > >            let xpos = x + kx;
> > >            let ypos = y + ky;
> > >            let r = 0;
> > >            let g = 0;
> > >            let b = 0;
> > >            if ((xpos >= 0 && xpos < img.width) && (ypos >= 0 || ypos < img.height)) {
> > >                let index = 4 * (xpos + img.width * ypos);
> > >                r = img.pixels[index];
> > >                g = img.pixels[index + 1];
> > >                b = img.pixels[index + 2];
> > >            }
> > >            rtotal += matrix[kx + 1][ky + 1] * r;
> > >            gtotal += matrix[kx + 1][ky + 1] * g;
> > >            btotal += matrix[kx + 1][ky + 1] * b;
> > >        }
> > >    }
> > >    rtotal = constrain(rtotal, 0, 255);
> > >    gtotal = constrain(gtotal, 0, 255);
> > >    btotal = constrain(btotal, 0, 255);
> > >    return color(rtotal, gtotal, btotal);
> > >}
> > ```


#### Detección de bordes
Identifica los puntos en una imagen digital en la que el brillo de la imagen cambia drásticamente, es decir tiene discontinuidades.

> :Tabs
> > :Tab title=Detección de bordes
> > >
> > >:P5  width=350, height=500
> > >
> > > let img;
> > >
> > > let edgeDetection = [
> > >    [1, 0, -1],
> > >    [0, 0, 0],
> > >    [-1, 0, 1]
> > > ];
> > >
> > > function preload() {
> > >    img = loadImage('/vc/docs/sketches/hushky.jpg');
> > >}
> > >
> > > function setup() {
> > >    createCanvas(350, 500);
> > >    img.loadPixels();
> > >}
> > >
> > > function draw() {
> > >   edgeDetectionImg = createImage(img.width, img.height);
> > >   edgeDetectionImg.loadPixels();
> > >   for (let x = 1; x < img.width; x++) {
> > >     for (let y = 1; y < img.height; y++) {
> > >        let c = convolution(x, y, edgeDetection);
> > >            let index = 4 * (x + img.width * y);
> > >            edgeDetectionImg.pixels[index] = red(c);
> > >            edgeDetectionImg.pixels[index + 1] = green(c);
> > >            edgeDetectionImg.pixels[index + 2] = blue(c);
> > >            edgeDetectionImg.pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    edgeDetectionImg.updatePixels();
> > >    image(edgeDetectionImg, 0, 0,width,height);
> > >}
> > >
> > > function convolution(x, y, matrix) {
> > >    let rtotal = 0;
> > >    let gtotal = 0;
> > >    let btotal = 0;
> > >    for (kx = -1; kx <= 1; kx++) {
> > >        for (ky = -1; ky <= 1; ky++) {
> > >            let xpos = x + kx;
> > >            let ypos = y + ky;
> > >            let r = 0;
> > >            let g = 0;
> > >            let b = 0;
> > >            if ((xpos >= 0 && xpos < img.width) && (ypos >= 0 || ypos < img.height)) {
> > >                let index = 4 * (xpos + img.width * ypos);
> > >                r = img.pixels[index];
> > >                g = img.pixels[index + 1];
> > >                b = img.pixels[index + 2];
> > >            }
> > >            rtotal += matrix[kx + 1][ky + 1] * r;
> > >            gtotal += matrix[kx + 1][ky + 1] * g;
> > >            btotal += matrix[kx + 1][ky + 1] * b;
> > >        }
> > >    }
> > >    rtotal = constrain(rtotal, 0, 255);
> > >    gtotal = constrain(gtotal, 0, 255);
> > >    btotal = constrain(btotal, 0, 255);
> > >    return color(rtotal, gtotal, btotal);
> > >}
> > 
> > > :P5  width=350, height=500
> > >
> > > let img;
> > >
> > > let edgeDetection2 = [
> > >    [0, -1, 0],
> > >    [-1, 4, -1],
> > >    [0, -1, 0]
> > > ];
> > >
> > > function preload() {
> > >    img = loadImage('/vc/docs/sketches/hushky.jpg');
> > >}
> > >
> > > function setup() {
> > >    createCanvas(350, 500);
> > >    img.loadPixels();
> > >}
> > >
> > > function draw() {
> > >   edgeDetection2Img = createImage(img.width, img.height);
> > >   edgeDetection2Img.loadPixels();
> > >   for (let x = 1; x < img.width; x++) {
> > >     for (let y = 1; y < img.height; y++) {
> > >        let c = convolution(x, y, edgeDetection2);
> > >            let index = 4 * (x + img.width * y);
> > >            edgeDetection2Img.pixels[index] = red(c);
> > >            edgeDetection2Img.pixels[index + 1] = green(c);
> > >            edgeDetection2Img.pixels[index + 2] = blue(c);
> > >            edgeDetection2Img.pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    edgeDetection2Img.updatePixels();
> > >    image(edgeDetection2Img, 0, 0,width,height);
> > >}
> > >
> > > function convolution(x, y, matrix) {
> > >    let rtotal = 0;
> > >    let gtotal = 0;
> > >    let btotal = 0;
> > >    for (kx = -1; kx <= 1; kx++) {
> > >        for (ky = -1; ky <= 1; ky++) {
> > >            let xpos = x + kx;
> > >            let ypos = y + ky;
> > >            let r = 0;
> > >            let g = 0;
> > >            let b = 0;
> > >            if ((xpos >= 0 && xpos < img.width) && (ypos >= 0 || ypos < img.height)) {
> > >                let index = 4 * (xpos + img.width * ypos);
> > >                r = img.pixels[index];
> > >                g = img.pixels[index + 1];
> > >                b = img.pixels[index + 2];
> > >            }
> > >            rtotal += matrix[kx + 1][ky + 1] * r;
> > >            gtotal += matrix[kx + 1][ky + 1] * g;
> > >            btotal += matrix[kx + 1][ky + 1] * b;
> > >        }
> > >    }
> > >    rtotal = constrain(rtotal, 0, 255);
> > >    gtotal = constrain(gtotal, 0, 255);
> > >    btotal = constrain(btotal, 0, 255);
> > >    return color(rtotal, gtotal, btotal);
> > >}
> > 
> > > :P5  width=350, height=500
> > >
> > > let img;
> > >
> > > let edgeDetection3 = [
> > >    [-1, -1, -1],
> > >    [-1, 8, -1],
> > >    [-1, -1, -1]
> > > ];
> > >
> > > function preload() {
> > >    img = loadImage('/vc/docs/sketches/hushky.jpg');
> > >}
> > >
> > > function setup() {
> > >    createCanvas(350, 500);
> > >    img.loadPixels();
> > >}
> > >
> > > function draw() {
> > >   edgeDetection3Img = createImage(img.width, img.height);
> > >   edgeDetection3Img.loadPixels();
> > >   for (let x = 1; x < img.width; x++) {
> > >     for (let y = 1; y < img.height; y++) {
> > >        let c = convolution(x, y, edgeDetection3);
> > >            let index = 4 * (x + img.width * y);
> > >            edgeDetection3Img.pixels[index] = red(c);
> > >            edgeDetection3Img.pixels[index + 1] = green(c);
> > >            edgeDetection3Img.pixels[index + 2] = blue(c);
> > >            edgeDetection3Img.pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    edgeDetection3Img.updatePixels();
> > >    image(edgeDetection3Img, 0, 0,width,height);
> > >}
> > >
> > > function convolution(x, y, matrix) {
> > >    let rtotal = 0;
> > >    let gtotal = 0;
> > >    let btotal = 0;
> > >    for (kx = -1; kx <= 1; kx++) {
> > >        for (ky = -1; ky <= 1; ky++) {
> > >            let xpos = x + kx;
> > >            let ypos = y + ky;
> > >            let r = 0;
> > >            let g = 0;
> > >            let b = 0;
> > >            if ((xpos >= 0 && xpos < img.width) && (ypos >= 0 || ypos < img.height)) {
> > >                let index = 4 * (xpos + img.width * ypos);
> > >                r = img.pixels[index];
> > >                g = img.pixels[index + 1];
> > >                b = img.pixels[index + 2];
> > >            }
> > >            rtotal += matrix[kx + 1][ky + 1] * r;
> > >            gtotal += matrix[kx + 1][ky + 1] * g;
> > >            btotal += matrix[kx + 1][ky + 1] * b;
> > >        }
> > >    }
> > >    rtotal = constrain(rtotal, 0, 255);
> > >    gtotal = constrain(gtotal, 0, 255);
> > >    btotal = constrain(btotal, 0, 255);
> > >    return color(rtotal, gtotal, btotal);
> > >}
>
> > :Tab title=Kernels
> > >
> > > :Formula
> > >
> > > \begin{pmatrix}
> > > 1 & 0 & -1 `\\`      
> > > 0 & 0 & 0 `\\`
> > > -1 & 0 & -1
> > > \end{pmatrix}
> > > 
> > > \begin{pmatrix}
> > > 0 & -1 & 0 `\\`      
> > > -1 & 4 & -1 `\\`
> > > 0 & -1 & 0
> > > \end{pmatrix}
> > > 
> > > \begin{pmatrix}
> > > -1 & -1 & -1 `\\`      
> > > -1 & 4 & -1 `\\`
> > > -1 & -1 & -1
> > > \end{pmatrix}
> 
> > :Tab title=P5Code
> > >Solamente se pone un código porque lo único que cambia es el Kernel
> > ```js
> > > :P5  width=350, height=500
> > >
> > > let img;
> > >
> > > let edgeDetection3 = [
> > >    [-1, -1, -1],
> > >    [-1, 8, -1],
> > >    [-1, -1, -1]
> > > ];
> > >
> > > function preload() {
> > >    img = loadImage('/vc/docs/sketches/hushky.jpg');
> > >}
> > >
> > > function setup() {
> > >    createCanvas(350, 500);
> > >    img.loadPixels();
> > >}
> > >
> > > function draw() {
> > >   edgeDetection3Img = createImage(img.width, img.height);
> > >   edgeDetection3Img.loadPixels();
> > >   for (let x = 1; x < img.width; x++) {
> > >     for (let y = 1; y < img.height; y++) {
> > >        let c = convolution(x, y, edgeDetection3);
> > >            let index = 4 * (x + img.width * y);
> > >            edgeDetection3Img.pixels[index] = red(c);
> > >            edgeDetection3Img.pixels[index + 1] = green(c);
> > >            edgeDetection3Img.pixels[index + 2] = blue(c);
> > >            edgeDetection3Img.pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    edgeDetection3Img.updatePixels();
> > >    image(edgeDetection3Img, 0, 0,width,height);
> > >}
> > >
> > > function convolution(x, y, matrix) {
> > >    let rtotal = 0;
> > >    let gtotal = 0;
> > >    let btotal = 0;
> > >    for (kx = -1; kx <= 1; kx++) {
> > >        for (ky = -1; ky <= 1; ky++) {
> > >            let xpos = x + kx;
> > >            let ypos = y + ky;
> > >            let r = 0;
> > >            let g = 0;
> > >            let b = 0;
> > >            if ((xpos >= 0 && xpos < img.width) && (ypos >= 0 || ypos < img.height)) {
> > >                let index = 4 * (xpos + img.width * ypos);
> > >                r = img.pixels[index];
> > >                g = img.pixels[index + 1];
> > >                b = img.pixels[index + 2];
> > >            }
> > >            rtotal += matrix[kx + 1][ky + 1] * r;
> > >            gtotal += matrix[kx + 1][ky + 1] * g;
> > >            btotal += matrix[kx + 1][ky + 1] * b;
> > >        }
> > >    }
> > >    rtotal = constrain(rtotal, 0, 255);
> > >    gtotal = constrain(gtotal, 0, 255);
> > >    btotal = constrain(btotal, 0, 255);
> > >    return color(rtotal, gtotal, btotal);
> > >}
> > ```

#### Enfocar

Incrementa el contraste entre lasr regiones brillantes y oscuras para resaltar las características

> :Tabs
> > :Tab title=Enfoque
> > > :P5  width=350, height=500
> > >
> > > let img;
> > >
> > > let sharpen = [
> > >    [0, -1, 0],
> > >    [-1, 5, -1],
> > >    [0, -1, 0]
> > > ];
> > >
> > > function preload() {
> > >    img = loadImage('/vc/docs/sketches/hushky.jpg');
> > >}
> > >
> > > function setup() {
> > >    createCanvas(350, 500);
> > >    img.loadPixels();
> > >}
> > >
> > > function draw() {
> > >   sharpenImg = createImage(img.width, img.height);
> > >   sharpenImg.loadPixels();
> > >   for (let x = 1; x < img.width; x++) {
> > >     for (let y = 1; y < img.height; y++) {
> > >        let c = convolution(x, y, sharpen);
> > >            let index = 4 * (x + img.width * y);
> > >            sharpenImg.pixels[index] = red(c);
> > >            sharpenImg.pixels[index + 1] = green(c);
> > >            sharpenImg.pixels[index + 2] = blue(c);
> > >            sharpenImg.pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    sharpenImg.updatePixels();
> > >    image(sharpenImg, 0, 0,width,height);
> > >}
> > >
> > > function convolution(x, y, matrix) {
> > >    let rtotal = 0;
> > >    let gtotal = 0;
> > >    let btotal = 0;
> > >    for (kx = -1; kx <= 1; kx++) {
> > >        for (ky = -1; ky <= 1; ky++) {
> > >            let xpos = x + kx;
> > >            let ypos = y + ky;
> > >            let r = 0;
> > >            let g = 0;
> > >            let b = 0;
> > >            if ((xpos >= 0 && xpos < img.width) && (ypos >= 0 || ypos < img.height)) {
> > >                let index = 4 * (xpos + img.width * ypos);
> > >                r = img.pixels[index];
> > >                g = img.pixels[index + 1];
> > >                b = img.pixels[index + 2];
> > >            }
> > >            rtotal += matrix[kx + 1][ky + 1] * r;
> > >            gtotal += matrix[kx + 1][ky + 1] * g;
> > >            btotal += matrix[kx + 1][ky + 1] * b;
> > >        }
> > >    }
> > >    rtotal = constrain(rtotal, 0, 255);
> > >    gtotal = constrain(gtotal, 0, 255);
> > >    btotal = constrain(btotal, 0, 255);
> > >    return color(rtotal, gtotal, btotal);
> > >}
> 
> > :Tab title=Kernel
> > >
> > > :Formula
> > > 
> > > \begin{pmatrix}
> > > 0 & -1 & 0 `\\`      
> > > -1 & 5 & -1 `\\`
> > > 0 & -1 & 0
> > > \end{pmatrix}
>
> > :Tab title=P5Code
> > ```js
> > > :P5  width=350, height=500
> > >
> > > let img;
> > >
> > > let sharpen = [
> > >    [0, -1, 0],
> > >    [-1, 5, -1],
> > >    [0, -1, 0]
> > > ];
> > >
> > > function preload() {
> > >    img = loadImage('/vc/docs/sketches/hushky.jpg');
> > >}
> > >
> > > function setup() {
> > >    createCanvas(350, 500);
> > >    img.loadPixels();
> > >}
> > >
> > > function draw() {
> > >   sharpenImg = createImage(img.width, img.height);
> > >   sharpenImg.loadPixels();
> > >   for (let x = 1; x < img.width; x++) {
> > >     for (let y = 1; y < img.height; y++) {
> > >        let c = convolution(x, y, sharpen);
> > >            let index = 4 * (x + img.width * y);
> > >            sharpenImg.pixels[index] = red(c);
> > >            sharpenImg.pixels[index + 1] = green(c);
> > >            sharpenImg.pixels[index + 2] = blue(c);
> > >            sharpenImg.pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    sharpenImg.updatePixels();
> > >    image(sharpenImg, 0, 0,width,height);
> > >}
> > >
> > > function convolution(x, y, matrix) {
> > >    let rtotal = 0;
> > >    let gtotal = 0;
> > >    let btotal = 0;
> > >    for (kx = -1; kx <= 1; kx++) {
> > >        for (ky = -1; ky <= 1; ky++) {
> > >            let xpos = x + kx;
> > >            let ypos = y + ky;
> > >            let r = 0;
> > >            let g = 0;
> > >            let b = 0;
> > >            if ((xpos >= 0 && xpos < img.width) && (ypos >= 0 || ypos < img.height)) {
> > >                let index = 4 * (xpos + img.width * ypos);
> > >                r = img.pixels[index];
> > >                g = img.pixels[index + 1];
> > >                b = img.pixels[index + 2];
> > >            }
> > >            rtotal += matrix[kx + 1][ky + 1] * r;
> > >            gtotal += matrix[kx + 1][ky + 1] * g;
> > >            btotal += matrix[kx + 1][ky + 1] * b;
> > >        }
> > >    }
> > >    rtotal = constrain(rtotal, 0, 255);
> > >    gtotal = constrain(gtotal, 0, 255);
> > >    btotal = constrain(btotal, 0, 255);
> > >    return color(rtotal, gtotal, btotal);
> > >}
> > ```

#### Desenfoque de cuadro
Asigna a cada pixel un valor igual al valor promedio de los pixeles que lo rodean.

> :Tabs
> > :Tab title=Desenfoque de cuadro
> > > :P5  width=350, height=500
> > >
> > > let img;
> > >
> > > let boxBlur= [
> > >    [1.0 / 9.0, 1.0 / 9.0, 1.0 / 9.0],
> > >    [1.0 / 9.0, 1.0 / 9.0, 1.0 / 9.0],
> > >    [1.0 / 9.0, 1.0 / 9.0, 1.0 / 9.0]
> > > ];
> > >
> > > function preload() {
> > >    img = loadImage('/vc/docs/sketches/hushky.jpg');
> > >}
> > >
> > > function setup() {
> > >    createCanvas(350, 500);
> > >    img.loadPixels();
> > >}
> > >
> > > function draw() {
> > >   boxBlurImg = createImage(img.width, img.height);
> > >   boxBlurImg.loadPixels();
> > >   for (let x = 1; x < img.width; x++) {
> > >     for (let y = 1; y < img.height; y++) {
> > >        let c = convolution(x, y, boxBlur);
> > >            let index = 4 * (x + img.width * y);
> > >            boxBlurImg.pixels[index] = red(c);
> > >            boxBlurImg.pixels[index + 1] = green(c);
> > >            boxBlurImg.pixels[index + 2] = blue(c);
> > >            boxBlurImg.pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    boxBlurImg.updatePixels();
> > >    image(boxBlurImg, 0, 0,width,height);
> > >}
> > >
> > > function convolution(x, y, matrix) {
> > >    let rtotal = 0;
> > >    let gtotal = 0;
> > >    let btotal = 0;
> > >    for (kx = -1; kx <= 1; kx++) {
> > >        for (ky = -1; ky <= 1; ky++) {
> > >            let xpos = x + kx;
> > >            let ypos = y + ky;
> > >            let r = 0;
> > >            let g = 0;
> > >            let b = 0;
> > >            if ((xpos >= 0 && xpos < img.width) && (ypos >= 0 || ypos < img.height)) {
> > >                let index = 4 * (xpos + img.width * ypos);
> > >                r = img.pixels[index];
> > >                g = img.pixels[index + 1];
> > >                b = img.pixels[index + 2];
> > >            }
> > >            rtotal += matrix[kx + 1][ky + 1] * r;
> > >            gtotal += matrix[kx + 1][ky + 1] * g;
> > >            btotal += matrix[kx + 1][ky + 1] * b;
> > >        }
> > >    }
> > >    rtotal = constrain(rtotal, 0, 255);
> > >    gtotal = constrain(gtotal, 0, 255);
> > >    btotal = constrain(btotal, 0, 255);
> > >    return color(rtotal, gtotal, btotal);
> > >}
>
> > :Tab title=Kernel
> > >
> > > :Formula aling= center
> > >
> > > ```
> > > \frac{1}{9} * \begin{pmatrix}
> > > 1 & 1 & 1 \\      
> > > 1 & 1 & 1 \\
> > > 1 & 1 & 1
> > > \end{pmatrix}
> > > ```
>
> > :Tab title=P5Code
> > ```js
> > > :P5  width=350, height=500
> > >
> > > let img;
> > >
> > > let boxBlur= [
> > >    [1.0 / 9.0, 1.0 / 9.0, 1.0 / 9.0],
> > >    [1.0 / 9.0, 1.0 / 9.0, 1.0 / 9.0],
> > >    [1.0 / 9.0, 1.0 / 9.0, 1.0 / 9.0]
> > > ];
> > >
> > > function preload() {
> > >    img = loadImage('/vc/docs/sketches/hushky.jpg');
> > >}
> > >
> > > function setup() {
> > >    createCanvas(350, 500);
> > >    img.loadPixels();
> > >}
> > >
> > > function draw() {
> > >   boxBlurImg = createImage(img.width, img.height);
> > >   boxBlurImg.loadPixels();
> > >   for (let x = 1; x < img.width; x++) {
> > >     for (let y = 1; y < img.height; y++) {
> > >        let c = convolution(x, y, boxBlur);
> > >            let index = 4 * (x + img.width * y);
> > >            boxBlurImg.pixels[index] = red(c);
> > >            boxBlurImg.pixels[index + 1] = green(c);
> > >            boxBlurImg.pixels[index + 2] = blue(c);
> > >            boxBlurImg.pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    boxBlurImg.updatePixels();
> > >    image(boxBlurImg, 0, 0,width,height);
> > >}
> > >
> > > function convolution(x, y, matrix) {
> > >    let rtotal = 0;
> > >    let gtotal = 0;
> > >    let btotal = 0;
> > >    for (kx = -1; kx <= 1; kx++) {
> > >        for (ky = -1; ky <= 1; ky++) {
> > >            let xpos = x + kx;
> > >            let ypos = y + ky;
> > >            let r = 0;
> > >            let g = 0;
> > >            let b = 0;
> > >            if ((xpos >= 0 && xpos < img.width) && (ypos >= 0 || ypos < img.height)) {
> > >                let index = 4 * (xpos + img.width * ypos);
> > >                r = img.pixels[index];
> > >                g = img.pixels[index + 1];
> > >                b = img.pixels[index + 2];
> > >            }
> > >            rtotal += matrix[kx + 1][ky + 1] * r;
> > >            gtotal += matrix[kx + 1][ky + 1] * g;
> > >            btotal += matrix[kx + 1][ky + 1] * b;
> > >        }
> > >    }
> > >    rtotal = constrain(rtotal, 0, 255);
> > >    gtotal = constrain(gtotal, 0, 255);
> > >    btotal = constrain(btotal, 0, 255);
> > >    return color(rtotal, gtotal, btotal);
> > >}
> > ```


#### Desenfoque Gausiano 3x3
Es un suavizado de pixeles, swe mezclan los colores de los pixeles adyacentes el uno al otro, haciendo que la imágen pierda detalles

> :Tabs
> > :Tab title=Desenfoque Gausiano
> > > :P5  width=350, height=500
> > >
> > > let img;
> > >
> > > let gaussianBlur3 = [
> > >    [1.0 / 16.0, 2.0 / 16.0, 1.0 / 16.0],
> > >    [2.0 / 16.0, 4.0 / 16.0, 2.0 / 16.0],
> > >    [1.0 / 16.0, 2.0 / 16.0, 1.0 / 16.0]
> > > ];
> > >
> > > function preload() {
> > >    img = loadImage('/vc/docs/sketches/hushky.jpg');
> > >}
> > >
> > > function setup() {
> > >    createCanvas(350, 500);
> > >    img.loadPixels();
> > >}
> > >
> > > function draw() {
> > >   gaussianBlur3Img = createImage(img.width, img.height);
> > >   gaussianBlur3Img.loadPixels();
> > >   for (let x = 1; x < img.width; x++) {
> > >     for (let y = 1; y < img.height; y++) {
> > >        let c = convolution(x, y, gaussianBlur3);
> > >            let index = 4 * (x + img.width * y);
> > >            gaussianBlur3Img.pixels[index] = red(c);
> > >            gaussianBlur3Img.pixels[index + 1] = green(c);
> > >            gaussianBlur3Img.pixels[index + 2] = blue(c);
> > >            gaussianBlur3Img.pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    gaussianBlur3Img.updatePixels();
> > >    image(gaussianBlur3Img, 0, 0,width,height);
> > >}
> > >
> > > function convolution(x, y, matrix) {
> > >    let rtotal = 0;
> > >    let gtotal = 0;
> > >    let btotal = 0;
> > >    for (kx = -1; kx <= 1; kx++) {
> > >        for (ky = -1; ky <= 1; ky++) {
> > >            let xpos = x + kx;
> > >            let ypos = y + ky;
> > >            let r = 0;
> > >            let g = 0;
> > >            let b = 0;
> > >            if ((xpos >= 0 && xpos < img.width) && (ypos >= 0 || ypos < img.height)) {
> > >                let index = 4 * (xpos + img.width * ypos);
> > >                r = img.pixels[index];
> > >                g = img.pixels[index + 1];
> > >                b = img.pixels[index + 2];
> > >            }
> > >            rtotal += matrix[kx + 1][ky + 1] * r;
> > >            gtotal += matrix[kx + 1][ky + 1] * g;
> > >            btotal += matrix[kx + 1][ky + 1] * b;
> > >        }
> > >    }
> > >    rtotal = constrain(rtotal, 0, 255);
> > >    gtotal = constrain(gtotal, 0, 255);
> > >    btotal = constrain(btotal, 0, 255);
> > >    return color(rtotal, gtotal, btotal);
> > >}
>
> > :Tab title=Kernel
> > >
> > > :Formula aling= center
> > >
> > > ```
> > > \frac{1}{16} * \begin{pmatrix}
> > > -1 & -1 & -1 \\      
> > > -1 & 4 &  -1 \\
> > > -1 & -1 & -1
> > > \end{pmatrix}
> > > ```
>
> > :Tab title=P5Code
> > ```js
> > > :P5  width=350, height=500
> > >
> > > let img;
> > >
> > > let gaussianBlur3 = [
> > >    [1.0 / 16.0, 2.0 / 16.0, 1.0 / 16.0],
> > >    [2.0 / 16.0, 4.0 / 16.0, 2.0 / 16.0],
> > >    [1.0 / 16.0, 2.0 / 16.0, 1.0 / 16.0]
> > > ];
> > >
> > > function preload() {
> > >    img = loadImage('/vc/docs/sketches/hushky.jpg');
> > >}
> > >
> > > function setup() {
> > >    createCanvas(350, 500);
> > >    img.loadPixels();
> > >}
> > >
> > > function draw() {
> > >   gaussianBlur3Img = createImage(img.width, img.height);
> > >   gaussianBlur3Img.loadPixels();
> > >   for (let x = 1; x < img.width; x++) {
> > >     for (let y = 1; y < img.height; y++) {
> > >        let c = convolution(x, y, gaussianBlur3);
> > >            let index = 4 * (x + img.width * y);
> > >            gaussianBlur3Img.pixels[index] = red(c);
> > >            gaussianBlur3Img.pixels[index + 1] = green(c);
> > >            gaussianBlur3Img.pixels[index + 2] = blue(c);
> > >            gaussianBlur3Img.pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    gaussianBlur3Img.updatePixels();
> > >    image(gaussianBlur3Img, 0, 0,width,height);
> > >}
> > >
> > > function convolution(x, y, matrix) {
> > >    let rtotal = 0;
> > >    let gtotal = 0;
> > >    let btotal = 0;
> > >    for (kx = -1; kx <= 1; kx++) {
> > >        for (ky = -1; ky <= 1; ky++) {
> > >            let xpos = x + kx;
> > >            let ypos = y + ky;
> > >            let r = 0;
> > >            let g = 0;
> > >            let b = 0;
> > >            if ((xpos >= 0 && xpos < img.width) && (ypos >= 0 || ypos < img.height)) {
> > >                let index = 4 * (xpos + img.width * ypos);
> > >                r = img.pixels[index];
> > >                g = img.pixels[index + 1];
> > >                b = img.pixels[index + 2];
> > >            }
> > >            rtotal += matrix[kx + 1][ky + 1] * r;
> > >            gtotal += matrix[kx + 1][ky + 1] * g;
> > >            btotal += matrix[kx + 1][ky + 1] * b;
> > >        }
> > >    }
> > >    rtotal = constrain(rtotal, 0, 255);
> > >    gtotal = constrain(gtotal, 0, 255);
> > >    btotal = constrain(btotal, 0, 255);
> > >    return color(rtotal, gtotal, btotal);
> > >}
> > ```

#### Repujado
Cada pixel de la imagen es reemplazado con luz o sombra 

> :Tabs
> > :Tab title=Repujado
> > > :P5  width=350, height=500
> > >
> > > let img;
> > >
> > > let emboss = [
> > >    [-2, -1, 0],
> > >    [-1, 1, 1],
> > >    [0, 1, 2]
> > > ];
> > >
> > > function preload() {
> > >    img = loadImage('/vc/docs/sketches/hushky.jpg');
> > >}
> > >
> > > function setup() {
> > >    createCanvas(350, 500);
> > >    img.loadPixels();
> > >}
> > >
> > > function draw() {
> > >   embossImg = createImage(img.width, img.height);
> > >   embossImg.loadPixels();
> > >   for (let x = 1; x < img.width; x++) {
> > >     for (let y = 1; y < img.height; y++) {
> > >        let c = convolution(x, y, emboss);
> > >            let index = 4 * (x + img.width * y);
> > >            embossImg.pixels[index ] = red(c);
> > >            embossImg.pixels[index + 1] = green(c);
> > >            embossImg.pixels[index + 2] = blue(c);
> > >            embossImg.pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    embossImg.updatePixels();
> > >    image(embossImg, 0, 0,width,height);
> > >}
> > >
> > > function convolution(x, y, matrix) {
> > >    let rtotal = 0;
> > >    let gtotal = 0;
> > >    let btotal = 0;
> > >    for (kx = -1; kx <= 1; kx++) {
> > >        for (ky = -1; ky <= 1; ky++) {
> > >            let xpos = x + kx;
> > >            let ypos = y + ky;
> > >            let r = 0;
> > >            let g = 0;
> > >            let b = 0;
> > >            if ((xpos >= 0 && xpos < img.width) && (ypos >= 0 || ypos < img.height)) {
> > >                let index = 4 * (xpos + img.width * ypos);
> > >                r = img.pixels[index];
> > >                g = img.pixels[index + 1];
> > >                b = img.pixels[index + 2];
> > >            }
> > >            rtotal += matrix[kx + 1][ky + 1] * r;
> > >            gtotal += matrix[kx + 1][ky + 1] * g;
> > >            btotal += matrix[kx + 1][ky + 1] * b;
> > >        }
> > >    }
> > >    rtotal = constrain(rtotal, 0, 255);
> > >    gtotal = constrain(gtotal, 0, 255);
> > >    btotal = constrain(btotal, 0, 255);
> > >    return color(rtotal, gtotal, btotal);
> > >}
>
> > :Tab title=Kernel
> > >
> > > :Formula aling= center
> > >
> > > \begin{pmatrix}
> > > -2 & -1 & 0 `\\`      
> > > -1 & 1 &  1 `\\`
> > > 0 & 1 & -1
> > > \end{pmatrix}
>
> > :Tab title=P5Code
> > ```js
> > > :P5  width=350, height=500
> > >
> > > let img;
> > >
> > > let emboss = [
> > >    [-2, -1, 0],
> > >    [-1, 1, 1],
> > >    [0, 1, 2]
> > > ];
> > >
> > > function preload() {
> > >    img = loadImage('/vc/docs/sketches/hushky.jpg');
> > >}
> > >
> > > function setup() {
> > >    createCanvas(350, 500);
> > >    img.loadPixels();
> > >}
> > >
> > > function draw() {
> > >   embossImg = createImage(img.width, img.height);
> > >   embossImg.loadPixels();
> > >   for (let x = 1; x < img.width; x++) {
> > >     for (let y = 1; y < img.height; y++) {
> > >        let c = convolution(x, y, emboss);
> > >            let index = 4 * (x + img.width * y);
> > >            embossImg.pixels[index ] = red(c);
> > >            embossImg.pixels[index + 1] = green(c);
> > >            embossImg.pixels[index + 2] = blue(c);
> > >            embossImg.pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    embossImg.updatePixels();
> > >    image(embossImg, 0, 0,width,height);
> > >}
> > >
> > > function convolution(x, y, matrix) {
> > >    let rtotal = 0;
> > >    let gtotal = 0;
> > >    let btotal = 0;
> > >    for (kx = -1; kx <= 1; kx++) {
> > >        for (ky = -1; ky <= 1; ky++) {
> > >            let xpos = x + kx;
> > >            let ypos = y + ky;
> > >            let r = 0;
> > >            let g = 0;
> > >            let b = 0;
> > >            if ((xpos >= 0 && xpos < img.width) && (ypos >= 0 || ypos < img.height)) {
> > >                let index = 4 * (xpos + img.width * ypos);
> > >                r = img.pixels[index];
> > >                g = img.pixels[index + 1];
> > >                b = img.pixels[index + 2];
> > >            }
> > >            rtotal += matrix[kx + 1][ky + 1] * r;
> > >            gtotal += matrix[kx + 1][ky + 1] * g;
> > >            btotal += matrix[kx + 1][ky + 1] * b;
> > >        }
> > >    }
> > >    rtotal = constrain(rtotal, 0, 255);
> > >    gtotal = constrain(gtotal, 0, 255);
> > >    btotal = constrain(btotal, 0, 255);
> > >    return color(rtotal, gtotal, btotal);
> > >}
> > ```

#### Contraste
La diferencia entre la intensidad más alta y la más baja


> :Tabs
> > :Tab title=Contraste
> > > :P5  width=350, height=500
> > >
> > > let img;
> > >
> > > let emboss = [
> > >    [1, 1, 1],
> > >    [1, 1, 1],
> > >    [1, 1, 1]
> > > ];
> > >
> > > function preload() {
> > >    img = loadImage('/vc/docs/sketches/hushky.jpg');
> > >}
> > >
> > > function setup() {
> > >    createCanvas(350, 500);
> > >    img.loadPixels();
> > >}
> > >
> > > function draw() {
> > >   embossImg = createImage(img.width, img.height);
> > >   embossImg.loadPixels();
> > >   for (let x = 1; x < img.width; x++) {
> > >     for (let y = 1; y < img.height; y++) {
> > >        let c = convolution(x, y, emboss);
> > >            let index = 4 * (x + img.width * y);
> > >            embossImg.pixels[index ] = red(c);
> > >            embossImg.pixels[index + 1] = green(c);
> > >            embossImg.pixels[index + 2] = blue(c);
> > >            embossImg.pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    embossImg.updatePixels();
> > >    image(embossImg, 0, 0,width,height);
> > >}
> > >
> > > function convolution(x, y, matrix) {
> > >    let rtotal = 0;
> > >    let gtotal = 0;
> > >    let btotal = 0;
> > >    for (kx = -1; kx <= 1; kx++) {
> > >        for (ky = -1; ky <= 1; ky++) {
> > >            let xpos = x + kx;
> > >            let ypos = y + ky;
> > >            let r = 0;
> > >            let g = 0;
> > >            let b = 0;
> > >            if ((xpos >= 0 && xpos < img.width) && (ypos >= 0 || ypos < img.height)) {
> > >                let index = 4 * (xpos + img.width * ypos);
> > >                r = img.pixels[index];
> > >                g = img.pixels[index + 1];
> > >                b = img.pixels[index + 2];
> > >            }
> > >            rtotal += matrix[kx + 1][ky + 1] * r;
> > >            gtotal += matrix[kx + 1][ky + 1] * g;
> > >            btotal += matrix[kx + 1][ky + 1] * b;
> > >        }
> > >    }
> > >    rtotal = constrain(rtotal, 0, 255);
> > >    gtotal = constrain(gtotal, 0, 255);
> > >    btotal = constrain(btotal, 0, 255);
> > >    return color(rtotal, gtotal, btotal);
> > >}
> >
> > > :P5  width=350, height=500
> > >
> > > let img;
> > >
> > > let emboss = [
> > >    [1, 0, 1],
> > >    [0, 0, 0],
> > >    [1, 0, 1]
> > > ];
> > >
> > > function preload() {
> > >    img = loadImage('/vc/docs/sketches/hushky.jpg');
> > >}
> > >
> > > function setup() {
> > >    createCanvas(350, 500);
> > >    img.loadPixels();
> > >}
> > >
> > > function draw() {
> > >   embossImg = createImage(img.width, img.height);
> > >   embossImg.loadPixels();
> > >   for (let x = 1; x < img.width; x++) {
> > >     for (let y = 1; y < img.height; y++) {
> > >        let c = convolution(x, y, emboss);
> > >            let index = 4 * (x + img.width * y);
> > >            embossImg.pixels[index ] = red(c);
> > >            embossImg.pixels[index + 1] = green(c);
> > >            embossImg.pixels[index + 2] = blue(c);
> > >            embossImg.pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    embossImg.updatePixels();
> > >    image(embossImg, 0, 0,width,height);
> > >}
> > >
> > > function convolution(x, y, matrix) {
> > >    let rtotal = 0;
> > >    let gtotal = 0;
> > >    let btotal = 0;
> > >    for (kx = -1; kx <= 1; kx++) {
> > >        for (ky = -1; ky <= 1; ky++) {
> > >            let xpos = x + kx;
> > >            let ypos = y + ky;
> > >            let r = 0;
> > >            let g = 0;
> > >            let b = 0;
> > >            if ((xpos >= 0 && xpos < img.width) && (ypos >= 0 || ypos < img.height)) {
> > >                let index = 4 * (xpos + img.width * ypos);
> > >                r = img.pixels[index];
> > >                g = img.pixels[index + 1];
> > >                b = img.pixels[index + 2];
> > >            }
> > >            rtotal += matrix[kx + 1][ky + 1] * r;
> > >            gtotal += matrix[kx + 1][ky + 1] * g;
> > >            btotal += matrix[kx + 1][ky + 1] * b;
> > >        }
> > >    }
> > >    rtotal = constrain(rtotal, 0, 255);
> > >    gtotal = constrain(gtotal, 0, 255);
> > >    btotal = constrain(btotal, 0, 255);
> > >    return color(rtotal, gtotal, btotal);
> > >}
>  
> > :Tab title=Kernels
> > >
> > > :Formula aling= center
> > >
> > > \begin{pmatrix}
> > > 1 & 1 & 1 `\\`      
> > > 1 & 1 & 1 `\\`
> > > 1 & 1 & 1
> > > \end{pmatrix}
> > >
> > > \begin{pmatrix}
> > > 1 & 0 & 1 `\\`     
> > > 0 & 0 & 0 `\\`
> > > 1 & 0 & 1
> > > \end{pmatrix}
> > >
>
> > :Tab title=P5Code
> > >Solamente se pone un código porque lo único que cambia es el Kernel
> > ```js
> > > :P5  width=350, height=500
> > >
> > > let img;
> > >
> > > let emboss = [
> > >    [1, 0, 1],
> > >    [0, 0, 0],
> > >    [1, 0, 1]
> > > ];
> > >
> > > function preload() {
> > >    img = loadImage('/vc/docs/sketches/hushky.jpg');
> > >}
> > >
> > > function setup() {
> > >    createCanvas(350, 500);
> > >    img.loadPixels();
> > >}
> > >
> > > function draw() {
> > >   embossImg = createImage(img.width, img.height);
> > >   embossImg.loadPixels();
> > >   for (let x = 1; x < img.width; x++) {
> > >     for (let y = 1; y < img.height; y++) {
> > >        let c = convolution(x, y, emboss);
> > >            let index = 4 * (x + img.width * y);
> > >            embossImg.pixels[index ] = red(c);
> > >            embossImg.pixels[index + 1] = green(c);
> > >            embossImg.pixels[index + 2] = blue(c);
> > >            embossImg.pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    embossImg.updatePixels();
> > >    image(embossImg, 0, 0,width,height);
> > >}
> > >
> > > function convolution(x, y, matrix) {
> > >    let rtotal = 0;
> > >    let gtotal = 0;
> > >    let btotal = 0;
> > >    for (kx = -1; kx <= 1; kx++) {
> > >        for (ky = -1; ky <= 1; ky++) {
> > >            let xpos = x + kx;
> > >            let ypos = y + ky;
> > >            let r = 0;
> > >            let g = 0;
> > >            let b = 0;
> > >            if ((xpos >= 0 && xpos < img.width) && (ypos >= 0 || ypos < img.height)) {
> > >                let index = 4 * (xpos + img.width * ypos);
> > >                r = img.pixels[index];
> > >                g = img.pixels[index + 1];
> > >                b = img.pixels[index + 2];
> > >            }
> > >            rtotal += matrix[kx + 1][ky + 1] * r;
> > >            gtotal += matrix[kx + 1][ky + 1] * g;
> > >            btotal += matrix[kx + 1][ky + 1] * b;
> > >        }
> > >    }
> > >    rtotal = constrain(rtotal, 0, 255);
> > >    gtotal = constrain(gtotal, 0, 255);
> > >    btotal = constrain(btotal, 0, 255);
> > >    return color(rtotal, gtotal, btotal);
> > >}
> > ```



> :ToCPrevNext
