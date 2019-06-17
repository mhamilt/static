let message;
let pass1, pass2;
let curRad = 0;
let rpf = 2 * 3.14159 * 0.05 * 0.3;
let blurShader;
preload = function()
{
  blurShader = loadShader('vert.txt', 'blur.txt');
};

function setup()
{
  //------------------------------------------------
  createCanvas(400, 400, WEBGL);
  frameRate(30);
  //------------------------------------------------
  blurShader.setUniform("blurSize", 60);
  blurShader.setUniform("sigma", 5.0);
  blurShader.setUniform("horizontalPass", 1);
  //------------------------------------------------
  message = createGraphics(width, height, P2D);
  pass1 = createGraphics(width, height, WEBGL);
  // pass2 = createGraphics(width, height, WEBGL);
  // //------------------------------------------------
  // pass1.shader(blurShader)
  // //------------------------------------------------
  // pass2.shader(blurShader)
  // //------------------------------------------------
  message.background(0);
  message.textAlign(CENTER);
  message.fill(255);
  message.text('word', width / 2, height / 2);
  // texture(message);
  shader(blurShader)
}

function draw()
{
  // let lfo = (sin(curRad) + 2) * 3;
  // curRad += rpf;

  push()
  translate(-width / 2, -height / 2, 0);
  // blurShader.setUniform('texture', message);
  // makePass(pass1, message);
  // image(message, 0, 0);
  beginShape();
  vertex(0, 0);
  vertex(width, 0);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  pop();
}

function makePass(pg, pgtexture)
{
  pg.push();
  pg.translate(-width / 2, -height / 2, 0);
  pg.image(pgtexture, 0, 0);
  blurShader.setUniform('texture', pgtexture);
  pg.pop();
}
