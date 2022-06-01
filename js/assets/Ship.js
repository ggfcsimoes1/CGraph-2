/*
The spaceship that is used in the game.
The ship's height is sphereRadius/10-sphereRadius/12.
It's composed of 4 capsules and 2 cylinders, 
which are aligned with eachother.
*/
var ship;

class Ship {
    constructor ( theta, phi , radius, height, segs, colors , cameraRadius) {
        this.bodyHeight = height/2;
        this.noseHeight = height/4;
        this.capsuleHeight = height/4;
        this.cylinderRadius = height/7;
        this.segs = segs;
        this.colors = colors;
        

        this.group = new THREE.Group ( );
    
        this.body = new Cylinder ( 0, 0, 0, this.cylinderRadius, this.cylinderRadius, this.bodyHeight, this.colors[1], 0, 0, 0);
        this.group.add ( this.body.getObj3D() );
    
        this.nose = new Cylinder ( 0 , this.bodyHeight/2 + this.noseHeight/2, 0, this.cylinderRadius/4, this.cylinderRadius/1.1, this.noseHeight, this.colors[0], 0, 0, 0 );
        this.group.add ( this.nose.getObj3D() );
        
        let jet1 = new Capsule ( 0, -this.bodyHeight/2 ,  (this.cylinderRadius + this.capsuleHeight/4), this.capsuleHeight/4, this.capsuleHeight, segs, this.colors[3], 0, 0, 0 );
        this.group.add ( jet1.getObj3D() );
        
        let jet2 = new Capsule ( 0, -this.bodyHeight/2 , (-(this.cylinderRadius + this.capsuleHeight/4)), this.capsuleHeight/4, this.capsuleHeight, segs, this.colors[3], 0, 0, 0 );
        this.group.add ( jet2.getObj3D() )

        let jet3 = new Capsule ( (this.cylinderRadius + this.capsuleHeight/4), -this.bodyHeight/2 , 0, this.capsuleHeight/4, this.capsuleHeight, segs, this.colors[3], 0, 0, 0 );
        this.group.add ( jet3.getObj3D() );
        
        let jet4 = new Capsule ( (-(this.cylinderRadius + this.capsuleHeight/4)), -this.bodyHeight/2 , 0, this.capsuleHeight/4, this.capsuleHeight, segs, this.colors[3], 0, 0, 0 );
        this.group.add ( jet4.getObj3D() );

        this.group.rotateX(THREE.MathUtils.degToRad(90));
        this.group.rotateZ(THREE.MathUtils.degToRad(90));

        this.setPositionSpherical(theta, phi, radius);

        this.camera = new MovCamera(THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(-110), 160, this.body.getObj3D().position);
        
        this.group.add(this.getCamera());
        this.boundaryRadius = this.bodyHeight;
        
    }

    getCamera() {
        return this.camera.getCamera();
    }

    //returns the object's color
    getColor() {
        return this.color;
    }
    //returns the group created in the constructor
    getGroup() {
        return this.group;
    }
    //returns the created mesh
    getMesh() {
        return this.mesh;
    }
    //returns the Object3D instance
    getObj3D() {
        return this.obj3D;
    }
    //returns the object's boundary radius
    getBoundaryRadius(){
        return this.boundaryRadius; 
    }

    setPositionSpherical(theta, phi, radius) {
        this.theta = theta;
        this.phi = phi;
        this.radius = radius;
        this.group.position.z = radius * Math.sin(phi) * Math.cos(theta);
        this.group.position.x = radius * Math.sin(theta) * Math.sin(phi);
        this.group.position.y = radius * Math.cos(phi);
    }

    /*Function responsible for translation movements*/
    moveObject(direction, clock_delta){

        switch ( direction ) {
            case "up":
                this.setPositionSpherical(this.theta , this.phi - THREE.MathUtils.degToRad(clock_delta * 70), this.radius);
                break;
            case "down":
                this.setPositionSpherical(this.theta , this.phi + THREE.MathUtils.degToRad(clock_delta * 70), this.radius);
                break;
            case "left":
                this.setPositionSpherical(this.theta - THREE.MathUtils.degToRad(clock_delta * 70), this.phi , this.radius);
                break;
            case "right":
                this.setPositionSpherical(this.theta + THREE.MathUtils.degToRad(clock_delta * 70), this.phi , this.radius);
                break;
        } 
        this.group.lookAt(0,0,0);
}
}
