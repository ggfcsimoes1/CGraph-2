/*
The planet that is used in the game.
*/
var planet;

class Planet {
    constructor ( x,y,z, radius, widthSegs, heightSegs, color, xRot=0, yRot=0, zRot=0 ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.radius = radius;
        this.widthSegs = widthSegs;
        this.heightSegs = heightSegs;
        this.colors = colors;
        this.xRot = xRot;
        this.yRot = yRot;
        this.zRot = zRot;


        this.group = new THREE.Group ( );
    
        this.planet = new Sphere ( x,y,z, radius, widthSegs, heightSegs, this.colors[0] );
        this.group.add ( this.planet.getObj3D() );    
        
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
