const THREE = require('three');

export default class MaterialTile {
    constructor() {
        new Error("Don't create instance")
    }

    static get() {
        if (MaterialTile.material) {
            return MaterialTile.material;
        }

        const vertexShader = require('@/shaders/tile.vert');
        const fragmentShader = require('@/shaders/tile.frag');

        const uniforms = {
            time: {type: 'f', value: 0.0}
        };

        MaterialTile.material = new THREE.RawShaderMaterial({
            uniforms, vertexShader, fragmentShader, transparent: true,
            side: THREE.BackSide, depthTest: true
        });

        return MaterialTile.material
    }

    static reload() {
        if (MaterialTile.material) {
            MaterialTile.material.uniforms.time.value = performance.now() * 0.001;
        }
    }

    static material;
}