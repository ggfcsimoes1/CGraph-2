
class MovCamera {
    constructor ( x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000);

        this.camera.position.set(x, y, z);

        this.lookAt(0, 0, 0 );
    }

    lookAt(x, y, z) {
        this.camera.lookAt(x, y, z);
    }

    getCamera(){
        return this.camera;
    }
}
