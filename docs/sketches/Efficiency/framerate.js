let videoElement;

function setup() {
  
  videoElement = createVideo("/vc/docs/sketches/LumaShader/Luma_Video/SpaceJam.mp4");
  videoElement.parent("SpaceJam");
  var myCanvas = createCanvas(710, 400);
  myCanvas.parent("video-position");
  videoElement.play();
  videoElement.volume(0);
  videoElement.autoplay(true);
  videoElement.size(640, 360);
  videoElement.loop();
  
}
function draw() {
  background(255, 255, 255);
  textSize(20);
  let fr = frameRate();
  frate[count] = fr;
  count++;
  textSize(30);
  text(avg, 100, 400);
  text("- Frame Rate with frameRate() = " + frameRate().toFixed(3), 100, 30);
  text("- Frames that have passed with frameCount = " + frameCount, 100, 70);
  text("- Time difference between the beginning of the previous frame",100, 110);
  text("and the beginning of the current frame with deltaTime = " +deltaTime.toFixed(3),100,135);
}
