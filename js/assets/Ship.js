/*
The spaceship that is used in the game.
The ship's height is sphereRadius/10-sphereRadius/12.
It's composed of 4 capsules and 2 cylinders, 
which are aligned with eachother.
*/
var ship;
var totalRot = 0;
class Ship {
    constructor ( theta, phi , radius, height, segs, colors , cameraRadius) {
        this.bodyHeight = height/2;
        this.noseHeight = height/4;
        this.capsuleHeight = height/4;
        this.cylinderRadius = height/7;
        this.segs = segs;
        this.colors = colors;
        this.rotX = 0;
        this.rotY = 0;
        this.rotZ = 0;
        this.radius = radius;
        

        this.group = new THREE.Group ( );
    
        this.body = new Cylinder ( 0, 0, 0, this.cylinderRadius, this.cylinderRadius, this.bodyHeight, this.colors[1], 0, 0, 0);
        this.group.add ( this.body.getObj3D() );
    
        this.nose = new Cylinder ( 0 , this.bodyHeight/2 + this.noseHeight/2, 0, this.cylinderRadius/4, this.cylinderRadius/1.1, this.noseHeight, this.colors[2], 0, 0, 0 );
        this.group.add ( this.nose.getObj3D() );
        
        let jet1 = new Capsule ( 0, -this.bodyHeight/2 ,  (this.cylinderRadius + this.capsuleHeight/4), this.capsuleHeight/4, this.capsuleHeight, segs, this.colors[3], 0, 0, 0 );
        this.group.add ( jet1.getObj3D() );
        
        let jet2 = new Capsule ( 0, -this.bodyHeight/2 , (-(this.cylinderRadius + this.capsuleHeight/4)), this.capsuleHeight/4, this.capsuleHeight, segs, this.colors[3], 0, 0, 0 );
        this.group.add ( jet2.getObj3D() )

        let jet3 = new Capsule ( (this.cylinderRadius + this.capsuleHeight/4), -this.bodyHeight/2 , 0, this.capsuleHeight/4, this.capsuleHeight, segs, this.colors[3], 0, 0, 0 );
        this.group.add ( jet3.getObj3D() );
        
        let jet4 = new Capsule ( (-(this.cylinderRadius + this.capsuleHeight/4)), -this.bodyHeight/2 , 0, this.capsuleHeight/4, this.capsuleHeight, segs, this.colors[3], 0, 0, 0 );
        this.group.add ( jet4.getObj3D() );

        this.setPositionSpherical(theta, phi);

        //Camera Creation
        this.camera = new MovCamera(0, -100, -100);
        
        this.group.add(this.getCamera());
        
        //Used for detection of collisions
        this.boundaryRadius = this.bodyHeight;

        /* const axesHelper = new THREE.AxesHelper( 100 );
        this.group.add(axesHelper); */
        
    }
    //return ship's camera
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
    //set object's position with spherical coordinates
    setPositionSpherical(theta, phi) {
        this.theta = theta;
        this.phi = phi;

        //Spherical to cartesian coordinates conversion
        this.setPosition(this.radius * Math.sin(theta) * Math.sin(phi),
                        this.radius * Math.cos(phi),
                        this.radius * Math.sin(phi) * Math.cos(theta));
    }
    //set object's position with cartesian coordinates
    setPosition(x, y, z) {
        this.group.position.x = x;
        this.group.position.y = y;
        this.group.position.z = z;
    }
    //reset object's rotation
    resetRotation() {
        this.group.rotateX(-this.rotX);
        this.group.rotateY(-this.rotY);
        this.group.rotateZ(-this.rotZ);
    }
    //rotate object's geometry about the X axis
    setRotX(rot) {
        this.group.rotateX(rot);
    }
    //rotate object's geometry about the Y axis
    setRotY(rot) {
        this.group.rotateY(rot);
    }
    //rotate object's geometry about the Z axis
    setRotZ(rot,clock_delta) {
        var auxRot;
        if (totalRot<=-360) { totalRot = -360; }
        if (totalRot>=360) { totalRot = 360; }
        if (totalRot <= rot)
            auxRot = Math.min(totalRot+=clock_delta*3,rot);
        if (totalRot > rot)
            auxRot = Math.max(totalRot-=clock_delta*3,rot);
            
        this.group.rotateZ(auxRot);
    }
    //return group rotation about the X axis
    getRotX() {
        return this.group.rotation.x;
    }
    //return group rotation about the Y axis
    getRotY() {
        return this.group.rotation.y;
    }
    //return group rotation about the z axis
    getRotZ() {
        return this.group.rotation.z;
    }

