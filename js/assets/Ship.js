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

        this.camera = new MovCamera(0, -100, -100);
        
        this.group.add(this.getCamera());
        this.boundaryRadius = this.bodyHeight;

        const axesHelper = new THREE.AxesHelper( 100 );
        this.group.add(axesHelper);
        
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

    setPositionSpherical(theta, phi) {
        this.theta = theta;
        this.phi = phi;
        this.setPosition(this.radius * Math.sin(theta) * Math.sin(phi),
                        this.radius * Math.cos(phi),
                        this.radius * Math.sin(phi) * Math.cos(theta));
    }

    setPosition(x, y, z) {
        this.group.position.x = x;
        this.group.position.y = y;
        this.group.position.z = z;
    }

    resetRotation() {
        this.group.rotateX(-this.rotX);
        this.group.rotateY(-this.rotY);
        this.group.rotateZ(-this.rotZ);
    }

    setRotX(rot) {
        this.group.rotateX(rot);
    }

    setRotY(rot) {
        this.group.rotateY(rot);
    }

    setRotZ(rot) {
        this.group.rotateZ(rot);
    }

   /*  getRotX() {
        return this.group.rotation.x;
    }

    getRotY() {
        return this.group.rotation.y;
    }

    getRotZ() {
        return this.group.rotation.z;
    } */

    /*Function responsible for translation movements*/
    moveObject(direction, clock_delta){
        let aux;
        this.resetRotation();
        this.camera.getCamera().rotation.x = THREE.MathUtils.degToRad(120);
        switch ( direction ) {
            case "up":
                this.setPositionSpherical(this.theta , this.phi - THREE.MathUtils.degToRad(clock_delta * 70));
                this.group.lookAt(0, 0, 0);
                aux = (this.theta + THREE.MathUtils.degToRad(360)) % THREE.MathUtils.degToRad(360);
                if(this.group.position.z >= 0)
                    if( aux >= THREE.MathUtils.degToRad(270) || aux <= THREE.MathUtils.degToRad(90))
                        this.setRotZ(THREE.MathUtils.degToRad(0));
                    else
                        this.setRotZ(THREE.MathUtils.degToRad(180));
                else
                    if( aux >= THREE.MathUtils.degToRad(270) || aux <= THREE.MathUtils.degToRad(90))
                        this.setRotZ(THREE.MathUtils.degToRad(180));
                    else
                        this.setRotZ(THREE.MathUtils.degToRad(0));
                break;

            case "down":
                this.setPositionSpherical(this.theta , this.phi + THREE.MathUtils.degToRad(clock_delta * 70));
                this.group.lookAt(0, 0, 0);
                aux = (this.theta + THREE.MathUtils.degToRad(360)) % THREE.MathUtils.degToRad(360);
                if(this.group.position.z >= 0)
                    if( aux >= THREE.MathUtils.degToRad(270) || aux <= THREE.MathUtils.degToRad(90))
                        this.setRotZ(THREE.MathUtils.degToRad(180));
                    else
                        this.setRotZ(THREE.MathUtils.degToRad(0));
                else
                    if( aux >= THREE.MathUtils.degToRad(270) || aux <= THREE.MathUtils.degToRad(90))
                        this.setRotZ(THREE.MathUtils.degToRad(0));
                    else
                        this.setRotZ(THREE.MathUtils.degToRad(180));
                break;

            case "up_left":
                this.setPositionSpherical(this.theta - THREE.MathUtils.degToRad(clock_delta * 35) , this.phi - THREE.MathUtils.degToRad(clock_delta * 35));
                this.group.lookAt(0, 0, 0);
                aux = (this.theta + THREE.MathUtils.degToRad(360)) % THREE.MathUtils.degToRad(360);
                if(this.group.position.z >= 0)
                    if( aux >= THREE.MathUtils.degToRad(270) || aux <= THREE.MathUtils.degToRad(90))
                        this.setRotZ(THREE.MathUtils.degToRad(-45));
                    else
                        this.setRotZ(THREE.MathUtils.degToRad(-225));
                else
                    if( aux >= THREE.MathUtils.degToRad(270) || aux <= THREE.MathUtils.degToRad(90))
                        this.setRotZ(THREE.MathUtils.degToRad(-225));
                    else
                        this.setRotZ(THREE.MathUtils.degToRad(-45));
                break;

            case "up_right":
                this.setPositionSpherical(this.theta + THREE.MathUtils.degToRad(clock_delta * 35) , this.phi - THREE.MathUtils.degToRad(clock_delta * 35));
                this.group.lookAt(0, 0, 0);
                aux = (this.theta + THREE.MathUtils.degToRad(360)) % THREE.MathUtils.degToRad(360);
                if(this.group.position.z >= 0)
                    if( aux >= THREE.MathUtils.degToRad(270) || aux <= THREE.MathUtils.degToRad(90))
                        this.setRotZ(THREE.MathUtils.degToRad(45));
                    else
                        this.setRotZ(THREE.MathUtils.degToRad(225));
                else
                    if( aux >= THREE.MathUtils.degToRad(270) || aux <= THREE.MathUtils.degToRad(90))
                        this.setRotZ(THREE.MathUtils.degToRad(225));
                    else
                        this.setRotZ(THREE.MathUtils.degToRad(45));
                break;

            case "down_left":
                this.setPositionSpherical(this.theta - THREE.MathUtils.degToRad(clock_delta * 35) , this.phi + THREE.MathUtils.degToRad(clock_delta * 35));
                this.group.lookAt(0, 0, 0);
                aux = (this.theta + THREE.MathUtils.degToRad(360)) % THREE.MathUtils.degToRad(360);
                if(this.group.position.z >= 0)
                    if( aux >= THREE.MathUtils.degToRad(270) || aux <= THREE.MathUtils.degToRad(90))
                        this.setRotZ(THREE.MathUtils.degToRad(225));
                    else
                        this.setRotZ(THREE.MathUtils.degToRad(45));
                else
                    if( aux >= THREE.MathUtils.degToRad(270) || aux <= THREE.MathUtils.degToRad(90))
                        this.setRotZ(THREE.MathUtils.degToRad(45));
                    else
                        this.setRotZ(THREE.MathUtils.degToRad(225));
                break;

            case "down_right":
                this.setPositionSpherical(this.theta + THREE.MathUtils.degToRad(clock_delta * 35) , this.phi + THREE.MathUtils.degToRad(clock_delta * 70));
                this.group.lookAt(0, 0, 0);
                aux = (this.theta + THREE.MathUtils.degToRad(360)) % THREE.MathUtils.degToRad(360);
                if(this.group.position.z >= 0)
                    if( aux >= THREE.MathUtils.degToRad(270) || aux <= THREE.MathUtils.degToRad(90))
                        this.setRotZ(THREE.MathUtils.degToRad(-225));
                    else
                        this.setRotZ(THREE.MathUtils.degToRad(-45));
                else
                    if( aux >= THREE.MathUtils.degToRad(270) || aux <= THREE.MathUtils.degToRad(90))
                        this.setRotZ(THREE.MathUtils.degToRad(0));
                    else
                        this.setRotZ(THREE.MathUtils.degToRad(180));
                break;

            case "left":
                this.setPositionSpherical(this.theta - THREE.MathUtils.degToRad(clock_delta * 70), this.phi );
                this.group.lookAt(0, 0, 0);
                this.setRotZ(THREE.MathUtils.degToRad(-90));
                break;

            case "right":
                this.setPositionSpherical(this.theta + THREE.MathUtils.degToRad(clock_delta * 70), this.phi );
                this.group.lookAt(0, 0, 0);
                this.setRotZ(THREE.MathUtils.degToRad(90));
                break;
        } 
        
}
}
