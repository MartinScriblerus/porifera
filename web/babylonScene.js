import "./index.js";
import {pitchChanged} from "./AudioThreadManagerHooks.js";
import * as BABYLON from "https://unpkg.com/@babylonjs/core@4.0.0-beta.1/index.js?module";


const canvas = document.getElementsByTagName('canvas')[0]

const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true })

if(engine){
    document.getElementById("siteTitle").classList.remove("opening-header");
    document.getElementById("siteTitle").classList.add("row-title");
}

game.scene = game.scene || undefined;
game.canvas = game.canvas || undefined
var scene = new BABYLON.Scene(engine);
engine.getInputElement = () => canvas

game.scene = scene;

console.log("Game Scene: ", game.scene);

// var createScene = function () {



// This creates and positions a free camera (non-mesh)
var camera = new BABYLON.FollowCamera("camera1", new BABYLON.Vector3(0, 3, 0), scene);
    // camera 1
var camera1 = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 10, 0), scene);
camera1.setTarget(BABYLON.Vector3.Zero());


scene.getCameraByID("camera1").alpha = 1.4233160050013756;
scene.getCameraByID("camera1").beta = 1.77290545417584;

scene.activeCameras.push(camera1);
scene.activeCameras.push(camera);

camera.viewport = new BABYLON.Viewport(0, 0, 0.3, 1.0);
camera1.viewport = new BABYLON.Viewport(0, 0, 1.0, 1.0);


    //keypress events
window.keyisdown = {};
window.addEventListener('keydown', function (event) {
    window.keyisdown[event.keyCode] = true;
});

window.addEventListener('keyup', function (event) {
    window.keyisdown[event.keyCode] = false;
});

window.addEventListener('blur', function (event) {
    for (var k in window.keyisdown) {
        window.keyisdown[k] = false;
    }
});

window.tempv = new BABYLON.Vector3.Zero();

// This attaches the camera to the canvas
camera.attachControl(canvas, true);
camera1.attachControl(canvas, true);

camera1.rotation.y = Math.PI;
camera.rotation.x = Math.PI / 2;
camera.rotation.z = Math.PI * 2;
camera.rotation.y = -Math.PI;
console.log(game.scene.cameras);
if(game.scene.cameras.length){
    // game.scene.cameras[0].rotation.x =  Math.PI/2;
    // game.scene.cameras[0].position.z = 0;
    // game.scene.cameras[0].position.y = 10; 

}

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

// Default intensity is 1. Let's dim the light a small amount
light.intensity = 0.3;

// Our built-in 'player' shape.
var player = BABYLON.MeshBuilder.CreateSphere("player", {diameter: 2, segments: 32}, scene);
player.position.x = 0;
player.position.y = 1;
player.position.z = 0; 
player.scaling.x = player.scaling.y = player.scaling.z = 12/128;



// Our built-in 'ground' shape.
var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 30, height: 10}, scene);

ground.position.z = 0;
ground.position.y = 0;
ground.rotation.y = Math.PI;
// ground.rotation.z = 2 * Math.PI;

const element = document.getElementById('some-element-you-want-to-animate');
let start, previousTimeStamp;
let done = false

function step(timestamp) {
    if (start === undefined) {
    start = timestamp;
    }
    const elapsed = timestamp - start;

    if (previousTimeStamp !== timestamp) {
    // Math.min() is used here to make sure the element stops at exactly 200px
    const count = Math.min(0.1 * elapsed, 200);
    // element.style.transform = 'translateX(' + count + 'px)';
    let currPitch = pitchChanged();
    player.nextspeed.x = 0.0;
    player.nextspeed.z = 0.00000;
    player.rotation.y = 2 * Math.PI;
    if(currPitch === "NaN"){
        player.position.z = 0;
    } else{
        console.log("GROUND HEIGHT: ", ground.height);
        console.log("PLAYER z ", player.position.z);
        player.position.z = camera.position.y = currPitch - ground.height;
      
        async function setFollowCamera(){
            // This targets the camera to scene origin
            // camera.setTarget(BABYLON.Vector3.Zero());
            let targetMesh = await game.scene.meshes[0];
        
            camera.speed = 0;
        //    // camera.lockedTarget = targetMesh; //version 2.5 onwards
            camera.heightOffset = 8;
            camera.radius = 1;
            camera.cameraAcceleration = 0.005;
        //     camera.maxCameraSpeed = 10;
            // camera.lockedTarget = targetMesh;
            camera.setTarget(targetMesh.position);
            // camera.position.y = game.scene.meshes[0].position.z;
        }
        setFollowCamera();

    }
    if (count === 200) done = true;
    }

    if (elapsed < 2000) { // Stop the animation after 2 seconds
    previousTimeStamp = timestamp
    !done && window.requestAnimationFrame(step);
    }
}
    
    window.requestAnimationFrame(step);








    var playerMaterial = new BABYLON.StandardMaterial(scene);
    playerMaterial.alpha = 1;
    playerMaterial.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.7);
    playerMaterial.emissiveColor = new BABYLON.Color3(0.7, 0.1, 0.1);
    player.material = playerMaterial; 



    var groundMaterial = new BABYLON.StandardMaterial(scene);
    
    game.ground = game.ground || {};
    // camera1.setTarget = ground;
 
    // camera1.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
    game.ground.material = groundMaterial;
    groundMaterial.alpha = 1;
    let r = 98/255;
    let b = 176/255;
    let g = 155/255;
    groundMaterial.emissiveColor = new BABYLON.Color3(r,b,g)
    ground.scaling.x = 1;
    ground.scaling.z = 1

    groundMaterial.diffuseColor = new BABYLON.Color3(r,b,g);
    ground.material = groundMaterial; // <--
    // groundMaterial.diffuseTexture = new BABYLON.Texture("https://i.imgur.com/GNlBk3u.png", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("https://static.vecteezy.com/system/resources/previews/002/968/296/non_2x/flat-design-nature-landscape-with-hills-and-clouds-free-vector.jpg", scene);
    
