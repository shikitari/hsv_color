const THREE = require('three');

export default class Sphere extends THREE.Mesh{
    
    constructor() {
        const g = new THREE.SphereBufferGeometry(0.05, 32, 32);

        const material = new THREE.MeshBasicMaterial({
            color: 0xff0000, transparent: true,
            side: THREE.FrontSide, depthTest: false
        });

        super(g, material);
        this.position.x = 0;
        this.position.y = 0;
        this.position.z = 0;
        
        this.renderOrder = 500;
    }
    set Position({x, y, z}) {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }

    set Color(colors) {
        this.material.color.setRGB(colors[0], colors[1], colors[2]);
    }

    set AlwaysTop(value) {
        this.material.depthTest = !value;
        this.material.depthWrite = !value;
    }
}