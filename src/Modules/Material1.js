const THREE = require('three');

export default class Material1 {
    constructor() {
        new Error("Don't create instance")
    }

    static getInstance() {
        if (Material1.material) {
            return Material1.material;
        }

        const vertexShader = require('@/shaders/shader1.vert');
        const fragmentShader = require('@/shaders/shader1.frag');

        const uniforms = {
            time: {type: 'f', value: 0.0},
            slope: {type: 'f', value: 0.5},
            openAngle: {type: 'f', value: 0},
            phase: {type: 'f', value: 0},
            scale: {scale: 'f', value: 1.0}
        };

        Material1.material = new THREE.RawShaderMaterial({
            uniforms, vertexShader, fragmentShader, transparent: true,
            side: THREE.FrontSide, depthTest: true
        });

        return Material1.material
    }

    static reload(openAngle, phase, scale) {
        if (Material1.material) {
            // console.log(scale);
            
            Material1.material.uniforms.time.value = performance.now() * 0.001;
            Material1.material.uniforms.openAngle.value = openAngle;
            Material1.material.uniforms.phase.value = phase;
            Material1.material.uniforms.scale.value = scale; 
        }
    }

    static material;
}