    //function responsible for translation movements
    moveObject(direction, clock_delta){
        this.resetRotation();
        this.camera.getCamera().rotation.x = THREE.MathUtils.degToRad(120);
        switch ( direction ) {
            case "up":
                if (this.phi > THREE.MathUtils.degToRad(0.4)){
                    this.setPositionSpherical(this.theta , this.phi - THREE.MathUtils.degToRad(clock_delta * 40));
                    this.group.lookAt(0, 0, 0);
                    this.setRotZ(THREE.MathUtils.degToRad(0), clock_delta);
                }
                break;

            case "down":
                if (this.phi < THREE.MathUtils.degToRad(179.6)){
                    this.setPositionSpherical(this.theta , this.phi + THREE.MathUtils.degToRad(clock_delta * 40));
                    this.group.lookAt(0, 0, 0);
                    this.setRotZ(THREE.MathUtils.degToRad(180), clock_delta);
                }
                break;

            case "up_left":
                if (this.phi > THREE.MathUtils.degToRad(0.4)){
                    this.setPositionSpherical(this.theta - THREE.MathUtils.degToRad(clock_delta * 35) , this.phi - THREE.MathUtils.degToRad(clock_delta * 35));
                    this.group.lookAt(0, 0, 0);
                    this.setRotZ(THREE.MathUtils.degToRad(-45), clock_delta);
                }
                break;

            case "up_right":
                if (this.phi > THREE.MathUtils.degToRad(0.4)){
                    this.setPositionSpherical(this.theta + THREE.MathUtils.degToRad(clock_delta * 35) , this.phi - THREE.MathUtils.degToRad(clock_delta * 35));
                    this.group.lookAt(0, 0, 0);
                    this.setRotZ(THREE.MathUtils.degToRad(45), clock_delta);
                }
                break;

            case "down_left":
                if (this.phi < THREE.MathUtils.degToRad(179.6)){
                    this.setPositionSpherical(this.theta - THREE.MathUtils.degToRad(clock_delta * 35) , this.phi + THREE.MathUtils.degToRad(clock_delta * 35));
                    this.group.lookAt(0, 0, 0);
                    this.setRotZ(THREE.MathUtils.degToRad(-225), clock_delta);
                }
                break;

            case "down_right":
                if (this.phi < THREE.MathUtils.degToRad(179.6)){
                    this.setPositionSpherical(this.theta + THREE.MathUtils.degToRad(clock_delta * 35) , this.phi + THREE.MathUtils.degToRad(clock_delta * 35));
                    this.group.lookAt(0, 0, 0);
                    this.setRotZ(THREE.MathUtils.degToRad(225), clock_delta);
                }
                break;

            case "left":
                this.setPositionSpherical(this.theta - THREE.MathUtils.degToRad(clock_delta * 40), this.phi );
                this.group.lookAt(0, 0, 0);
                this.setRotZ(THREE.MathUtils.degToRad(-90), clock_delta);
                break;

            case "right":
                this.setPositionSpherical(this.theta + THREE.MathUtils.degToRad(clock_delta * 40), this.phi );
                this.group.lookAt(0, 0, 0);
                this.setRotZ(THREE.MathUtils.degToRad(90), clock_delta);
                break;
        } 
        
}
}
