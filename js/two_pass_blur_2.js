//==============================================================================
let blurH, blurV;
let message, pass1, pass2, noise;
let curRad = 0;
let rpf = 2 * 3.14159 * 0.05 * 0.3;
//==============================================================================
function preload()
{
  blurH = loadShader('js/shaders/texture.vert', 'js/shaders/blur.frag');
  blurV = loadShader('js/shaders/texture.vert', 'js/shaders/blur.frag');
  noiseShader = loadShader('js/shaders/basic.vert', 'js/shaders/static.frag');
}
//==============================================================================
function setup()
{
  //----------------------------------------------------------------------------
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');
  noStroke();
  //----------------------------------------------------------------------------
  createMessage();
  //----------------------------------------------------------------------------
  noise = createGraphics(width, height, WEBGL);
  pass1.noStroke();
  pass1.shader(noiseShader);
  //----------------------------------------------------------------------------
  pass1 = createGraphics(width, height, WEBGL);
  pass1.noStroke();
  pass1.shader(blurH);
  //----------------------------------------------------------------------------
  pass2 = createGraphics(width, height, WEBGL);
  pass2.noStroke();
  pass2.shader(blurV);
  //----------------------------------------------------------------------------
  setupBlur(blurH, 0);
  setupBlur(blurV, 1);
}
//==============================================================================
function draw()
{
  //----------------------------------------------------------------------------
  makePass(pass1, blurH, message, 0);
  makePass(pass2, blurV, pass1, 1);
  //----------------------------------------------------------------------------
  image(pass2, 0, 0, width, height);
  image(message, 0, 0, width, height);
  //----------------------------------------------------------------------------
}
//==============================================================================
function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
  createMessage();
}
//==============================================================================
function makePass(pg, shader, texture, direction)
{
  pg.shader(shader);
  shader.setUniform('texture', texture);

  pg.rect(0, 0, width, height);
}
//==============================================================================
function createMessage()
{
  message = createGraphics(width, height, P2D);
  message.background(0, 0);
  message.textAlign(CENTER);
  message.fill(255);
  message.text('word', width / 2, height / 2);
}
//==============================================================================
function setupBlur(blurShader, direction)
{
  blurShader.setUniform('sigma', 10.0);
  blurShader.setUniform('horizontalPass', direction);
  blurShader.setUniform('resolution', [width, height]);
}
