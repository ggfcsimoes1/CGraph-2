
class MovCamera {
    constructor ( theta, phi , radius , look_at_pos) {
        this.theta;
        this.phi;
        this.radius;
        this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000);

        this.setPositionSpherical(theta, phi, radius, look_at_pos);
    }

    setPositionSpherical(theta, phi, radius, look_at_pos) {
        this.theta = theta;
        this.phi = phi;
        this.radius = radius;

        this.camera.position.set( this.radius * Math.sin(this.theta) * Math.sin(this.phi), 
                                  this.radius * Math.cos(this.phi), 
                                  this.radius * Math.sin(this.phi) * Math.cos(this.theta));

        this.camera.lookAt( look_at_pos );
    }

    getCamera(){
        return this.camera;
    }
}
