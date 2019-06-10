let shdr;
var lfoHz = 0.1;
var lfo = 0;
var radPerFrame = 2 * 3.14159 * lfoHz * 0.03
var noise;
//==============================================================================
preload = function()
{
  shdr = loadShader('js/shaders/vert.shader', 'js/shaders/frag.shader');
};
//==============================================================================
function mouseClicked()
{
  if (getAudioContext().state !== 'running')
  {
    getAudioContext().resume();
  }
}
//==============================================================================
function setup()
{
  var canvas = createCanvas($(window).width(), $(window).height(), WEBGL);
  frameRate(30);
  canvas.parent('sketch-holder');
  pg = createGraphics(200, 200);
  pg.textSize(75);
  pg.background(50, 0);
  background(50, 0);
  fill(50);
  texture(pg);
  shader(shdr);
  shdr.setUniform('resolution',[width,height]);

  noise = new p5.Noise('brown');
  // noise.amp(0.1);
  noise.start();
}

//==============================================================================
function draw()
{
  let lfoVal = ((sin(lfo) + 1) * 0.5);
  noise.amp(lfoVal);
  shdr.setUniform('lfo', lfoVal);
  lfo += radPerFrame;
  shdr.setUniform('time',millis()*0.001);
  push();
  translate(-width/2, -height/2, 0);
  beginShape();
  vertex(0, 0);
  vertex(width, 0);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  pop();
}
//==============================================================================
function windowResized()
{
  resizeCanvas($(window).width(), $(window).height());
}

//==============================================================================