//     return scene;
// };

player.checkCollisions = true;
player.applyGravity = true;
player.ellipsoid = new BABYLON.Vector3(0.9, 0.45, 0.9);
player.speed = new BABYLON.Vector3(0, 0, 0.0);
player.nextspeed = new BABYLON.Vector3.Zero();
player.nextspeed = player.nextspeed || {};


scene.registerBeforeRender(function () {
		
    //player speed
    var v = 0.5;




    if (window.keyisdown[37]) { player.nextspeed.x = -v;}
    if (window.keyisdown[39]) { player.nextspeed.x = v;}
    if (window.keyisdown[38]) { player.nextspeed.z = v;}
    if (window.keyisdown[40]) { player.nextspeed.z = -v; }
   // player.speed = BABYLON.Vector3.Lerp(player.speed, player.nextspeed, 0.1);
    
    //turn to dir
    if (player.speed.length() > 0.01) {
        tempv.copyFrom(player.speed); 
        var dot = BABYLON.Vector3.Dot(tempv.normalize(), BABYLON.Axis.Z );
        var al = Math.acos(dot);
        if (tempv.x<0.0) { al = Math.PI * 2.0 - al;}
        if (window.keyisdown[9]) {
            console.log("dot,al:",dot,al);			
        }
        if (al > player.rotation.y) {
            var t = Math.PI / 100;
        } else {
            var t = -Math.PI / 100;
        }
        if (Math.abs(player.rotation.y - al) > Math.PI) {
            t = -t;
        }
        player.rotation.y += t;
    }
    
    player.moveWithCollisions(player.speed);
    
    if (player.position.x > 60.0) { player.position.x = 60.0; }
    if (player.position.x < -60.0) { player.position.x = -60.0; }
    if (player.position.z > 60.0) { player.position.z = 60.0; }
    if (player.position.z < -60.0) { player.position.z = -60.0; }
    
    //camera.target = BABYLON.Vector3.Lerp(camera.target, player.position.add(player.speed.scale(15.0)), 0.05);
    camera.radius = camera.radius * 0.95 + (25.0 + player.speed.length() * 25.0) * 0.05;

});

const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
console.log("!!!!!!!!!BOUNDING INFO!!!@ ",game.scene.meshes[1]._width / 6);
let boxSpawnX = - (game.scene.meshes[1]._width/3);
let boxSpawnY = game.scene.meshes[1]._width / 2;
box.position.x = boxSpawnX; 
box.position.y = boxSpawnY;
let boxMaterial= new BABYLON.StandardMaterial(scene);
box.material = boxMaterial;
box.material.diffuseColor = new BABYLON.Color3.FromHexString("#DFFF3D");
box.material.emissiveColor = new BABYLON.Color3.FromHexString("#FF30C2");

playerMaterial.emissiveColor = new BABYLON.Color3.FromHexString("#DFFF3D");


// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});




class InfiniteBackground {
    instances = [];
    threshold;
    spawnPlace;
  
    constructor(mesh, scene) {
      this.instances[0] = mesh.clone("instance-1");
      this.instances[1] = mesh.clone("instance-2");
      this.spawnPlace = mesh.position.x + mesh.getBoundingInfo().boundingBox.extendSize.x*2;
  
      this.threshold = mesh.position.x - mesh.getBoundingInfo().boundingBox.extendSize.x;
      this.instances[1].position.x = this.spawnPlace;
  
      mesh.setEnabled(false);
  
      scene.onBeforeRenderObservable.add(() => {
        for (let i = 0; i < this.instances.length; i++) {
          const rightEdge = this.instances[i].position.x + mesh.getBoundingInfo().boundingBox.extendSize.x;
  
          this.instances[i].position.x -= 0.1;
  
          if (rightEdge <= this.threshold) {
            const temp = this.instances[i];
            this.instances[i] = this.instances[i+1];
            this.instances[i+1] = temp;
            this.instances[i+1].position.x = this.instances[i].position.x + mesh.getBoundingInfo().boundingBox.extendSize.x * 2;
          }
        }
      })
    }
  }
  new InfiniteBackground(ground, scene);