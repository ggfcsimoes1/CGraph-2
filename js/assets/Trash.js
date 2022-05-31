/*
trash created in the game
*/
var trash;

class Trash{
	constructor ( x,y,z, dist, minWidth, maxWidth, numObjs=20, xRot=0, yRot=0, zRot=0 ) {
		this.x = x;
        this.y = y;
        this.z = z;
        this.dist = dist;
        this.minWidth = minWidth;
		this.maxWidth = maxWidth;
        this.xRot = xRot;
        this.yRot = yRot;
        this.zRot = zRot;
		this.boundingSpheres = [];

		this.group = new THREE.Group ( );

		for(let i = 1; i <= numObjs; i++){

			let chosenForm = trashForms[ Math.floor( Math.random() * trashForms.length )];
			let chosenColor = colors[ Math.floor( Math.random() * colors.length )];
			let chosenWidth = Math.random() * ( maxWidth - minWidth ) + minWidth;

			let chosenX = Math.random() *  (2 * dist ) - dist;
			let maxY = Math.sqrt(( dist * dist ) - ( chosenX * chosenX ));
			let chosenY = Math.random() * (2 * maxY) - maxY;
			let absoluteZ = Math.sqrt(( dist * dist ) - ( chosenX * chosenX ) - ( chosenY * chosenY ));
			let chosenZ = Math.random() < 0.5 ? absoluteZ : absoluteZ * -1;

			switch(chosenForm){
				case "Box":
					let box = new Box(chosenX, chosenY , chosenZ, chosenWidth, chosenWidth, chosenWidth, chosenColor);
					this.group.add ( box.getObj3D() );
					this.boundingSpheres.push(box.geometry.computeBoundingSphere());
					break;
				case "Cone":
					let cone = new Cone(chosenX, chosenY , chosenZ, chosenWidth, chosenWidth, chosenWidth, chosenColor);
					this.group.add ( cone.getObj3D() );
					this.boundingSpheres.push(cone.geometry.computeBoundingSphere());
					break;
			}

		}

		this.group.rotation.set(xRot, yRot, zRot);

	}
	//returns the object's bounding box
	getBoundingBox(){
		return this.boundingSpheres;
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