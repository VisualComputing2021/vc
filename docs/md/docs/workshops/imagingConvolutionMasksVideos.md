# Image and video processing

## Máscaras de convolución

Usando la función general para la convolución:
> :Formula
>
>  g(x,y)= \omega * f(x,y) = \sum_{dx=-a}^{a} \sum_{dy=-b}^{b} \omega(dx,dy)f(x + dx, y + dy)

# Máscaras en videos

> :Tabs
> > :Tab title=Original
> > > :P5 width=640, height=360
> > >
> > > let vid;
> > >
> > > function setup() {
> > >  noCanvas();
> > >
> > >  vid = createVideo(
> > >    ['/vc/docs/sketches/walk.mp4'],
> > >    vidLoad
> > >  );
> > >
> > >  vid.size(640, 360);
> > >}
> > >
> > >// This function is called when the video loads
> > > function vidLoad() {
> > >  vid.loop();
> > >  vid.volume(0);
> > >}

#### Identidad
Retorna la misma imágen

> :Tabs
> > :Tab title=identidad
> > > :P5 width=640, height=360
> > >
> > > let walkvid;
> > >
> > > let kernel = [
> > >    [0, 0, 0],
> > >    [0, 1, 0],
> > >    [0, 0, 0]
> > > ];
> > >
> > > function preload() {
> > >    walkvid = createVideo("/vc/docs/sketches/walk.mp4");
> > >}
> > >
> > >function mousePressed() {
> > >    walkvid.loop();
> > >}
> > >
> > > function setup() {
> > >    createCanvas(640, 360);
> > >    walkvid.hide();
> > >    walkvid.volume(0);
> > >}
> > >
> > > function draw() {
> > >    walkvid.loadPixels();
> > >    loadPixels();
> > >    for (let x = 1; x < walkvid.width; x++) {
> > >        for (let y = 1; y < walkvid.height; y++) {
> > >            let c = convolution(x, y, kernel);
> > >            let index = 4 * (x + walkvid.width * y);
> > >            pixels[index] = red(c);
> > >            pixels[index + 1] = green(c);
> > >            pixels[index + 2] = blue(c);
> > >            pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    updatePixels();
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
> > >            if ((xpos >= 0 && xpos < walkvid.width) && (ypos >= 0 || ypos < walkvid.height)) {
> > >                let index = 4 * (xpos + walkvid.width * ypos);
> > >                r = walkvid.pixels[index];
> > >                g = walkvid.pixels[index + 1];
> > >                b = walkvid.pixels[index + 2];
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
> > > :P5 width=640, height=360
> > >
> > > let walkvid;
> > >
> > > let kernel = [
> > >    [0, 0, 0],
> > >    [0, 1, 0],
> > >    [0, 0, 0]
> > > ];
> > >
> > > function preload() {
> > >    walkvid = createVideo("/vc/docs/sketches/walk.mp4");
> > >}
> > >
> > >function mousePressed() {
> > >    walkvid.loop();
> > >}
> > >
> > > function setup() {
> > >    createCanvas(640, 360);
> > >    walkvid.hide();
> > >    walkvid.volume(0);
> > >}
> > >
> > > function draw() {
> > >    walkvid.loadPixels();
> > >    loadPixels();
> > >    for (let x = 1; x < walkvid.width; x++) {
> > >        for (let y = 1; y < walkvid.height; y++) {
> > >            let c = convolution(x, y, kernel);
> > >            let index = 4 * (x + walkvid.width * y);
> > >            pixels[index] = red(c);
> > >            pixels[index + 1] = green(c);
> > >            pixels[index + 2] = blue(c);
> > >            pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    updatePixels();
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
> > >            if ((xpos >= 0 && xpos < walkvid.width) && (ypos >= 0 || ypos < walkvid.height)) {
> > >                let index = 4 * (xpos + walkvid.width * ypos);
> > >                r = walkvid.pixels[index];
> > >                g = walkvid.pixels[index + 1];
> > >                b = walkvid.pixels[index + 2];
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
> > > :P5 width=640, height=360
> > >
> > > let walkvid;
> > >
> > > let kernel = [
> > >    [1, 0, -1],
> > >    [0, 0, 0],
> > >    [-1, 0, 1]
> > > ];
> > >
> > > function preload() {
> > >    walkvid = createVideo("/vc/docs/sketches/walk.mp4");
> > >}
> > >
> > >function mousePressed() {
> > >    walkvid.loop();
> > >}
> > >
> > > function setup() {
> > >    createCanvas(640, 360);
> > >    walkvid.hide();
> > >    walkvid.volume(0);
> > >}
> > >
> > > function draw() {
> > >    walkvid.loadPixels();
> > >    loadPixels();
> > >    for (let x = 1; x < walkvid.width; x++) {
> > >        for (let y = 1; y < walkvid.height; y++) {
> > >            let c = convolution(x, y, kernel);
> > >            let index = 4 * (x + walkvid.width * y);
> > >            pixels[index] = red(c);
> > >            pixels[index + 1] = green(c);
> > >            pixels[index + 2] = blue(c);
> > >            pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    updatePixels();
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
> > >            if ((xpos >= 0 && xpos < walkvid.width) && (ypos >= 0 || ypos < walkvid.height)) {
> > >                let index = 4 * (xpos + walkvid.width * ypos);
> > >                r = walkvid.pixels[index];
> > >                g = walkvid.pixels[index + 1];
> > >                b = walkvid.pixels[index + 2];
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
> > > :P5 width=640, height=360
> > >
> > > let walkvid;
> > >
> > > let kernel = [
> > >    [-1, -1, -1],
> > >    [-1, 8, -1],
> > >    [-1, -1, -1]
> > > ];
> > >
> > > function preload() {
> > >    walkvid = createVideo("/vc/docs/sketches/walk.mp4");
> > >}
> > >
> > >function mousePressed() {
> > >    walkvid.loop();
> > >}
> > >
> > > function setup() {
> > >    createCanvas(640, 360);
> > >    walkvid.hide();
> > >    walkvid.volume(0);
> > >}
> > >
> > > function draw() {
> > >    walkvid.loadPixels();
> > >    loadPixels();
> > >    for (let x = 1; x < walkvid.width; x++) {
> > >        for (let y = 1; y < walkvid.height; y++) {
> > >            let c = convolution(x, y, kernel);
> > >            let index = 4 * (x + walkvid.width * y);
> > >            pixels[index] = red(c);
> > >            pixels[index + 1] = green(c);
> > >            pixels[index + 2] = blue(c);
> > >            pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    updatePixels();
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
> > >            if ((xpos >= 0 && xpos < walkvid.width) && (ypos >= 0 || ypos < walkvid.height)) {
> > >                let index = 4 * (xpos + walkvid.width * ypos);
> > >                r = walkvid.pixels[index];
> > >                g = walkvid.pixels[index + 1];
> > >                b = walkvid.pixels[index + 2];
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
> > > :P5 width=640, height=360
> > >
> > > let walkvid;
> > >
> > > let kernel = [
> > >    [0, -1, 0],
> > >    [-1, 4, -1],
> > >    [0, -1, 0]
> > > ];
> > >
> > > function preload() {
> > >    walkvid = createVideo("/vc/docs/sketches/walk.mp4");
> > >}
> > >
> > >function mousePressed() {
> > >    walkvid.loop();
> > >}
> > >
> > > function setup() {
> > >    createCanvas(640, 360);
> > >    walkvid.hide();
> > >    walkvid.volume(0);
> > >}
> > >
> > > function draw() {
> > >    walkvid.loadPixels();
> > >    loadPixels();
> > >    for (let x = 1; x < walkvid.width; x++) {
> > >        for (let y = 1; y < walkvid.height; y++) {
> > >            let c = convolution(x, y, kernel);
> > >            let index = 4 * (x + walkvid.width * y);
> > >            pixels[index] = red(c);
> > >            pixels[index + 1] = green(c);
> > >            pixels[index + 2] = blue(c);
> > >            pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    updatePixels();
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
> > >            if ((xpos >= 0 && xpos < walkvid.width) && (ypos >= 0 || ypos < walkvid.height)) {
> > >                let index = 4 * (xpos + walkvid.width * ypos);
> > >                r = walkvid.pixels[index];
> > >                g = walkvid.pixels[index + 1];
> > >                b = walkvid.pixels[index + 2];
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
> > > :P5 width=640, height=360
> > >
> > > let walkvid;
> > >
> > > let kernel = [
> > >    [1, 0, -1],
> > >    [0, 0, 0],
> > >    [-1, 0, 1]
> > > ];
> > >
> > > function preload() {
> > >    walkvid = createVideo("/vc/docs/sketches/walk.mp4");
> > >}
> > >
> > >function mousePressed() {
> > >    walkvid.loop();
> > >}
> > >
> > > function setup() {
> > >    createCanvas(640, 360);
> > >    walkvid.hide();
> > >    walkvid.volume(0);
> > >}
> > >
> > > function draw() {
> > >    walkvid.loadPixels();
> > >    loadPixels();
> > >    for (let x = 1; x < walkvid.width; x++) {
> > >        for (let y = 1; y < walkvid.height; y++) {
> > >            let c = convolution(x, y, kernel);
> > >            let index = 4 * (x + walkvid.width * y);
> > >            pixels[index] = red(c);
> > >            pixels[index + 1] = green(c);
> > >            pixels[index + 2] = blue(c);
> > >            pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    updatePixels();
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
> > >            if ((xpos >= 0 && xpos < walkvid.width) && (ypos >= 0 || ypos < walkvid.height)) {
> > >                let index = 4 * (xpos + walkvid.width * ypos);
> > >                r = walkvid.pixels[index];
> > >                g = walkvid.pixels[index + 1];
> > >                b = walkvid.pixels[index + 2];
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
> > > :P5 width=640, height=360
> > >
> > > let walkvid;
> > >
> > > let kernel = [
> > >    [0, -1, 0],
> > >    [-1, , -1],
> > >    [0, -1, 0]
> > > ];
> > >
> > > function preload() {
> > >    walkvid = createVideo("/vc/docs/sketches/walk.mp4");
> > >}
> > >
> > >function mousePressed() {
> > >    walkvid.loop();
> > >}
> > >
> > > function setup() {
> > >    createCanvas(640, 360);
> > >    walkvid.hide();
> > >    walkvid.volume(0);
> > >}
> > >
> > > function draw() {
> > >    walkvid.loadPixels();
> > >    loadPixels();
> > >    for (let x = 1; x < walkvid.width; x++) {
> > >        for (let y = 1; y < walkvid.height; y++) {
> > >            let c = convolution(x, y, kernel);
> > >            let index = 4 * (x + walkvid.width * y);
> > >            pixels[index] = red(c);
> > >            pixels[index + 1] = green(c);
> > >            pixels[index + 2] = blue(c);
> > >            pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    updatePixels();
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
> > >            if ((xpos >= 0 && xpos < walkvid.width) && (ypos >= 0 || ypos < walkvid.height)) {
> > >                let index = 4 * (xpos + walkvid.width * ypos);
> > >                r = walkvid.pixels[index];
> > >                g = walkvid.pixels[index + 1];
> > >                b = walkvid.pixels[index + 2];
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
> > > :P5 width=640, height=360
> > >
> > > let walkvid;
> > >
> > > let kernel = [
> > >    [0, -1, 0],
> > >    [-1, , -1],
> > >    [0, -1, 0]
> > > ];
> > >
> > > function preload() {
> > >    walkvid = createVideo("/vc/docs/sketches/walk.mp4");
> > >}
> > >
> > >function mousePressed() {
> > >    walkvid.loop();
> > >}
> > >
> > > function setup() {
> > >    createCanvas(640, 360);
> > >    walkvid.hide();
> > >    walkvid.volume(0);
> > >}
> > >
> > > function draw() {
> > >    walkvid.loadPixels();
> > >    loadPixels();
> > >    for (let x = 1; x < walkvid.width; x++) {
> > >        for (let y = 1; y < walkvid.height; y++) {
> > >            let c = convolution(x, y, kernel);
> > >            let index = 4 * (x + walkvid.width * y);
> > >            pixels[index] = red(c);
> > >            pixels[index + 1] = green(c);
> > >            pixels[index + 2] = blue(c);
> > >            pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    updatePixels();
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
> > >            if ((xpos >= 0 && xpos < walkvid.width) && (ypos >= 0 || ypos < walkvid.height)) {
> > >                let index = 4 * (xpos + walkvid.width * ypos);
> > >                r = walkvid.pixels[index];
> > >                g = walkvid.pixels[index + 1];
> > >                b = walkvid.pixels[index + 2];
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
> > > :P5 width=640, height=360
> > >
> > > let walkvid;
> > >
> > > let kernel = [
> > >    [1.0 / 9.0, 1.0 / 9.0, 1.0 / 9.0],
> > >    [1.0 / 9.0, 1.0 / 9.0, 1.0 / 9.0],
> > >    [1.0 / 9.0, 1.0 / 9.0, 1.0 / 9.0]
> > > ];
> > >
> > > function preload() {
> > >    walkvid = createVideo("/vc/docs/sketches/walk.mp4");
> > >}
> > >
> > >function mousePressed() {
> > >    walkvid.loop();
> > >}
> > >
> > > function setup() {
> > >    createCanvas(640, 360);
> > >    walkvid.hide();
> > >    walkvid.volume(0);
> > >}
> > >
> > > function draw() {
> > >    walkvid.loadPixels();
> > >    loadPixels();
> > >    for (let x = 1; x < walkvid.width; x++) {
> > >        for (let y = 1; y < walkvid.height; y++) {
> > >            let c = convolution(x, y, kernel);
> > >            let index = 4 * (x + walkvid.width * y);
> > >            pixels[index] = red(c);
> > >            pixels[index + 1] = green(c);
> > >            pixels[index + 2] = blue(c);
> > >            pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    updatePixels();
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
> > >            if ((xpos >= 0 && xpos < walkvid.width) && (ypos >= 0 || ypos < walkvid.height)) {
> > >                let index = 4 * (xpos + walkvid.width * ypos);
> > >                r = walkvid.pixels[index];
> > >                g = walkvid.pixels[index + 1];
> > >                b = walkvid.pixels[index + 2];
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
> > > :P5 width=640, height=360
> > >
> > > let walkvid;
> > >
> > > let kernel = [
> > >    [1.0 / 9.0, 1.0 / 9.0, 1.0 / 9.0],
> > >    [1.0 / 9.0, 1.0 / 9.0, 1.0 / 9.0],
> > >    [1.0 / 9.0, 1.0 / 9.0, 1.0 / 9.0]
> > > ];
> > >
> > > function preload() {
> > >    walkvid = createVideo("/vc/docs/sketches/walk.mp4");
> > >}
> > >
> > >function mousePressed() {
> > >    walkvid.loop();
> > >}
> > >
> > > function setup() {
> > >    createCanvas(640, 360);
> > >    walkvid.hide();
> > >    walkvid.volume(0);
> > >}
> > >
> > > function draw() {
> > >    walkvid.loadPixels();
> > >    loadPixels();
> > >    for (let x = 1; x < walkvid.width; x++) {
> > >        for (let y = 1; y < walkvid.height; y++) {
> > >            let c = convolution(x, y, kernel);
> > >            let index = 4 * (x + walkvid.width * y);
> > >            pixels[index] = red(c);
> > >            pixels[index + 1] = green(c);
> > >            pixels[index + 2] = blue(c);
> > >            pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    updatePixels();
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
> > >            if ((xpos >= 0 && xpos < walkvid.width) && (ypos >= 0 || ypos < walkvid.height)) {
> > >                let index = 4 * (xpos + walkvid.width * ypos);
> > >                r = walkvid.pixels[index];
> > >                g = walkvid.pixels[index + 1];
> > >                b = walkvid.pixels[index + 2];
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
> > > :P5 width=640, height=360
> > >
> > > let walkvid;
> > >
> > > let kernel = [
> > >    [1.0 / 16.0, 2.0 / 16.0, 1.0 / 16.0],
> > >    [2.0 / 16.0, 4.0 / 16.0, 2.0 / 16.0],
> > >    [1.0 / 16.0, 2.0 / 16.0, 1.0 / 16.0]
> > > ];
> > >
> > > function preload() {
> > >    walkvid = createVideo("/vc/docs/sketches/walk.mp4");
> > >}
> > >
> > >function mousePressed() {
> > >    walkvid.loop();
> > >}
> > >
> > > function setup() {
> > >    createCanvas(640, 360);
> > >    walkvid.hide();
> > >    walkvid.volume(0);
> > >}
> > >
> > > function draw() {
> > >    walkvid.loadPixels();
> > >    loadPixels();
> > >    for (let x = 1; x < walkvid.width; x++) {
> > >        for (let y = 1; y < walkvid.height; y++) {
> > >            let c = convolution(x, y, kernel);
> > >            let index = 4 * (x + walkvid.width * y);
> > >            pixels[index] = red(c);
> > >            pixels[index + 1] = green(c);
> > >            pixels[index + 2] = blue(c);
> > >            pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    updatePixels();
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
> > >            if ((xpos >= 0 && xpos < walkvid.width) && (ypos >= 0 || ypos < walkvid.height)) {
> > >                let index = 4 * (xpos + walkvid.width * ypos);
> > >                r = walkvid.pixels[index];
> > >                g = walkvid.pixels[index + 1];
> > >                b = walkvid.pixels[index + 2];
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
> > > :P5 width=640, height=360
> > >
> > > let walkvid;
> > >
> > > let kernel = [
> > >    [1.0 / 16.0, 2.0 / 16.0, 1.0 / 16.0],
> > >    [2.0 / 16.0, 4.0 / 16.0, 2.0 / 16.0],
> > >    [1.0 / 16.0, 2.0 / 16.0, 1.0 / 16.0]
> > > ];
> > >
> > > function preload() {
> > >    walkvid = createVideo("/vc/docs/sketches/walk.mp4");
> > >}
> > >
> > >function mousePressed() {
> > >    walkvid.loop();
> > >}
> > >
> > > function setup() {
> > >    createCanvas(640, 360);
> > >    walkvid.hide();
> > >    walkvid.volume(0);
> > >}
> > >
> > > function draw() {
> > >    walkvid.loadPixels();
> > >    loadPixels();
> > >    for (let x = 1; x < walkvid.width; x++) {
> > >        for (let y = 1; y < walkvid.height; y++) {
> > >            let c = convolution(x, y, kernel);
> > >            let index = 4 * (x + walkvid.width * y);
> > >            pixels[index] = red(c);
> > >            pixels[index + 1] = green(c);
> > >            pixels[index + 2] = blue(c);
> > >            pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    updatePixels();
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
> > >            if ((xpos >= 0 && xpos < walkvid.width) && (ypos >= 0 || ypos < walkvid.height)) {
> > >                let index = 4 * (xpos + walkvid.width * ypos);
> > >                r = walkvid.pixels[index];
> > >                g = walkvid.pixels[index + 1];
> > >                b = walkvid.pixels[index + 2];
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
> > > :P5 width=640, height=360
> > >
> > > let walkvid;
> > >
> > > let kernel = [
> > >    [-2, -1, 0],
> > >    [-1, 1, 1],
> > >    [0, 1, 2]
> > > ];
> > >
> > > function preload() {
> > >    walkvid = createVideo("/vc/docs/sketches/walk.mp4");
> > >}
> > >
> > >function mousePressed() {
> > >    walkvid.loop();
> > >}
> > >
> > > function setup() {
> > >    createCanvas(640, 360);
> > >    walkvid.hide();
> > >    walkvid.volume(0);
> > >}
> > >
> > > function draw() {
> > >    walkvid.loadPixels();
> > >    loadPixels();
> > >    for (let x = 1; x < walkvid.width; x++) {
> > >        for (let y = 1; y < walkvid.height; y++) {
> > >            let c = convolution(x, y, kernel);
> > >            let index = 4 * (x + walkvid.width * y);
> > >            pixels[index] = red(c);
> > >            pixels[index + 1] = green(c);
> > >            pixels[index + 2] = blue(c);
> > >            pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    updatePixels();
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
> > >            if ((xpos >= 0 && xpos < walkvid.width) && (ypos >= 0 || ypos < walkvid.height)) {
> > >                let index = 4 * (xpos + walkvid.width * ypos);
> > >                r = walkvid.pixels[index];
> > >                g = walkvid.pixels[index + 1];
> > >                b = walkvid.pixels[index + 2];
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
> > > :P5 width=640, height=360
> > >
> > > let walkvid;
> > >
> > > let kernel = [
> > >    [-2, -1, 0],
> > >    [-1, 1, 1],
> > >    [0, 1, 2]
> > > ];
> > >
> > > function preload() {
> > >    walkvid = createVideo("/vc/docs/sketches/walk.mp4");
> > >}
> > >
> > >function mousePressed() {
> > >    walkvid.loop();
> > >}
> > >
> > > function setup() {
> > >    createCanvas(640, 360);
> > >    walkvid.hide();
> > >    walkvid.volume(0);
> > >}
> > >
> > > function draw() {
> > >    walkvid.loadPixels();
> > >    loadPixels();
> > >    for (let x = 1; x < walkvid.width; x++) {
> > >        for (let y = 1; y < walkvid.height; y++) {
> > >            let c = convolution(x, y, kernel);
> > >            let index = 4 * (x + walkvid.width * y);
> > >            pixels[index] = red(c);
> > >            pixels[index + 1] = green(c);
> > >            pixels[index + 2] = blue(c);
> > >            pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    updatePixels();
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
> > >            if ((xpos >= 0 && xpos < walkvid.width) && (ypos >= 0 || ypos < walkvid.height)) {
> > >                let index = 4 * (xpos + walkvid.width * ypos);
> > >                r = walkvid.pixels[index];
> > >                g = walkvid.pixels[index + 1];
> > >                b = walkvid.pixels[index + 2];
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
> > > :P5 width=640, height=360
> > >
> > > let walkvid;
> > >
> > > let kernel = [
> > >    [1, 1, 1],
> > >    [1, 1, 1],
> > >    [1, 1, 1]
> > > ];
> > >
> > > function preload() {
> > >    walkvid = createVideo("/vc/docs/sketches/walk.mp4");
> > >}
> > >
> > >function mousePressed() {
> > >    walkvid.loop();
> > >}
> > >
> > > function setup() {
> > >    createCanvas(640, 360);
> > >    walkvid.hide();
> > >    walkvid.volume(0);
> > >}
> > >
> > > function draw() {
> > >    walkvid.loadPixels();
> > >    loadPixels();
> > >    for (let x = 1; x < walkvid.width; x++) {
> > >        for (let y = 1; y < walkvid.height; y++) {
> > >            let c = convolution(x, y, kernel);
> > >            let index = 4 * (x + walkvid.width * y);
> > >            pixels[index] = red(c);
> > >            pixels[index + 1] = green(c);
> > >            pixels[index + 2] = blue(c);
> > >            pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    updatePixels();
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
> > >            if ((xpos >= 0 && xpos < walkvid.width) && (ypos >= 0 || ypos < walkvid.height)) {
> > >                let index = 4 * (xpos + walkvid.width * ypos);
> > >                r = walkvid.pixels[index];
> > >                g = walkvid.pixels[index + 1];
> > >                b = walkvid.pixels[index + 2];
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
> > > :P5 width=640, height=360
> > >
> > > let walkvid;
> > >
> > > let kernel = [
> > >    [1, 0, 1],
> > >    [0, 0, 0],
> > >    [1, 0, 1]
> > > ];
> > >
> > > function preload() {
> > >    walkvid = createVideo("/vc/docs/sketches/walk.mp4");
> > >}
> > >
> > >function mousePressed() {
> > >    walkvid.loop();
> > >}
> > >
> > > function setup() {
> > >    createCanvas(640, 360);
> > >    walkvid.hide();
> > >    walkvid.volume(0);
> > >}
> > >
> > > function draw() {
> > >    walkvid.loadPixels();
> > >    loadPixels();
> > >    for (let x = 1; x < walkvid.width; x++) {
> > >        for (let y = 1; y < walkvid.height; y++) {
> > >            let c = convolution(x, y, kernel);
> > >            let index = 4 * (x + walkvid.width * y);
> > >            pixels[index] = red(c);
> > >            pixels[index + 1] = green(c);
> > >            pixels[index + 2] = blue(c);
> > >            pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    updatePixels();
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
> > >            if ((xpos >= 0 && xpos < walkvid.width) && (ypos >= 0 || ypos < walkvid.height)) {
> > >                let index = 4 * (xpos + walkvid.width * ypos);
> > >                r = walkvid.pixels[index];
> > >                g = walkvid.pixels[index + 1];
> > >                b = walkvid.pixels[index + 2];
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
> > > :P5 width=640, height=360
> > >
> > > let walkvid;
> > >
> > > let kernel = [
> > >    [1, 1, 1],
> > >    [1, 1, 1],
> > >    [1, 1, 1]
> > > ];
> > >
> > > function preload() {
> > >    walkvid = createVideo("/vc/docs/sketches/walk.mp4");
> > >}
> > >
> > >function mousePressed() {
> > >    walkvid.loop();
> > >}
> > >
> > > function setup() {
> > >    createCanvas(640, 360);
> > >    walkvid.hide();
> > >    walkvid.volume(0);
> > >}
> > >
> > > function draw() {
> > >    walkvid.loadPixels();
> > >    loadPixels();
> > >    for (let x = 1; x < walkvid.width; x++) {
> > >        for (let y = 1; y < walkvid.height; y++) {
> > >            let c = convolution(x, y, kernel);
> > >            let index = 4 * (x + walkvid.width * y);
> > >            pixels[index] = red(c);
> > >            pixels[index + 1] = green(c);
> > >            pixels[index + 2] = blue(c);
> > >            pixels[index + 3] = alpha(c);
> > >        }
> > >    }
> > >    updatePixels();
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
> > >            if ((xpos >= 0 && xpos < walkvid.width) && (ypos >= 0 || ypos < walkvid.height)) {
> > >                let index = 4 * (xpos + walkvid.width * ypos);
> > >                r = walkvid.pixels[index];
> > >                g = walkvid.pixels[index + 1];
> > >                b = walkvid.pixels[index + 2];
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
