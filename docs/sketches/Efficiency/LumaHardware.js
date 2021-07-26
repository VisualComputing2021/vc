let vid;

 function setup() {
   createCanvas(710, 400);
   vid = createVideo(['/vc/docs/sketches/LumaShader/Luma_Video/SpaceJam.mp4'], onVideoLoad);
}

 function draw() {

  background(250, 250, 250);
  textSize(20);
  image(vid, 0, 50, 710, 400);
  loadPixels();
  const step = 1;
  for (let y = 0; y < height; y+= step) {
    for (let x = 0; x < width; x+= step) {
       let index = 4 * (x + width * y);
       let r = pixels[index];
       let g = pixels[index + 1];
       let b = pixels[index + 2];
       let gamma = r * 0.299 + g * 0.587 + b * 0.0114;
       let grayColor = color(gamma, gamma, gamma);
       pixels[index] = gamma;
       pixels[index + 1] = gamma;
       pixels[index + 2] = gamma;
      }
  }
  updatePixels();
  text("Frame con frameRate() = " + frameRate().toFixed(3)*1/2.1416, 100, 30);
}
function onVideoLoad() {
  vid.hide();
  vid.play();
  vid.volume(0);
  vid.autoplay(true);
  vid.size(710, 400);
  vid.loop();
}
