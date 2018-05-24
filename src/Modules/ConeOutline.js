import Cone from './Cone';
const THREE = require('three');
import MaterialGlow from './MaterialGlow'

export default class ConeOutline extends THREE.Mesh{    
    static scale = 1.0;
    constructor() {
        super();
        this.renderOrder = 100;
        this.create();
    }

    // If we consider performance, We should Create BufferGeometry fully.
    create() {   
        const matrix = (new THREE.Matrix4()).identity();
        matrix.multiply((new THREE.Matrix4()).makeTranslation(0, 0.5, 0));
        matrix.multiply((new THREE.Matrix4()).makeRotationX(Math.PI));        

        const geometry = new THREE.ConeBufferGeometry(Cone.radius * ConeOutline.scale, Cone.heightCone * ConeOutline.scale, Cone.radialSegments, 6, false);
        geometry.applyMatrix(matrix);  
        const materialOutline = new THREE.MeshBasicMaterial(
            {color: 0xfffffff, side: THREE.FrontSide, depthTest: true, depthWrite: true,
                 transparent: true, opacity: 0.25});

        this.geometry = geometry;
        this.material = MaterialGlow.get();

        return materialOutline;
    }
}
