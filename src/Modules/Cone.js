const THREE = require('three');
import Material1 from './Material1'

export default class Cone extends THREE.Mesh{

    static radialSegments = 64;
    static radius = 0.5;
    static heightCone = 1.0;
    
    constructor() {
        super();
        this.renderOrder = 200;
        this.create();
    }


    // If we consider performance, We should Create BufferGeometry fully.
    create() {
        const matrix = (new THREE.Matrix4()).identity();
        matrix.multiply((new THREE.Matrix4()).makeTranslation(0, 0.5, 0));
        matrix.multiply((new THREE.Matrix4()).makeRotationX(Math.PI));
        const geometry = new THREE.ConeBufferGeometry(Cone.radius, Cone.heightCone, Cone.radialSegments, 1, false);
        geometry.applyMatrix(matrix);  
        const meshMaterial = Material1.getInstance();
        this.geometry = geometry;
        this.material = meshMaterial;
    }
}
