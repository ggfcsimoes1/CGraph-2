/*
Trash created in the game
*/
var trash;

//Possible forms for trash object that can be chosen
var trashForms = ["Box", "Cone"];

class Trash{
	constructor ( dist, minWidth, maxWidth, numObjs=20) {
        this.dist = dist;
        this.minWidth = minWidth;
		this.maxWidth = maxWidth;

		//Dict to create 4 arrays according to the quadrant 
		this.quadrants = {	"north-west": [], 
							"north-east": [], 
							"south-west": [], 
							"south-east": []
						};

		this.group = new THREE.Group ( );

		//For cycle to randomly create trash objects 
		for(let i = 1; i <= numObjs; i++){

			//Pick random form
			let chosenForm = trashForms[ Math.floor( Math.random() * trashForms.length )];

			//Pick random color
			let color = colors[ Math.floor( Math.random() * colors.length )];

			//Get random number between [minWidth, maxWidth[
			let width = Math.random() * ( maxWidth - minWidth ) + minWidth;

			//Get random spherical coordinates 
			let theta = THREE.MathUtils.degToRad(Math.random() * 360);
			let phi = THREE.MathUtils.degToRad(Math.random() * 360);

			let obj;
			switch(chosenForm){
				case "Box":
					obj = new Box(0, 0, 0, width, width, width, color);
					break;
				case "Cone":
					obj = new Cone(0, 0, 0, width, width, width, color);
					break;
			}

			let obj3D = obj.getObj3D();
			obj3D.position.z = dist * Math.sin(phi) * Math.cos(theta);
			obj3D.position.x = dist * Math.sin(theta) * Math.sin(phi);
			obj3D.position.y = dist * Math.cos(phi);

			this.group.add(obj3D);

			//Save the object in the right quadrant
			if(obj3D.position.y >= 0) {
				if(obj3D.position.x >=0) {
					this.quadrants["north-east"].push(obj);
					console.log("north-east");
				} else {
					this.quadrants["north-west"].push(obj);
					console.log("north-west");
				}
			} else {
				if(obj3D.position.x >=0) {
					this.quadrants["south-east"].push(obj);
					console.log("south-east");
				} else {
					this.quadrants["south-west"].push(obj);
					console.log("south-west");
				}
			}
		}

		console.log(this.quadrants["north-east"].length + this.quadrants["north-west"].length + this.quadrants["south-east"].length + this.quadrants["south-west"].length);
	}
	//Returns the object's bounding box
	getBoundingSpheres(){
		return this.boundingSpheres;
	}

	//Returns the object's color
	getColor() {
		return this.color;
	}
	//Returns the group created in the constructor
	getGroup() {
		return this.group;
	}
	
}