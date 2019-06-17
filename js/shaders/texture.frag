precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D texture;

void main()
{
  // by default, our texcoords will be upside down
  // lets flip them by inverting the y component
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;

  // we can access our image by using the GLSL shader function texture2D()
  // texture2D expects a sampler2D, and texture coordinates as it's input
  vec4 image = texture2D(texture, uv);

  // lets invert the colors just for fun
  image.rgb = 1.0 - image.rgb;
  gl_FragColor = image;
}
