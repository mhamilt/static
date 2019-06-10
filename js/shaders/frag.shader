//==============================================================================
// Base P5 Fragment Shader
//==============================================================================
#ifdef GL_ES
precision mediump float; // set precision level if available
#endif
//==============================================================================
// Global Constants
const float twoPi = 6.283185307179586;
//==============================================================================
// input variables
uniform float time;
uniform float lfo;
uniform vec2 mouse;
uniform vec2 resolution;
//==============================================================================
// varying: these have all come from the vertex shader
varying vec3 var_vertPos;
varying vec4 var_vertCol;
varying vec3 var_vertNormal;
varying vec2 var_vertTexCoord;
varying vec4 v_color;
//==============================================================================
float random (vec2 st)
{
  return fract(sin(dot(st.xy, vec2(12.8898,78.233))+time) * 43758.5453123);
}
//==============================================================================
const float maxz = 1.0/50.0;
void main( void )
{
  vec2 st = floor(gl_FragCoord.xy)/resolution.xy;
  float rnd = random( st);
  gl_FragColor = vec4(vec3(rnd*lfo) + vec3((1.0-lfo)*0.1) ,1.0);
}
