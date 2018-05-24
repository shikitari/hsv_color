precision highp float;
uniform float time;
uniform float slope;

//varying vec2 vUv;
//varying vec3 vColor;
varying vec3 vPosition;

#define PI 3.14159
#define TWO_PI (PI * 2.0)
#define EPSILON 0.0000001

//https://thebookofshaders.com/06/
vec3 rgb2hsb( in vec3 c ){
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz),
                 vec4(c.gb, K.xy),
                 step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r),
                 vec4(c.r, p.yzx),
                 step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)),
                d / (q.x + e),
                q.x);
}

//https://www.shadertoy.com/view/MsS3Wc
vec3 hsv2rgb( in vec3 c )
{
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
    return c.z * mix( vec3(1.0), rgb, c.y);
}

void main(void){
    float angle = (atan(vPosition.z, vPosition.x) + PI) / TWO_PI;
    float d = distance(vec2(0.0, 0.0), vPosition.xz);

    float alpha;
    vec3 c;
    if (vPosition.y > 1.0) {
        c = vec3(1.0, 1.0, 1.0);
        alpha = 0.5;
    }else {
        float satulation =  d / (slope * vPosition.y);
        
        if (satulation > 1.0) {
            c = hsv2rgb(vec3(angle, 1.0, vPosition.y));
            alpha = 0.5;
        } else {
            c = hsv2rgb(vec3(angle, satulation, vPosition.y));
            alpha = 1.0;
        }
    }
    gl_FragColor = vec4(c, alpha);
}