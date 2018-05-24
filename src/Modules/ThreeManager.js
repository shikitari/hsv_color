import Cone from './Cone';
import ConeOutline from './ConeOutline';
import Room from './Room';
import Sphere from './Sphere';
import Material1 from './Material1'
import {rgb2hsv, mod} from '@/utils/'
import MaterialGlow from './MaterialGlow';

const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE)
//import {debugStats} from './debugStats';

export default class ThreeManager {
    static CameraPos1 = {x: 1, y: 1, z: 1};

    constructor(width, height) {
        this.size = {width, height};
    }

    set GuideVisible(value) {
        if (this.coneOutline) {
            this.coneOutline.visible = value;   
        }
    }
    
    set Colors(rgb) {
        const hsv = rgb2hsv(rgb, true);
        const theta = hsv[0] * Math.PI / 180;
        const radius = hsv[1] * Cone.radius;//saturation
        
        const x = radius * Math.cos(theta);
        const z = radius * Math.sin(theta);
        const y = hsv[2];

        // console.log(`t:${theta} / r:${radius} / ${x} x ${z}`);
        
        if (this.sphere) {
            this.sphere.Position = {x, y, z}; 
            this.sphere.Color = rgb;
            this.sphere.AlwaysTop = false; 
        }
    
    }

    set ConeMaterial({openAngle, phase, scale}) {
        Material1.reload(openAngle, phase, scale);
    }

    init() {
        this.initScene();
        this.initRenderer();
        this.initCamera();
    }
    
    initScene() {
        this.scene = new THREE.Scene();

        // var axes = new THREE.AxesHelper(20);
        // this.scene.add(axes);

        this.room = new Room();
        this.scene.add(this.room);
        
        this.sphere = new Sphere();
        this.scene.add(this.sphere);

        this.cone = new Cone();
        this.scene.add(this.cone);

        this.coneOutline = new ConeOutline();
        this.scene.add(this.coneOutline);
    }

    initRenderer() {
        this.renderer  = new THREE.WebGLRenderer();
        this.renderer.setClearColor(new THREE.Color(0x000000));
        this.renderer.setSize(this.size.width, this.size.height);
    }

    initCamera() {
        // this.camera = new THREE.PerspectiveCamera(45, this.size.width / this.size.height, 0.1, 1000);

        const d = 0.8;
        const offsetY = 0.5;
        this.camera = new THREE.OrthographicCamera(-d, d, d + offsetY, -d + offsetY, 0.1, 100);

        const v = ThreeManager.sphericalCoordinates2Cartesian2(2, 30, -45);
        this.camera.position.x = v.x;
        this.camera.position.y = v.y;
        this.camera.position.z = v.z;
    }

    // clockwire 
    static sphericalCoordinates2Cartesian2(radius, elevation, azumith) {
        elevation = mod(elevation, 90); 
        elevation = 90 - elevation;
        azumith += 90;
        azumith = mod(azumith, 360);
        return  ThreeManager.sphericalCoordinates2Cartesian(radius, elevation, azumith);
    }

    static sphericalCoordinates2Cartesian(radius, theta, phi)
    {
        theta = theta * Math.PI / 180;
        phi = phi * Math.PI / 180;

        // console.log(`${theta} / ${phi}`);

        const z = radius * Math.sin(theta) * Math.cos(phi);
        const x = radius * Math.sin(theta) * Math.sin(phi);
        const y = radius * Math.cos(theta);
        return {x, y, z};
    }

    append(element) {
        this.checkInitialize();
        element.appendChild(this.renderer.domElement);

        if (this.camera) this.controls = new OrbitControls(this.camera, element);
    }

    // I want to inject debug code use the decorators when dev mode. I tried with the following code("debugStats.js").
    // @debugStats
    render() {  
        if (window.debugMode) window.stats.begin();

        this.checkInitialize();
        this.renderer.render(this.scene, this.camera);

        if (this.controls) this.controls.update();

        MaterialGlow.reload();

        requestAnimationFrame(this.render.bind(this));

        if (window.debugMode) window.stats.end();
    }

    checkInitialize() {
        if (!this.renderer) {
            throw new Error("need to initialize renderer");
        }
        if (!this.camera) {
            throw new Error("need to initialize camera");
        }
        if (!this.scene) {
            throw new Error("need to initialize scene");
        }
    }
}
