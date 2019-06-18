let shdr;
let lfoHz = 0.1;
let lfo = 0;
let radPerFrame = 2 * 3.14159 * lfoHz * 0.03
//==============================================================================
let brownNoise;
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
  noise.noStroke();
  noise.shader(noiseShader);
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

  noiseShader.setUniform('resolution', [width, height]);
  noise.rect(0, 0, width, height);
  //----------------------------------------------------------------------------
  brownNoise = new p5.Noise('brown');
}
//==============================================================================
let stage = 0;

function draw()
{
  switch (stage)
  {
    case 0:
      showMessage()
      break;
    case 1:
      makeNoise();
      break;
    default:
  }

}

function makeNoise()
{
  //----------------------------------------------------------------------------
  noise.shader(noiseShader);
  noiseShader.setUniform('time', millis() / 1000.);
  noise.rect(0, 0, width, height);
  //----------------------------------------------------------------------------
  makePass(pass1, blurH, noise, 0);
  makePass(pass2, blurV, pass1, 1);
  //----------------------------------------------------------------------------
  image(noise, 0, 0);
  image(pass2, 0, 0);
  //----------------------------------------------------------------------------
}

function showMessage()
{
  makePass(pass1, blurH, message, 0,((Math.cos(millis()/500.))+1)*0.5);
  makePass(pass2, blurV, pass1, 1,((Math.cos(millis()/500.))+1)*0.5);
  //----------------------------------------------------------------------------
  image(pass2, 0, 0);
  image(message, 0, 0);
  //----------------------------------------------------------------------------
}

//==============================================================================
function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
  // createMessage();
}
//==============================================================================
function makePass(pg, shader, texture, direction, time)
{
  // pg.shader(shader);
  shader.setUniform('texture', texture);
  shader.setUniform('time', time);
  pg.rect(0, 0, width, height);
}
//==============================================================================
function createMessage()
{
  message = createGraphics(width, height, P2D);
  message.background(0, 0);
  message.textAlign(CENTER);
  message.fill(255);
  message.text('Press anywhere...', width / 2, height / 2);
}
//==============================================================================
function setupBlur(blurShader, direction)
{
  blurShader.setUniform('sigma', 20.0);
  blurShader.setUniform('horizontalPass', direction);
  blurShader.setUniform('resolution', [width, height]);
}

//==============================================================================
function mouseClicked()
{
  if (getAudioContext().state !== 'running')
  {
    getAudioContext().resume();
  }
  brownNoise.amp(0.1);
  brownNoise.start();
  stage = 1;
}

function touchStarted()
{
  if (getAudioContext().state !== 'running')
  {
    getAudioContext().resume();
  }
  brownNoise.amp(0.1);
  brownNoise.start();
  stage = 1;
}
//==============================================================================
