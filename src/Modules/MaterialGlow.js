const THREE = require('three');

export default class MaterialGlow {
    constructor() {
        new Error("Don't create instance")
    }

    static get() {
        if (MaterialGlow.material) {
            return MaterialGlow.material;
        }

        const vertexShader = require('@/shaders/glow.vert');
        const fragmentShader = require('@/shaders/glow.frag');

        const uniforms = {
            time: {type: 'f', value: 0.0}
        };

        MaterialGlow.material = new THREE.RawShaderMaterial({
            uniforms, vertexShader, fragmentShader, transparent: true,
            side: THREE.FrontSide, depthTest: true, depthWrite: false
        });

        return MaterialGlow.material
    }

    static reload() {
        if (MaterialGlow.material) {
            MaterialGlow.material.uniforms.time.value = performance.now() * 0.001;
        }
    }

    static material;
}