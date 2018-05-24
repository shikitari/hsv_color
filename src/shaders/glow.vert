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

//varying vec2 vUv;
//varying vec3 vColor;
varying vec3 vPosition;
varying vec3 vPositionModel;
varying vec3 vNormal;
varying float lid;
varying float viewRatioAxisY;
varying float zeroPoint;

void main()
{
    //vUv = uv;
    //vColor = color;

    vNormal = (modelMatrix *  vec4(normal, 1.0)).xyz;
    // vNormal =   (modelMatrix * vec4((position - vec3(0.0, 0.5, 0.0)), 1.0)).xyz;
    vPositionModel = position;
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;

    vec3 viewDirectionNormal = normalize(cameraPosition - vPosition);
    lid = dot(vec3(0.0, 1.0, 0.0), normal);
    lid = abs(lid);
    lid = step(0.999, lid);

    vec3 view = cameraPosition;
    view = normalize(view);
    viewRatioAxisY = abs(dot(view, vec3(0.0, -1.0, 0.0)));
    viewRatioAxisY = smoothstep(0.001, 1.0, viewRatioAxisY);

    zeroPoint = 1.0 - distance(vec3(0, 0, 0), position);
    zeroPoint = max(0.0, zeroPoint);
    zeroPoint = pow(zeroPoint, 5.0);
    zeroPoint = smoothstep(0.99, 1.0, zeroPoint);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
