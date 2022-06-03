/*
Camera that is used in the game for the ship view
*/
class MovCamera {
    constructor ( x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000);

        this.camera.position.set(x, y, z);

        this.lookAt(0, 0, 0);
        
    }
    //look at the respective coordinate
    lookAt(x, y, z) {
        this.camera.lookAt(x, y, z);
    }
    //return the camera itself
    getCamera(){
        return this.camera;
    }
}
