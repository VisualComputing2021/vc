let videoElement;
function setup() {
  videoElement = createVideo(["/vc/docs/sketches/LumaShader/Luma_Video/SpaceJam.mp4"], onVideoLoad);
  createCanvas(710, 50);
}
function draw() {
  background(250,250,250);
  textSize(20);
  text("Frame con frameRate() = " + frameRate().toFixed(3), 100, 30);
}
function onVideoLoad() {
  videoElement.play();
  videoElement.volume(0);
  videoElement.autoplay(true);
  videoElement.size(710, 400);
  videoElement.loop();
}