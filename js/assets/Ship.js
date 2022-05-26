/*
The spaceship that is used in the game.
The ship's height is sphereRadius/10-sphereRadius/12.
It's composed of 4 capsules and 2 cylinders, 
which are aligned with eachother.
*/
var ship;

class Ship {
    constructor ( x,y,z, height, bodyHeight, segs, colors, xRot=0, yRot=0, zRot=0 ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.height = height;
        this.bodyHeight = bodyHeight;
        this.noseHeight = bodyHeight/2;
        this.capsuleHeight = height/2;
        this.cylinderRadius = 50;
        this.segs = segs;
        this.colors = colors;
        this.xRot = xRot;
        this.yRot = yRot;
        this.zRot = zRot;


        this.group = new THREE.Group ( );
    
        this.body = new Cylinder ( x, y, z, this.height, this.height, this.bodyHeight, this.colors[1], xRot, yRot, zRot );
        this.group.add ( this.body.getObj3D() );
    
        this.nose = new Cylinder ( x - this.bodyHeight/2 - this.noseHeight/2, y, z, height/2, height/3, this.noseHeight, this.colors[0], xRot, yRot, zRot );
        this.group.add ( this.nose.getObj3D() );
        
        let jet1 = new Capsule ( x+bodyHeight/2,     y,  (z + this.height + this.capsuleHeight), this.capsuleHeight, this.capsuleHeight*10, segs, this.colors[3], xRot, yRot, zRot );
        this.group.add ( jet1.getObj3D() );
        
        let jet2 = new Capsule ( x+bodyHeight/2,     y, (z - (this.height + this.capsuleHeight)), this.capsuleHeight, this.capsuleHeight*10, segs, this.colors[3], xRot, yRot, zRot );
        this.group.add ( jet2.getObj3D() )

        let jet3 = new Capsule ( x+bodyHeight/2,     (y + this.height + this.capsuleHeight), z, this.capsuleHeight, this.capsuleHeight*10, segs, this.colors[3], xRot, yRot, zRot );
        this.group.add ( jet3.getObj3D() );
        
        let jet4 = new Capsule ( x+bodyHeight/2,    (y - (this.height + this.capsuleHeight)), z, this.capsuleHeight, this.capsuleHeight*10, segs, this.colors[3], xRot, yRot, zRot );
        this.group.add ( jet4.getObj3D() );
        
        
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
        return this.group;
    }
}
