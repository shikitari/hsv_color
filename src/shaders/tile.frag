precision highp float;
uniform float time;

varying vec2 vUv;
//varying vec3 vColor;
// varying vec3 vPosition;

#define PI 3.14159
#define TWO_PI (PI * 2.0)
#define EPSILON 0.0000001


void main(void){
    vec2 coordinate = vUv;
    coordinate = coordinate * 2500.0;

    // If odd thread, value is 1.0. 
    vec2 oddThread;
    oddThread.x = step(1.0, mod(coordinate.y, 2.0));
    oddThread.y = 1.0 - step(1.0, mod(coordinate.x, 2.0));

    float oddX = step(0.999999, oddThread.x);
    float c = abs(oddThread.y - (oddX * 1.0));
    c = c * 0.1 + 0.65;
    
    // coordinate = fract(coordinate);

    gl_FragColor = vec4(c, c, c, 1.0);
}