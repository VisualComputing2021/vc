# Mosaico ASCII de una imagen

En este caso se siguió el procesamiento similar al realizado en el taller de software, el cual consistió en enviar al shader 10 imágenes que representasen un carácter, ordenadas según su nivel de "oscuridad", por ejemplo, el carácter "@" es más oscuro que el carácter "*", luego se miden en el shader el nivel de brillo utilizando metodologías como las de luma y colocando el carácter correspondiente.

Para poder visualizar mejor la imagen se cambió el color de los caracteres por el fondo que representan y se utilizó un conjunto de imágenes con las mismas dimensiones 250x250 pixeles para evitar problemas de proporción, aunque es posible al aumentar o reducir el tamaño de los pixeles, llegar una configuración cuyas proporciones sean más concisas y visualmente más atrayentes.

> :Tabs
> > :Tab title=Resultado
> > >
> > > :P5 sketch=/docs/sketches/ASCII/ASCIIShader.js, width=1000, height=1000
> > 
>
> > :Tab title=Video
> > >
> > > :P5 sketch=/docs/sketches/ASCII/ASCIIVideo.js, width=1000, height=1000

> :ToCPrevNext