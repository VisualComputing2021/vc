# Image and video processing

#Conversión de la imagen a un foto-mosaico.

Conversión con una imagen pequeña (mosaico de imagenes 3x3):

> :P5 width=350, height=450
>
> let img;
> let img2
> function preload(){
>   img = loadImage('/vc/docs/sketches/tree.jpg');   
>}
> function setup() {
>   createCanvas(350, 450);
>   image(img, 0, 0,width,height);
> }

> :P5 width=350, height=450
>
>let imgColor;
>let Rimgs = new Array(20);
>let Bimgs = new Array(20);
>let Gimgs = new Array(20);
>let Yimgs = new Array(20);
>let Grayimgs = new Array(20);
>let total = 0;
>//CARACTERISTICAS DE LA IMAGEN PRINCIPAL
>let MainImgName = "tree";
>let MainImgX = 350;
>let MainImgY = 450;
>let pixelSize = 3;
>let pixel;
>
>//FUNCION PARA RETORNAR EL INDICE DE LA IMAGEN A UTILIZAR SEGUN SU BRILLO
> function brightlevel(S) {
>  if (S<0.05){
>    return 20;
>  }
>  else if (S<0.14){
>    return 19;
>  }
>  else if (S<0.23){
>    return 18;
>  }
>  else if (S<0.32){
>    return 17;
>  }
>  else if (S<0.41){
>    return 16;
>  }
>  else if (S<0.5){
>    return 15;
>  }
>  else if (S<0.59){
>    return 14;
>  }
>  else if (S<0.68){
>    return 13;
>  }
>  else if (S<0.77){
>    return 12;
>  }
>  else if (S<0.86){
>    return 11;
>  }
>  else if (S<0.95){
>    return 10;
>  }
>  else if (S<1.04){
>    return 9;
>  }
>  else if (S<1.13){
>    return 8;
>  }
>  else if (S<1.22){
>    return 7;
>  }
>  else if (S<1.31){
>    return 6;
>  }
>  else if (S<1.4){
>    return 5;
>  }
>  else if (S<1.49){
>    return 4;
>  }
>  else if (S<1.58){
>    return 3;
>  }
>  else if (S<1.67){
>    return 2;
>  }
>  else if (S<=1.76){
>    return 1;
>  }
>  else{
>    return 100;
>  }
>}
>
>function preload(){
>  //SE CARGAN LAS IMAGENES RGB
>  for (let i=0; i<20; i++){
>    Rimgs[i] = loadImage("/vc/docs/sketches/imagenes/red"+(i+1)+".jpg");
>    Gimgs[i] = loadImage("/vc/docs/sketches/imagenes/green"+(i+1)+".jpg");
>    Bimgs[i] = loadImage("/vc/docs/sketches/imagenes/blue"+(i+1)+".jpg");
>    Yimgs[i] = loadImage("/vc/docs/sketches/imagenes/yellowOrange"+(i+1)+".jpg");
>    Grayimgs[i] = loadImage("/vc/docs/sketches/imagenes/gray"+(i+1)+".jpg");
>  }
>  //SE CARGA LA IMAGEN CON LA QUE SE TRABAJA 2 VECES PARA TENER UNA VERSION ORIGINAL Y OTRA A ESCALA DE GRISES
>  imgColor = loadImage("/vc/docs/sketches/"+MainImgName+".jpg");
>}
> 
>function setup() {
>  createCanvas(350,450);
>  background(255);
>  fill(0);
>  
>  //SE APLICA EL FILTRO GRIS
>  imgColor.loadPixels();
>  
>  let i = 0;
>  
>  //SE HALLA EL PROMEDIO DE LOS VALORES RGB PARA EL BRILLO
>  for (let y = 0; y < imgColor.height; y += 1) {
>    for (let x = 0; x < imgColor.width; x += 1) {
>      pixel = imgColor.pixels[(y * imgColor.width + x)];
>      total = total + brightness(pixel);
>      i++;
>    }
>  }
>  total = total / i;
>
>}
>  
>function draw(){
>  
>  imgColor.resize(MainImgX,MainImgY);
>  
>  for (let i=0; i<20; i++){
>    Rimgs[i].resize(pixelSize,pixelSize);
>    Gimgs[i].resize(pixelSize,pixelSize);
>    Bimgs[i].resize(pixelSize,pixelSize);
>    Yimgs[i].resize(pixelSize,pixelSize);
>    Grayimgs[i].resize(pixelSize,pixelSize);
>  }
>  
> //SE RECORRE LA IMAGEN
>  for (let y = 0; y < imgColor.height; y += pixelSize) {
>    for (let x = 0; x < imgColor.width; x += pixelSize) {
>      //CON LA IMAGEN GRIS VERIFICAMOS EL BRILLO DEL PIXEL
>        pixel = imgColor.get(x,y);
>        let S=brightness(pixel);
>        S = S/total;
>        //CON LA IMAGEN A COLOR VERIFICAMOS EL RGB DEL PIXEL
>        let r = red(pixel);
>        let g = green(pixel);
>        let b = blue(pixel);        
>        //LLAMAMOS A LA FUNCION PARA EL INDICE CORRESPONDIENTE EL BRILLO
>        let bright = brightlevel(S)-1;
>        if(r==255 && b==255 && g==255){
>         image(Grayimgs[0],x,y);
>        }
>        //SI RETORNA 99 ES BLANCO ASI QUE SE USA LA IMAGEN BLANCA DEL ELSE
>        else if(bright!=99){
>          //SE VERIFICA EL COLOR MAYORITARIO Y SE APLICA UNA IMAGEN CON ESE COLOR
>          if (r>=g && g>=125 && r>b){
>            image(Yimgs[bright],x,y);
>          }else if (r>b && r>g){
>            image(Rimgs[bright],x,y);
>          }else if(b>r && b>g){
>            image(Bimgs[bright],x,y);
>          }else if(g>b && g>r){
>            image(Gimgs[bright],x,y);
>          }else{
>            image(Grayimgs[bright],x,y);
>          }
>        }else{
>          image(Grayimgs[0],x,y);
>        }
>    }
>  }
>}

