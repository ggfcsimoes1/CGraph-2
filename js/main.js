/*global THREE, requestAnimationFrame, console*/

var cameras = [];

//Clock creation
var clock = new THREE.Clock();

var scene, renderer, currentCamera;

var sphereRadius = 250;

var cameraRadius = sphereRadius * 1.9

/*Colors that will be used in the materials
Respectively, blue, cyan, magenta, yellow, green*/
var colors = [0x0000FF,0x00FFFF,0xFF00FF,0xFFFF00, 0x00FF00];

var trashForms = ["Box", "Cone"];//--------------------------------change place

//auxiliary object that holds the pressed 
//status of every key used in the program
let keys = {
    leftArrow : false,
    rightArrow : false,
    upArrow : false,
    downArrow : false
}

/*Function responsible for rotating objects of the group*/
function rotateObjects(group, clock_delta, reverseDirection=false, articulate = false, isPyramid = false){
    var value;
    var i=0;
    value =  reverseDirection ? -70 * clock_delta : 70 * clock_delta;
    
    if ( !articulate ){
        if ( isPyramid ) {
            group.traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                    if (i==2 || i == 3){ //getting the pyramid meshes
                        node.rotateZ( THREE.MathUtils.degToRad( value ) );
                    }
                    i++;
                }
            });
        } else {
            group.rotateX( THREE.MathUtils.degToRad( value ) );
            group.rotateY( THREE.MathUtils.degToRad( value ) );
        }
    } else {  
        group.rotateY( THREE.MathUtils.degToRad( value ) );
    }

    
}

/*Function responsible for creating all the objects and scene*/
function createScene() {
    'use strict';

    scene = new THREE.Scene ( ) ;

    planet = new Planet ( 0,0,0, sphereRadius, 30, 30, colors );
    ship = new Ship(THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(0), sphereRadius*1.2, sphereRadius/5, 8, colors, cameraRadius); // -------------Fix height
    trash = new Trash( sphereRadius*1.2, sphereRadius/24, sphereRadius/20, 200);

    scene.add(planet.getGroup());
    scene.add(ship.getGroup());
    scene.add(trash.getGroup());

}

/*Function responsible for changing the position of the camera*/
function createCamera() {
    'use strict';

    var camera = new THREE.OrthographicCamera(  window.innerWidth / - 2, 
                                                window.innerWidth / 2, 
                                                window.innerHeight / 2, 
                                                window.innerHeight / - 2, 
                                                1, 
                                                10000 );
    camera.position.set( 0, 0, 1000 );
    camera.lookAt( scene.position );
    cameras.push( camera );

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set( 0, 0, 1000 );
    camera.lookAt( scene.position );
    cameras.push( camera );

    currentCamera = cameras[0];
}

/*Function that handles the change of the camera*/
function changePerspective(view){
    'use strict';
    switch(view){
        case "orthographic":
            currentCamera = cameras[0];
            currentCamera.lookAt(scene.position);
            break;
        case "perspective":
            currentCamera = cameras[1];
            currentCamera.lookAt(scene.position);
            break;
        case "ship":
            currentCamera = ship.getCamera()
            currentCamera.lookAt(scene.position);
            break;
    }

}

/*Function responsible for toggle the wireframe*/
function toggleWireframe(){
    'use strict'
    scene.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
            node.material.wireframe = !node.material.wireframe;
        }
    });
}

/*Event occurs when the browser window has been resized*/
function onResize() {
    'use strict';
    
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        currentCamera.left = window.innerWidth / -2;
        currentCamera.right = window.innerWidth / 2;
        currentCamera.top = window.innerHeight / 2;
        currentCamera.bottom = window.innerHeight / -2;
        currentCamera.updateProjectionMatrix();
    }
}

/*Detect if the following keys are down*/
function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
    case 49: //user pressed key 1, toggling normal view
        changePerspective("orthographic");  
        console.log("orthographic view");  
        break;
    case 50: //user pressed key 2
        changePerspective("perspective");
        console.log("perspective view");
        break;
    case 51:
        changePerspective("ship");
        console.log("ship view");
        break;
    case 52:
        toggleWireframe();
        console.log("wireframe view");
        break;
    case 37: //left arrow
        keys.leftArrow = true
        console.log("Left arrow key press"); 
        break;
    case 38: //up arrow
        keys.upArrow = true
        console.log("Up arrow key press"); 
        break;
    case 39: //right arrow
        keys.rightArrow = true
        console.log("Right arrow key press"); 
        break;
    case 40: //down arrow
        keys.downArrow = true
        console.log("Down arrow key press"); 
        break;  
    }
}

/*Detect if the following keys are up*/
function onKeyUp(e) {
    'use strict';

    switch (e.keyCode) {
    case 37: //left arrow
        keys.leftArrow = false;
        break;
    case 38: //up arrow
        keys.upArrow = false;
        break;
    case 39: //right arrow
        keys.rightArrow = false;
        break;
    case 40: //down arrow
        keys.downArrow = false;
        break;
    }
}

/*Function responsible for managing the movements*/
function checkForMovements() {
    'use strict';

    //Get current time
    var delta = clock.getDelta();

    if ( keys.leftArrow )
        ship.moveObject( "left", delta);
    if ( keys.rightArrow )
        ship.moveObject( "right", delta);
    if ( keys.upArrow )
        ship.moveObject( "up", delta);
    if ( keys.downArrow )
        ship.moveObject( "down", delta);

    
}

function wasCollision(obj1, ship){
    const obj1Position = obj1.getObj3D().position;
    const shipPosition = ship.getGroup().position;

    return  ( obj1.getBoundaryRadius() + ship.getBoundaryRadius() ) ** 2 >= 
            (obj1Position.x - shipPosition.x) ** 2 + 
            (obj1Position.y - shipPosition.y) ** 2 + 
            (obj1Position.z - shipPosition.z) ** 2;
}

function checkForCollisions(){
    let quadrant;
    let shipObj = ship.getGroup();
    if(shipObj.position.y >= 0) {
        if(shipObj.position.x >=0) {
            quadrant = trash.quadrants["north-east"];
        } else {
            quadrant = trash.quadrants["north-west"];
        }
    } else {
        if(shipObj.position.x >=0) {
            quadrant = trash.quadrants["south-east"];
        } else {
            quadrant = trash.quadrants["south-west"];
        }
    }

    for ( i = 0; i < quadrant.length; i++ ){
        if ( wasCollision(quadrant[i], ship) ){
            quadrant[i].getMesh().visible = false;
            quadrant.splice(i, 1);
        }
    }
 
    
}

/*Shows the output in the browser according to the camera*/
function render() {
    'use strict';
    renderer.render(scene, currentCamera);
}

/*Main program*/
function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        logarithmicDepthBuffer: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

/*Function responsible for animation effects*/
function animate() {
    requestAnimationFrame( animate );    
    render();
    checkForMovements();
    checkForCollisions();
}