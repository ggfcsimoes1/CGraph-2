/*
The spaceship that is used in the game.
The ship's height is sphereRadius/10-sphereRadius/12.
It's composed of 4 capsules and 2 cylinders, 
which are aligned with eachother.
*/
var ship;

class Ship {
    constructor ( x,y,z, height, segs, colors, xRot=0, yRot=0, zRot=0 ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.bodyHeight = height/2;
        this.noseHeight = height/4;
        this.capsuleHeight = height/4;
        this.cylinderRadius = height/7;
        this.segs = segs;
        this.colors = colors;
        this.setRotation(xRot, yRot, zRot);

        this.group = new THREE.Group ( );
        this.XrotationGroup = new THREE.Group();
        this.YrotationGroup = new THREE.Group();
    
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

        this.group.position.set(x,y,z);

        this.XrotationGroup.add(this.group);
        this.YrotationGroup.add(this.XrotationGroup);

        this.XrotationGroup.rotateX(THREE.MathUtils.degToRad(Math.random()*360));
        this.YrotationGroup.rotateY(THREE.MathUtils.degToRad(Math.random()*360));
        
    }
    //returns the created mesh
    getMesh() {
        return this.mesh;
    }
    //returns the Object3D instance
    getObj3D() {
        return this.obj3D;
    }
    //returns the object's color
    getColor() {
        return this.color;
    }
    //returns the group created in the constructor
    getGroup() {
        return this.YrotationGroup;
    }

    setRotation(x, y, z) {
        this.xRot = x;
        this.yRot = y;
        this.zRot = z;
    }

    /*Function responsible for translation movements*/
    moveObject(direction, clock_delta){

        switch ( direction ) {
            case "up":
                this.XrotationGroup.rotateX( clock_delta );
                this.group.rotation.x = THREE.MathUtils.degToRad(90);
                this.group.rotation.z = THREE.MathUtils.degToRad(0);
                break;
            case "down":
                this.XrotationGroup.rotateX( -clock_delta);
                this.group.rotation.x = THREE.MathUtils.degToRad(-90);
                this.group.rotation.z = THREE.MathUtils.degToRad(0);
                break;
            case "left":
                this.YrotationGroup.rotateY( -clock_delta );
                this.group.rotation.z = THREE.MathUtils.degToRad(-90);
                this.group.rotation.x = THREE.MathUtils.degToRad(0);
                break;
            case "right":
                this.YrotationGroup.rotateY( clock_delta );
                this.group.rotation.z = THREE.MathUtils.degToRad(90);
                this.group.rotation.x = THREE.MathUtils.degToRad(0);
                break;
        } 
}
}
