let video;
let theShader;
let planeSide = 400;
let button;
let button_2;
let button_3;
let button_4;
let filterChoice = 1;
let mask;
function preload(){
    theShader = loadShader("/vc/docs/sketches/ConvolutionShader/conv.vert","/vc/docs/sketches/ConvolutionShader/conv.frag");
    video = createVideo('/vc/docs/sketches/LumaShader/Luma_Video/SpaceJam.mp4');
}
function setup() {
    createCanvas(710, 400, WEBGL);
    video.loop();
    video.hide();
    video.volume(0);
    noStroke();
    button = createButton('Sin filtro');
    button.position(600, 10);
    button.style("color", "#00b5e2");
    button.mousePressed(function () {
        filterChoice = 1;
        button.style("color", "#00b5e2");
        button_2.style("color", "#000000");
        button_3.style("color", "#000000");
        button_4.style("color", "#000000");
    });
    button_2 = createButton('Filtro   1');
    button_2.position(600, 40);
    button_2.mousePressed(function () {
        filterChoice = 2;
        button_2.style("color", "#00b5e2");
        button.style("color", "#000000");
        button_3.style("color", "#000000");
        button_4.style("color", "#000000");
    });
    button_3 = createButton('Filtro   2');
    button_3.position(600, 70);
    button_3.mousePressed(function () {
        filterChoice = 3;
        button_3.style("color", "#00b5e2");
        button_2.style("color", "#000000");
        button.style("color", "#000000");
        button_4.style("color", "#000000");
    });
    button_4 = createButton('Filtro   3');
    button_4.position(600, 100);
    button_4.mousePressed(function () {
        filterChoice = 4;
        button_4.style("color", "#00b5e2");
        button_2.style("color", "#000000");
        button_3.style("color", "#000000");
        button.style("color", "#000000");
    });
    textureMode(NORMAL);
    shader(theShader);
    theShader.setUniform("u_img_unit", [1/video.width, 1/video.height]);
    theShader.setUniform("u_texture", video);
}
function draw() {
    background(220);
    switch (filterChoice) {
        case 1:
            mask = [0, 0, 0, 0, 1, 0, 0, 0, 0];
            break;
        case 2:
            mask = [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9];
            break;
        case 3:
            mask = [-1, -1, -1, -1, +9, -1, -1, -1, -1];
            break;
        case 4:
            mask = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
            break;
        default:
            break;
    }
    theShader.setUniform("u_mask", mask);
    beginShape();
    vertex(-planeSide/2, -planeSide/2, 0, 0); // esquina inferior izquierda
    vertex(planeSide/2, -planeSide/2, 1, 0); // esquina inferior derecha
    vertex(planeSide/2, planeSide/2, 1, 1); // esquina superior derecha
    vertex(-planeSide/2, planeSide/2, 0, 1); // esquina superior izquierda
    endShape(CLOSE);
}
