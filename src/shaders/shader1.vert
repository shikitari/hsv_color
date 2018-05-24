uniform float time;
uniform float slope;
uniform float openAngle;
uniform float phase;
uniform float scale;

// built-in
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;

attribute vec3 position;
attribute vec3 normal;
//attribute vec2 uv;
attribute vec3 color;//if use vertex color

//varying vec2 vUv;
//varying vec3 vColor;
varying vec3 vPosition;

#define PI 3.14159
#define TWO_PI (PI * 2.0)
#define EPSILON 0.00001

vec3 rotateY(in vec3 v, in float a) {
    vec3 r = v;
    r.x =  cos(-a) * v.x + sin(-a) * v.z;
    r.z = -sin(-a) * v.x + cos(-a) * v.z;
    return r;
}

void main()
{
    //vUv = uv;
    //vColor = color;
    vPosition = position;
    vPosition.xz = vPosition.xz * scale;

    float angle = atan(position.z - EPSILON, position.x - EPSILON);
    angle = angle + TWO_PI;//PI to (TWO_PI + PI). adjust phase.
    angle = mod(angle, TWO_PI);
    
    float d = distance(vec2(0.0, 0.0), position.xz);

    // for debug
    // float openAngle = (sin(time) * 0.5 + 0.5) * TWO_PI;
    // float phase = 0.;

    float eValue = step(EPSILON, d);
    float aValue = 1.0 - step(openAngle, angle);
    float oValue = 1.0 - step(TWO_PI * 0.99, openAngle);//max open angle
    float value = (1.0 - (eValue * aValue)) * oValue;

    vPosition.xz = vPosition.xz * value;

    // use matrix. Any axis rotation
    // mat4 rotation = rotationMatrix(vec3(0.0, 1.0, 0.0),  openAngle / -2.0 + phase);
    // vPosition = (rotation * vec4(vPosition, 1.0)).xyz;

    // Due to only Y axis, don't use matrix. which fater?
    vPosition = rotateY(vPosition, openAngle / -2.0 + phase);

    gl_Position = projectionMatrix * modelViewMatrix  * vec4(vPosition, 1.0);
}
