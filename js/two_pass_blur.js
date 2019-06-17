// Basic 2 Pass Shader Blur in P5
//==============================================================================
let blurH, blurV;
let pass1, pass2, message;
//==============================================================================
function preload()
{
  blurH = loadShader('vert.txt', 'frag.txt');
  blurV = loadShader('vert.txt', 'frag.txt');
}
//==============================================================================
function setup()
{
  createCanvas(windowWidth, windowHeight);
  noStroke();
  //----------------------------------------------------------------------------
  message = createGraphics(windowWidth, windowHeight, P2D);
  message.background(0);
  message.textAlign(CENTER);
  message.fill(255);
  message.text('word', width / 2, height / 2);
  //----------------------------------------------------------------------------
  // initialize the createGraphics layers
  pass1 = createGraphics(windowWidth, windowHeight, WEBGL);
  pass2 = createGraphics(windowWidth, windowHeight, WEBGL);
  pass1.noStroke();
  pass2.noStroke();
  //----------------------------------------------------------------------------
}
//==============================================================================
function draw()
{
  //----------------------------------------------------------------------------
  pass1.shader(blurH);
  blurH.setUniform('tex0', message);
  blurH.setUniform('texelSize', [0.5 / width, .5 / height]);
  blurH.setUniform('direction', [1.0, 0.0]);
  pass1.rect(0, 0, width, height);
  //----------------------------------------------------------------------------
  pass2.shader(blurV);
  blurV.setUniform('tex0', pass1);
  blurV.setUniform('texelSize', [1.0 / width, 1.0 / height]);
  blurV.setUniform('direction', [0.0, 1.0]);
  pass2.rect(0, 0, width, height);
  //----------------------------------------------------------------------------
  image(pass2, 0, 0, width, height);
}
//==============================================================================
function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
}
