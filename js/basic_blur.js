// this time we're going to send an image to the shader
// in shaderland, an image is called a "texture"
// https://p5js.org/reference/#/p5.Shader/setUniform

// a shader variable
let uniformsShader;
let message;
let pass1, pass2;
let curRad = 0;
let rpf = 2 * 3.14159 * 0.05 * 0.3;

function preload()
{
  uniformsShader = loadShader('textvert.txt', 'blur.txt');
}

function setup()
{
    //------------------------------------------------
  var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
    //------------------------------------------------
  message = createGraphics(width, height, P2D);
  //------------------------------------------------
  message.background(0);
  message.textAlign(CENTER);
  message.fill(255);
  message.text('word', width/2 , height/2);
  shader(uniformsShader);
  uniformsShader.setUniform('horizontalPass',0);
}

function draw()
{
  uniformsShader.setUniform('texture', message);
  rect(0,0,width, height);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
