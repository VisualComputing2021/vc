# CONCLUSIONES Y TRABAJO FUTURO

## Escala de grises

El desarrollo de la porción de p5 js para esta asignación fue relativamente sencilla, el lenguaje facilita la comunicación con los shaders y fue sencillo la creación de variables uniformes. El código también es lo suficientemente general que se puede usar de base para realizar otros programas que manipulan imágenes con shaders.

El código de shaders, puntualmente el fragment shader fue un primer acercamiento al código en glsl, el cual cuenta con sintaxis sencilla que resulta bastante similar a la de otros lenguajes como C o C++.

## Convoluciones

En este ejercicio se aprovechó la amplia gama de herramientas que provee p5 para interactuar con el usuario, permitiéndole al usuario escoger entre varios filtros. A manera de nota futura se señala la posibilidad de añadir más opciones de filtros, o incluso una cuadrícula interactiva donde el usuario pueda ingresar los valores que desee para formar su propia máscara.

El código del fragment shader es un buen ejemplo de por qué los shaders son una herramienta tan poderosa. Por experiencias pasadas sabíamos que el cálculo de convoluciones era un proceso extremadamente engorroso, de hecho, la función empleada para hacer esto en software es bastante larga. En cambio con el fragment shader resultó mucho más sencillo, al solo tener que preocuparnos por un pixel, sabiendo que el comportamiento sería el mismo para todos.


De todas formas, más allá de las facilidades brindadas por glsl, es de señalar que hubo dificultades para manejar máscaras de tamaños variables, pues el lenguaje resulta muy poco flexible para manipular vectores de tamaños variables.

## Conclusiones generales

- El uso de shaders mejoró substancialmente el rendimiento de los programas, ya que la fluidez de la página no se vio afectada por la cantidad de scripts de p5 que embebimos en ella.
- El proceso de desarrollo fuy mucho más agradable usando VS Code con las siguientes extenciones.
    - GLSL Lint
    - Live Server
    - p5.vscode
    - p5js Snippets

    Para futuros trabajos no se recomienda usar el IDE que proporciona processing  