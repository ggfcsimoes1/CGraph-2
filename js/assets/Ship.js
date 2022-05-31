/*
The spaceship that is used in the game.
The ship's height is sphereRadius/10-sphereRadius/12.
It's composed of 4 capsules and 2 cylinders, 
which are aligned with eachother.
*/
var ship;

class Ship {
    constructor ( theta, phi , radius, height, segs, colors) {
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

        /* this.XrotationGroup.add(this.group);
        this.YrotationGroup.add(this.XrotationGroup);

        this.XrotationGroup.rotateX(THREE.MathUtils.degToRad(Math.random()*360));
        this.YrotationGroup.rotateY(THREE.MathUtils.degToRad(Math.random()*360)); */
        
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

    setPositionSpherical(theta, phi, radius) {
        this.theta = theta;
        this.phi = phi;
        this.radius = radius;

        /* this.zVar_Theta = radius * Math.sin(phi) * (Math.cos(theta + delta) - Math.cos(theta));
        this.zVar_Theta_neg = radius * Math.sin(phi) * (Math.cos(theta - delta) - Math.cos(theta));
        this.zVar_Phi = radius * Math.cos(theta) * (Math.sin(phi + delta) - Math.sin(phi));
        this.zVar_Phi_neg = radius * Math.cos(theta) * (Math.sin(phi - delta) - Math.sin(phi));
        

        this.xVar_Theta = radius * Math.sin(phi) * (Math.sin(theta + delta) - Math.sin(theta));
        this.xVar_Theta_neg = radius * Math.sin(phi) * (Math.sin(theta - delta) - Math.sin(theta));
        this.xVar_Phi = radius * Math.sin(theta) * (Math.sin(phi + delta) - Math.sin(phi));
        this.xVar_Phi_neg = radius * Math.sin(theta) * (Math.sin(phi - delta) - Math.sin(phi));

        this.xVar_Phi = radius * (Math.cos(phi + delta) - Math.cos(phi));
        this.xVar_Phi_neg = radius * (Math.cos(phi - delta) - Math.cos(phi)); */

        this.group.position.z = radius * Math.sin(phi) * Math.cos(theta);
        this.group.position.x = radius * Math.sin(theta) * Math.sin(phi);
        this.group.position.y = radius * Math.cos(phi);
    }

    /*Function responsible for translation movements*/
    moveObject(direction, clock_delta){

        switch ( direction ) {
            case "up":
                /* this.group.position.z += this.zVar_Phi_neg;
                this.group.position.x += this.xVar_Phi_neg;
                this.group.position.y += this.yVar_Phi_neg; */
                this.setPositionSpherical(this.theta , this.phi - THREE.MathUtils.degToRad(clock_delta * 70), this.radius);
                break;
            case "down":
                /* this.group.position.z += this.zVar_Phi;
                this.group.position.x += this.xVar_Phi;
                this.group.position.y += this.yVar_Phi; */
                this.setPositionSpherical(this.theta , this.phi + THREE.MathUtils.degToRad(clock_delta * 70), this.radius);
                break;
            case "left":
                /* this.group.position.z += this.zVar_Theta;
                this.group.position.x += this.xVar_Theta; */
                this.setPositionSpherical(this.theta - THREE.MathUtils.degToRad(clock_delta * 70), this.phi , this.radius);
                break;
            case "right":
                /* this.group.position.z += this.zVar_Theta_neg;
                this.group.position.x += this.xVar_Theta_neg; */
                this.setPositionSpherical(this.theta + THREE.MathUtils.degToRad(clock_delta * 70), this.phi , this.radius);
                break;
        } 
}
}
