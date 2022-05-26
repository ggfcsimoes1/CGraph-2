/*
Simple class that handles with the creation
of cylinders.
*/
var cylinder;

class Cylinder {
    constructor ( x,y,z, radiusTop, radiusBottom, height, color, xRot=0, yRot=0, zRot=0 ) {
        this.x = x; //storing these for now, might remove later on
        this.y = y;
        this.z = z;
        this.radiusTop = radiusTop;
        this.radiusBottom = radiusBottom;
        this.height = height;    
        this.color = color;
        this.xRot = xRot;
        this.yRot = yRot;
        this.zRot = zRot;
        this.material = new THREE.MeshBasicMaterial ( { color: color, wireframe: false } );
        this.geometry = new THREE.CylinderGeometry ( radiusTop, radiusBottom, height );
        this.mesh = new THREE.Mesh ( this.geometry, this.material );

        cylinder = new THREE.Object3D ( );
        cylinder.position.set ( x, y, z );
        cylinder.rotation.set( xRot, yRot, zRot);
        cylinder.add ( this.mesh );
        this.obj3D = cylinder;
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
