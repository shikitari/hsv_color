precision highp float;
uniform float time;
uniform float slope;

//varying vec2 vUv;
varying vec3 vColor;
varying vec3 vPosition;

#define PI 3.14159
#define TWO_PI (PI * 2.0)
#define EPSILON 0.000001

//https://www.shadertoy.com/view/MsS3Wc
vec3 hsv2rgb( in vec3 c ) {
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
    return c.z * mix( vec3(1.0), rgb, c.y);
}

void main(void)
{
    // vec3 color = vColor;
    float angle = (atan(vPosition.z, vPosition.x) + TWO_PI);
    angle = mod(angle, TWO_PI);
    angle /= TWO_PI;
    float d = distance(vec2(0.0, 0.0), vPosition.xz);

    //When out of color space, value is ZERO.
    float yValue = 1.0 - step(1.0 + EPSILON, vPosition.y);
    float dValue = 1.0 - step(1.0 + EPSILON, d);
    float value = yValue * dValue;

    float satulation =  d / (slope * vPosition.y);
    satulation = min(1.0, satulation);

    vec3 color = hsv2rgb(vec3(angle, satulation, vPosition.y)) * value;
    float alpha = value;

    gl_FragColor = vec4(color, alpha);
    // gl_FragColor = vec4(1., 0., 0., 1.);
    // gl_FragColor = vec4(vColor, 1.);
}