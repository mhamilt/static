attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;

void main()
{
  vTexCoord = aTexCoord; // copy the texcoords
  vec4 positionVec4 = vec4(aPosition, 1.0); // copy the position data into a vec4, using 1.0 as the w component
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  gl_Position = positionVec4; // send the vertex information on to the fragment shader
}
