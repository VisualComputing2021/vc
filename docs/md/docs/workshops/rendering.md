# Rendering

## Line drawing algorithm

Es bien sabido que nuestras pantallas son medios discretos basados en pixeles, es por esto que al renderizar una linea es necesario una aproximación para saber cuales pixeles debemos usar, sin embargo existen casos triviales dónde no es necesaria esta aproximación coomo en el caso de las líneas horizontales, verticales y de 45º.

![](https://i.imgur.com/c0AhXvw.png)

Pero para otros casos no es tan trivial, y es ahí dónde entran los algoritmos de dibujo de lineas. Entre ellos tenemos, el algoritmo de Bresenham, el algoritmo de punto medio y el algorimto Digital Differential Analyzer (DDA), este último es el que haremos hincapíe.

### DDA Algorithm

El algoritmo DDA (Analizador Diferencial Digital) por su siglas en ingles es usado para la interpolación de variables desde un punto inicial a uno final. Su relevancia es tan alta que el algoritmo se ha llevado al hardware, es así como los DDA se utilizan para la rasterización de líneas, triángulos y polígonos.

#### Mathematical interpretation

Sabemos que la ecuación de una linea recta es: y=mx+b dónde m es la pendiente de la recta que podemos calcular como y{final}-y{inicial}/x{final}-{yinicial}. Basado en esto el algoritmo DDA calcula para cada segmento de linea la siguientes ecuaciones xi = xi-1 + 1 y yi = yi-1 + m. Facilmente podemos ver como el algoritmo tiene en cuenta su valor anterior para calcular los siguientes valores. 

Este algoritmo nos presenta unas ventajas respecto a otros algoritmos de dibujo de lineas, entre ellas encontramos que es un algoritmo muy fácil de implementar y de analizar, además dado que el algoritmo DDA utiliza la suma repetida para no usar la multiplicación así reduciendo su complejidad temporal, finalmente su ventaja más relevante es que nos permite detectar el cambio en el valor de x e y, por lo que no es posible trazar dos veces el mismo punto. Pero este algoritmo tiene varias desventajas una de ellas es que es necesario las sumas en coma flotante que se redondean así el redondeo provoca la acumulación del error que se puede propagar y que estas operaciones pueden llegar a tomar más tiempo del calculo de linea comparado con otros algoritmos esto dado que requiere de dos sumas por ciclo de salida, y en caso de desbordamiento de la parte fraccionaria, un incremento y una resta adicionales.

#### Implementation

Aquí podemos ver una implementación del algoritmo usando la libreria de quadrille.

> :P5 lib1=https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.js, sketch=/docs/sketches/Raycasting/DDA.js

## The visibility problem on 2D

Los cálculos de visibilidad, como la visiblidad de las líneas atraves de un poligono y la eliminación de las superficies ocultas, son problemas fundamentales en las tareas de síntesis de imágenes de los gráficos por ordenador. Uno de los casos más estudiados es el problema de la galeria de arte, en este problema se busca la optimización de cual es la cantidad mínima de puntos en un poligono para ver los demás. Este problema planteado en 1973 por Victor Klee geometricamente se puede ver como: 

> Dado un polígono simple de n vértices, ¿cuál es el número mínimo de guardias para ver cada punto del interior del polígono? 

Chvátal co-escritor del articulo original, demostro que la cantidad minima de guardias es n/3. La demostración la podemos encontrar en el articulo 3 de las referencias. Y aunque ya vimos cual es la minima cantidad de guardias para asegurar la visibilidad no hemos definido que es la visibilidad. La visibilidad se define de tal manera que dos puntos u y v son mutuamente visibles si el segmento de línea que los une se encuentra dentro del polígono.

## DDA Raycasting algorithm

Para probar el algoritmo, y ver cómo podría ser aplicado para resolver el problema de visibilidad en una superficie 2D con obstáculos se presenta el siguiente código (Si tiene problemas interactuando con él, haga click sobre cualquier punto de la cuadrícula):

Con el cursor puede desplazar el círculo verde sobre la plantilla. haciendo y sosteniendo el click izquierdo puede "colorear" las celdas de la cuadrícula. Las celdas coloreadas serán obstáculos.

El círculo rojo, que se puede controlar con las teclas asdw, emite un rayo en la dirección del cursor. Podrá ver como el rayo choca con el obstáculo más cercano.

> :Tabs
> > :Tab title=Presentación
> > >
> > > :P5 lib1=https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.js, sketch=/docs/sketches/Raycasting/sketch.js
>
> > :Tab title=P5Code
> >
> > ```js
const ROWS = 30;
const COLS = 30;
const LENGTH = 20;
var quadrille
var c;
let x = 200
let y = 200
let drawLine = false
let start, end
function setup() {
  createCanvas(COLS * LENGTH, ROWS * LENGTH);
  c = color('#007ACC');
  quadrille = createQuadrille(floor(ROWS), floor(COLS));
  for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < COLS; column++) {
      if((row == 0 || row == ROWS - 1) || (column == 0 || column == COLS - 1))
        quadrille.fill(floor(row), floor(column),c)
    }
  }
}
function draw() {
  background('#060621');
  end = createVector(mouseX, mouseY)
  drawQuadrille(quadrille, 0, 0, LENGTH, 1, 'black', true);
  //
  fill(0,255,0)
  stroke(0,255,0)
  circle(mouseX, mouseY, 10)
  //
  fill(255, 0, 0)
  stroke(255, 0, 0)
  updatePosition()
  circle(x, y, 10)
  //
  stroke(255, 255, 0)
  start = createVector(x, y)
  let direction = end.sub(start).normalize()
  //
  let scalingVector = createVector(
    sqrt(1 + pow(direction.y/direction.x, 2)),
    sqrt(1 + pow(direction.x/direction.y, 2)) 
    )
let currentPositionVector = createVector(start.x, start.y);
let rayLengths = createVector(0, 0);
let stepVector = createVector();
// Establish Starting Conditions
if (direction.x < 0)
{
  //console.log(direction.x, direction.y)
  stepVector.set(-1, stepVector.y)
  rayLengths.set((start.x - currentPositionVector.x) * scalingVector.x, rayLengths.y);
}
else
{
  stepVector.set(1, stepVector.y);
  rayLengths.set((currentPositionVector.x + 1 - start.x) * scalingVector.x, rayLengths.y);
}
if (direction.y < 0)
{
  //console.log(direction.x, direction.y)
  stepVector.set(stepVector.x, -1);
  rayLengths.set(rayLengths.x, (start.y - currentPositionVector.y) * scalingVector.y);
}
else
{
  stepVector.set(stepVector.x, 1);
  rayLengths.set(rayLengths.x, (currentPositionVector.y + 1 - start.y) * scalingVector.y);
}
//console.log(scalingVector.toString())
let bTileFound = false;
let fMaxDistance = 600.0;
let fDistance = 0.0;
  while (!bTileFound && fDistance < fMaxDistance)
  {
    // Walk along shortest path
    if (rayLengths.x < rayLengths.y)
    {
      currentPositionVector.x += stepVector.x;
      fDistance = rayLengths.x;
      rayLengths.x += scalingVector.x;
    }
    else
    {
      currentPositionVector.y += stepVector.y;
      fDistance = rayLengths.y;
      rayLengths.y += scalingVector.y;
    }
    if (currentPositionVector.x >= 0 && currentPositionVector.x < width && currentPositionVector.y >= 0 && currentPositionVector.y < height)
    {
      if(quadrille.read(floor(currentPositionVector.y/LENGTH), floor(currentPositionVector.x/LENGTH)) == c)
      {
        bTileFound = true;
        stroke(255, 255, 255)
        noFill()
        circle(currentPositionVector.x, currentPositionVector.y, 10)
        stroke(255, 255, 0)
        line(start.x, start.y, currentPositionVector.x, currentPositionVector.y)
      }
    }
  }
}
function updatePosition(){
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    x-=5;
  }else if(keyIsDown(RIGHT_ARROW) || keyIsDown(68) ) {
    x+=5;
  }else if(keyIsDown(UP_ARROW)|| keyIsDown(87)){
    y-=5;
  }else if(keyIsDown(DOWN_ARROW)|| keyIsDown(83)){
    y+=5;
  }
  return {"x": x, "y": y}
}
function mouseDragged(){
  let thisRow = map(mouseY, 0, height, 0, ROWS, true)
  let thisColumn = map(mouseX, 0, width, 0, COLS, true)
  quadrille.fill(floor(thisRow), floor(thisColumn),c)
}
> > ```

## REFERENCES

1. Trivedi, J. (2015). Simulation of DDA (Digital Differential Analyzer) Line Generation Algorithm. IJCSN International Journal of Computer Science and Network, 110-111.
2. Yang, Z., Wang, Z., Peng, K., Yang, W., & Liu, L. (2012, September). Design and Implementation of Digital Integral Interpolator Based on LabVIEW. In 2nd International Conference on Electronic & Mechanical Engineering and Information Technology. Atlantis Press.
3. Chesnokov, N. (2018). The Art Gallery Problem: An Overview and Extension to Chromatic Coloring and Mobile Guards.


> :ToCPrevNext
