precision highp float;
uniform float time;
uniform vec3 cameraPosition;

//varying vec2 vUv;
//varying vec3 vColor;
varying vec3 vPosition;
varying vec3 vPositionModel;
varying vec3 vNormal;
varying float lid;
varying float viewRatioAxisY;
varying float zeroPoint;

void main(void){
    float d = distance(vec2(0.0, 0.0), vPositionModel.xz);
    float radius = (d / 0.5);
    radius = smoothstep(0.95, 1.0, radius);
    float alpha;

    if (lid >= 0.99) {
        radius *= viewRatioAxisY;
        alpha = radius;  
    } else {
        vec3 viewDirectionNormal = normalize(cameraPosition - vPosition);
        float glow = dot(viewDirectionNormal, vNormal);
        glow = max(0.0, glow);
        glow = 1.0 - glow;
        glow = smoothstep(0.5, 1.0, glow);

        glow *= (1.3 - viewRatioAxisY); 
        radius *= viewRatioAxisY;
        alpha = (glow + radius) / 2.0;
        alpha += zeroPoint * 0.5;
    }

    // alpha = alpha * (sin(time * 3.14) * 0.5 + 0.9);
    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha); 
    // gl_FragColor = vec4(zeroPoint, 0., 0., 1.0);
}