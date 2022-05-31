/*global THREE, requestAnimationFrame, console*/

var cameras = [];

//Clock creation
var clock = new THREE.Clock();

var scene, renderer, currentCamera;

var sphereRadius = 250;

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

    planet = new Planet ( 0,0,0, sphereRadius, 8, 8, colors );
    ship = new Ship(0,sphereRadius*1.2,0, sphereRadius/5, 8, colors, THREE.MathUtils.degToRad(90), 0 , 0); // -------------Fix height
    trash = new Trash( 0,0,0, sphereRadius*1.2, sphereRadius/24, sphereRadius/20, 20, 0, 0, 0);

    scene.add(planet.getGroup());
    scene.add(ship.getGroup());
    scene.add(trash.getGroup());

}

/*Function responsible for changing the position of the camera*/
function createCamera() {
    'use strict';

    for ( var i = 0; i < 3; i++ ) {
        var camera = new THREE.OrthographicCamera(  window.innerWidth / - 2, 
                                                    window.innerWidth / 2, 
                                                    window.innerHeight / 2, 
                                                    window.innerHeight / - 2, 
                                                    1, 
                                                    10000 );
        
        switch( i ){
            case 0:
                //Frontal camera
                camera.position.set( 0, 0, 1000 );
                break;
            case 1:
                //Top camera
                camera.position.set( 0, 1000, 0 );
                break;
            case 2: 
                //Side camera
                camera.position.set( 1000, 0, 0);
                break;
        }
        camera.lookAt( scene.position );
        cameras.push( camera );
        currentCamera = cameras[0];
    }
    
}

/*Function that handles the change of the camera*/
function changePerspective(view){
    'use strict';
    switch(view){
        case "front":
            currentCamera = cameras[0];
            currentCamera.lookAt(scene.position);
            break;
        case "top":
            currentCamera = cameras[1];
            currentCamera.lookAt(scene.position);
            break;
        case "side":
            currentCamera = cameras[2];
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
        changePerspective("front");  
        console.log("front view");  
        break;
    case 50: //user pressed key 2
        changePerspective("top");
        console.log("top view");
        break;
    case 51:
        changePerspective("side");
        console.log("side view");
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
        ship.moveObject( "right", delta );
    if ( keys.upArrow )
        ship.moveObject( "up", delta );
    if ( keys.downArrow )
        ship.moveObject( "down", delta );

}

function checkForCollisions(){
    shipCollider = ship.getBoundingSphere();
    trashColliders = trash.getBoundingSphere();
    for (i = 0; i < trashColliders.length(); i++ ){
        if ( trashColliders[i].intersectsBox(shipCollider) ){
            console.log("hi");
            break;
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
}