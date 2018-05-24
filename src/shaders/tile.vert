uniform float time;

// built-in
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec3 color;//if use vertex color

varying vec2 vUv;
//varying vec3 vColor;
// varying vec3 vPosition;

void main()
{
    vUv = uv;
    //vColor = color;
    // vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
