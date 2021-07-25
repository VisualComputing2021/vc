# Mosaico de una imagen a partir de imagenes pequeñas

Para este caso se intentó en una primera instancia utilizar la metodología que se realizó en el taller de software, la cual se fundamenta en utilizar una gran cantidad de imágenes con diferentes tonalidades y gradientes de colores con el fin de substituir cada pixel de la imagen principal con una imagen de la base de datos, pero esto no es posible por las siguientes razones:

1) GLSL solo permite en los shader un máximo de 16 texturas.

2) No hay una forma fácil de manipular grandes cantidades de imágenes en el fragment shader, ya que no se pueden manipular arreglos.

3) No es posible enviar directamente arreglos de imágenes desde el código de js.

Por lo mismo, se utilizó un arreglo de 15 imágenes en blanco y negro con diferente saturación o brillo, a estas se les aplico transparencia a la vez de "mezclar" su color con el del fondo, esto para dar la sensación de un mosaico, pero manteniendo la idea de la imagen original. La fórmula fue la siguiente:

> :Formula
>
> Asciichar = (Asciichar * u_tintColor)/normTint;

Donde cada variable es:

Asciichar => vec4

u_tintColor => vec4( texturaOriginal.r , texturaOriginal.g , texturaOriginal.b , 1.0 )

normTint = 0.30 * u_tintColor.r + 0.59 * u_tintColor.g + 0.11 * u_tintColor.b

> :Tabs
> > :Tab title=Color
> > >
> > > :P5 sketch=/docs/sketches/Mosaico/MosaicShader.js, width=1000, height=1000
> > 
>
> > :Tab title=Video
> > >
> > > :P5 sketch=/docs/sketches/Mosaico/MosaicVideo.js, width=1000, height=1000

> :Tabs
> > :Tab title=BW
> > >
> > > :P5 sketch=/docs/sketches/MosaicBW/MosaicBWShader.js, width=1000, height=1000


> :ToCPrevNext