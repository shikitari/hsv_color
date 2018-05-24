const THREE = require('three');
import MaterialTile from './MaterialTile'

export default class Room extends THREE.Mesh{
    
    constructor() {
        super();
        this.renderOrder = 10;

        const g = new THREE.CubeGeometry(100, 100, 100);
        const m = MaterialTile.get();
        this.rotation.x = -0.5 * Math.PI;

        this.geometry = g;
        this.material = m;
    }
}