Conversión con una imagen grande (mosaico de imagenes 5x5):

> :P5 width=1500, height=1000
>
> let img;
> let img2
> function preload(){
>   img = loadImage('/vc/docs/sketches/paisaje2.jpg');   
>}
> function setup() {
>   createCanvas(1500, 1000);
>   image(img, 0, 0,width,height);
> }

> :P5 width=1500, height=1000
>
>let imgColor;
>let Rimgs = new Array(20);
>let Bimgs = new Array(20);
>let Gimgs = new Array(20);
>let Yimgs = new Array(20);
>let Grayimgs = new Array(20);
>let total = 0;
>//CARACTERISTICAS DE LA IMAGEN PRINCIPAL
>let MainImgName = "paisaje2";
>let MainImgX = 1500;
>let MainImgY = 1000;
>let pixelSize = 5;
>let pixel;
>
>//FUNCION PARA RETORNAR EL INDICE DE LA IMAGEN A UTILIZAR SEGUN SU BRILLO
> function brightlevel(S) {
>  if (S<0.05){
>    return 20;
>  }
>  else if (S<0.14){
>    return 19;
>  }
>  else if (S<0.23){
>    return 18;
>  }
>  else if (S<0.32){
>    return 17;
>  }
>  else if (S<0.41){
>    return 16;
>  }
>  else if (S<0.5){
>    return 15;
>  }
>  else if (S<0.59){
>    return 14;
>  }
>  else if (S<0.68){
>    return 13;
>  }
>  else if (S<0.77){
>    return 12;
>  }
>  else if (S<0.86){
>    return 11;
>  }
>  else if (S<0.95){
>    return 10;
>  }
>  else if (S<1.04){
>    return 9;
>  }
>  else if (S<1.13){
>    return 8;
>  }
>  else if (S<1.22){
>    return 7;
>  }
>  else if (S<1.31){
>    return 6;
>  }
>  else if (S<1.4){
>    return 5;
>  }
>  else if (S<1.49){
>    return 4;
>  }
>  else if (S<1.58){
>    return 3;
>  }
>  else if (S<1.67){
>    return 2;
>  }
>  else if (S<=1.76){
>    return 1;
>  }
>  else{
>    return 100;
>  }
>}
>
>function preload(){
>  //SE CARGAN LAS IMAGENES RGB
>  for (let i=0; i<20; i++){
>    Rimgs[i] = loadImage("/vc/docs/sketches/imagenes/red"+(i+1)+".jpg");
>    Gimgs[i] = loadImage("/vc/docs/sketches/imagenes/green"+(i+1)+".jpg");
>    Bimgs[i] = loadImage("/vc/docs/sketches/imagenes/blue"+(i+1)+".jpg");
>    Yimgs[i] = loadImage("/vc/docs/sketches/imagenes/yellowOrange"+(i+1)+".jpg");
>    Grayimgs[i] = loadImage("/vc/docs/sketches/imagenes/gray"+(i+1)+".jpg");
>  }
>  //SE CARGA LA IMAGEN CON LA QUE SE TRABAJA 2 VECES PARA TENER UNA VERSION ORIGINAL Y OTRA A ESCALA DE GRISES
>  imgColor = loadImage("/vc/docs/sketches/"+MainImgName+".jpg");
>}
> 
>function setup() {
>  createCanvas(1500,1000);
>  background(255);
>  fill(0);
>  
>  //SE APLICA EL FILTRO GRIS
>  imgColor.loadPixels();
>  
>  let i = 0;
>  
>  //SE HALLA EL PROMEDIO DE LOS VALORES RGB PARA EL BRILLO
>  for (let y = 0; y < imgColor.height; y += 1) {
>    for (let x = 0; x < imgColor.width; x += 1) {
>      pixel = imgColor.pixels[(y * imgColor.width + x)];
>      total = total + brightness(pixel);
>      i++;
>    }
>  }
>  total = total / i;
>
>}
>  
>function draw(){
>  
>  imgColor.resize(MainImgX,MainImgY);
>  
>  for (let i=0; i<20; i++){
>    Rimgs[i].resize(pixelSize,pixelSize);
>    Gimgs[i].resize(pixelSize,pixelSize);
>    Bimgs[i].resize(pixelSize,pixelSize);
>    Yimgs[i].resize(pixelSize,pixelSize);
>    Grayimgs[i].resize(pixelSize,pixelSize);
>  }
>  
> //SE RECORRE LA IMAGEN
>  for (let y = 0; y < imgColor.height; y += pixelSize) {
>    for (let x = 0; x < imgColor.width; x += pixelSize) {
>      //CON LA IMAGEN GRIS VERIFICAMOS EL BRILLO DEL PIXEL
>        pixel = imgColor.get(x,y);
>        let S=brightness(pixel);
>        S = S/total;
>        //CON LA IMAGEN A COLOR VERIFICAMOS EL RGB DEL PIXEL
>        let r = red(pixel);
>        let g = green(pixel);
>        let b = blue(pixel);        
>        //LLAMAMOS A LA FUNCION PARA EL INDICE CORRESPONDIENTE EL BRILLO
>        let bright = brightlevel(S)-1;
>        if(r==255 && b==255 && g==255){
>         image(Grayimgs[0],x,y);
>        }
>        //SI RETORNA 99 ES BLANCO ASI QUE SE USA LA IMAGEN BLANCA DEL ELSE
>        else if(bright!=99){
>          //SE VERIFICA EL COLOR MAYORITARIO Y SE APLICA UNA IMAGEN CON ESE COLOR
>          if (r>=g && g>=125 && r>b){
>            image(Yimgs[bright],x,y);
>          }else if (r>b && r>g){
>            image(Rimgs[bright],x,y);
>          }else if(b>r && b>g){
>            image(Bimgs[bright],x,y);
>          }else if(g>b && g>r){
>            image(Gimgs[bright],x,y);
>          }else{
>            image(Grayimgs[bright],x,y);
>          }
>        }else{
>          image(Grayimgs[0],x,y);
>        }
>    }
>  }
>}

> :ToCPrevNext