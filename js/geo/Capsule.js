/*
Simple class that handles with the creation
of capsules.
*/
var capsule;

class Capsule {
    constructor ( x,y,z, radius, length, segs, color, xRot=0, yRot=0, zRot=0 ) {
        this.x = x; //storing these for now, might remove later on
        this.y = y;
        this.z = z;
        this.radius = radius;
        this.length = length;
        this.segs = segs;    
        this.color = color;
        this.xRot = xRot;
        this.yRot = yRot;
        this.zRot = zRot;
        this.material = new THREE.MeshBasicMaterial ( { color: color, wireframe: false } );
        this.geometry = new THREE.CapsuleGeometry ( radius, length, segs, segs );
        this.mesh = new THREE.Mesh ( this.geometry, this.material );
        capsule = new THREE.Object3D ( );
        capsule.position.set ( x, y, z );
        capsule.rotation.set( xRot, yRot, zRot);
        capsule.add ( this.mesh );
        this.obj3D = capsule;
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
}
