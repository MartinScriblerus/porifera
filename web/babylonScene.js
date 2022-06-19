import "./index.js";
import {pitchChanged} from "./AudioThreadManagerHooks.js";
import * as BABYLON from "https://unpkg.com/@babylonjs/core@4.0.0-beta.1/index.js?module";
import { beginPyAnalysisNote } from "./beginPyAnalysisNote.js"

game.user.id.boxesPerView = 12 * game.room.id.targetOctaveRange;

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
game.scene.camera = new BABYLON.FollowCamera("camera1", new BABYLON.Vector3(0, 3, 0), scene);
    // camera 1
game.scene.camera1 = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 10, 0), scene);
game.scene.camera1.setTarget(BABYLON.Vector3.Zero());


scene.getCameraByID("camera1").alpha = 1.4233160050013756;
scene.getCameraByID("camera1").beta = 1.77290545417584;

scene.activeCameras.push(game.scene.camera1);
scene.activeCameras.push(game.scene.camera);

game.scene.camera.viewport = new BABYLON.Viewport(0.6, 0.4, 0.6, 0.8);
game.scene.camera1.viewport = new BABYLON.Viewport(0, 0, 1.0, 1.0);


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

// var switchCam = true;

// window.addEventListener("click", function (evt) {
//     if (switchCam) {
//         scene.activeCamera = game.scene.camera;
//     } else {
//         scene.activeCamera = game.scene.camera1;
//     }
//     switchCam = !switchCam;
// })

window.tempv = new BABYLON.Vector3.Zero();

// This attaches the camera to the canvas
game.scene.camera.attachControl(canvas, true);
game.scene.camera1.attachControl(canvas, true);

game.scene.camera1.rotation.y = Math.PI;
game.scene.camera.rotation.x = Math.PI / 2;
game.scene.camera.rotation.z = Math.PI * 2;
game.scene.camera.rotation.y = -Math.PI;
console.log(game.scene.cameras);
if(game.scene.cameras.length){
    // game.scene.cameras[0].rotation.x =  Math.PI/2;
    // game.scene.cameras[0].position.z = 0;
    // game.scene.cameras[0].position.y = 10; 

}

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

// Default intensity is 1. Let's dim the light a small amount
light.intensity = 0.45;

// Our built-in 'player' shape.
var player = BABYLON.MeshBuilder.CreateSphere("player", {diameter: 2, segments: 32}, scene);
player.position.x = 0;
player.position.y = 1;
player.position.z = 0; 
let boxDimens = player.getBoundingInfo().boundingBox;
console.log("box DIMENS ++++++++++++++++++ ", boxDimens);
let mode = "midi";
let octavesNeeded = 2;
let targetOctave = "C";
switch(mode){
    case "octaves":

    case "midi":
        console.log("all good! ", mode);
        break;
    default: 
        console.log("all good?? hit default")
}
switch(octavesNeeded){
    case 2:
        console.log("all good! ", octavesNeeded);
        console.log("target octave: ", targetOctave);
        break;
    default: 
        console.log("all good?? hit default")
}

// player.scaling.x = player.scaling.y = player.scaling.z = 12/128;
player.scaling.x = player.scaling.y = player.scaling.z = (12/128) * (10 / game.room.id.targetOctaveRange);

const playerY_Observable = new BABYLON.Observable();

scene.onBeforeRenderObservable.add(function(){
    game.scene.camera.position.z = player.position.z;
});

// Our built-in 'ground' shape.
var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 30, height: 10}, scene);

ground.position.z = 0;
ground.position.y = 0;
ground.rotation.y = Math.PI;
// ground.rotation.z = 2 * Math.PI;







    var playerMaterial = new BABYLON.StandardMaterial(scene);
    playerMaterial.alpha = 1;
    playerMaterial.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.7);
    playerMaterial.emissiveColor = new BABYLON.Color3(0.7, 0.1, 0.1);
    player.material = playerMaterial; 



    var groundMaterial = new BABYLON.StandardMaterial(scene);
    
    game.ground = game.ground || {};
    // game.scene.camera1.setTarget = ground;
 
    // game.scene.camera1.mode = BABYLON.Game.scene.cameraORTHOGRAPHIC_CAMERA;
    game.ground.material = groundMaterial;
    groundMaterial.alpha = 1;
    let r = 98/255;
    let b = 176/255;
    let g = 155/255;
    groundMaterial.emissiveColor = new BABYLON.Color3(r,b,g);
    groundMaterial.disableLighting = true;
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
    
    //game.scene.cameratarget = BABYLON.Vector3.Lerp(game.scene.cameratarget, player.position.add(player.speed.scale(15.0)), 0.05);
    game.scene.cameraradius = game.scene.cameraradius * 0.95 + (25.0 + player.speed.length() * 25.0) * 0.05;

});

let box;

if(game && game.scene && !game.scene.getMeshByID("box")){
    box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
}



console.log("!!!!!!!!!BOUNDING INFO!!!@ ",game.scene.meshes[1]._width / 6);
let boxSpawnX = - (game.scene.meshes[1]._width/2);
let boxSpawnY = 1;
let boxSpawnZ = game.scene.meshes[1]._height / 2;
box.position.x = boxSpawnX; 
box.position.y = boxSpawnY;
box.position.z = boxSpawnZ;
box.scaling.z = 1/11;
box.id = "noteBox_0";
console.log("BOX!: ", box);
let boxMaterial= new BABYLON.StandardMaterial(scene);
box.material = boxMaterial;
box.material.diffuseColor = new BABYLON.Color3.FromHexString("#DFFF3D");
box.material.emissiveColor = new BABYLON.Color3.FromHexString("#FF30C2");
game.boxBlueprint = game.boxBlueprint || {};
game.boxBlueprint = box;
// let boxInstances = [];
// for(let x = 0; x< 64; x++){
//     box.clone(`boxNote_instance-${x}`);
// }

game.createBoxRow = () => {
    let boxInstances = [];
    
    let colorA = game.boxBlueprint.material.emissiveColor


    let material0 = new BABYLON.StandardMaterial(scene);
    let color0 = new BABYLON.Color3.FromHexString("#AF4AFF");

    let material1 = new BABYLON.StandardMaterial(scene);
    let color1 = new BABYLON.Color3.FromHexString("#7A4FE8");

    let material2 = new BABYLON.StandardMaterial(scene);
    let color2 = new BABYLON.Color3.FromHexString("#4C4AFF");

    let material3 = new BABYLON.StandardMaterial(scene);
    let color3 = new BABYLON.Color3.FromHexString("#4773F5");

    let material4 = new BABYLON.StandardMaterial(scene);
    let color4 = new BABYLON.Color3.FromHexString("#35C6DE");

    let material5 = new BABYLON.StandardMaterial(scene);
    let color5 = new BABYLON.Color3.FromHexString("#3CFA9B");

    let material6 = new BABYLON.StandardMaterial(scene);
    let color6 = new BABYLON.Color3.FromHexString("#2B98E3");

    let material7 = new BABYLON.StandardMaterial(scene);
    let color7 = new BABYLON.Color3.FromHexString("#E3B814");

    let material8 = new BABYLON.StandardMaterial(scene);
    let color8 = new BABYLON.Color3.FromHexString("#3643E3");

    let material9 = new BABYLON.StandardMaterial(scene);
    let color9 = new BABYLON.Color3.FromHexString("#E37242");

    let material10 = new BABYLON.StandardMaterial(scene);
    let color10 = new BABYLON.Color3.FromHexString("#2B99E3");

    let material11 = new BABYLON.StandardMaterial(scene);
    let color11 = new BABYLON.Color3.FromHexString("#E33836");

    // this will replace 128 as # => 
        // if octaveRange = 0 we need 11 boxes
    let convertedRange = 128 * (game.room.id.targetOctaveRange / 10)
    for(let x = 1; x< convertedRange; x++){
        // boxInstances[x] = BABYLON.MeshBuilder.CreateBox("noteBox_" + x, {}, scene);
        if(!x%11 || (x%11>11)){
            return;
        }
        boxInstances[x] = box.clone("noteBox_" + x);;
        boxInstances[x].speed = 0.1
        // boxInstances[x].position.z = (game.scene.meshes[1]._height / 2) - (x * (10/128));
        boxInstances[x].position.z = ((game.scene.meshes[1]._height / 2) - (x * ((10/128) * (10/game.room.id.targetOctaveRange)))); 
        switch(x%11){
            case 0:
                boxInstances[x].material = material0;
                boxInstances[x].material.emissiveColor = color0;
                break;
            case 1:
                boxInstances[x].material = material1;
                boxInstances[x].material.emissiveColor = color1;
                break;
            case 2:
                boxInstances[x].material = material2;
                boxInstances[x].material.emissiveColor = color2;
                break;
            case 3:
                boxInstances[x].material = material3;
                boxInstances[x].material.emissiveColor = color3;
            case 4:
                boxInstances[x].material = material4;
                boxInstances[x].material.emissiveColor = color4;
                break;
            case 5:
                boxInstances[x].material= material5;
                boxInstances[x].material.emissiveColor = color5;
                break;
            case 6:
                boxInstances[x].material= material6;
                boxInstances[x].material.emissiveColor = color6;
                break;
            case 7:
                boxInstances[x].material = material7;
                boxInstances[x].material.emissiveColor = color7;
                break;
            case 8:
                boxInstances[x].material = material8;
                boxInstances[x].material.emissiveColor = color8;
                break;
            case 9:
                boxInstances[x].material = material9;
                boxInstances[x].material.emissiveColor = color9;
                break;
            case 10:
                boxInstances[x].material = material10;
                boxInstances[x].material.emissiveColor = color10;
            case 11:
                boxInstances[x].material = material11;
                boxInstances[x].material.emissiveColor = color11;
            default:
                // game.createBoxRow();
                // console.log("no box reading");
        }
        boxInstances[x].setParent(boxInstances[0])
        // if(x%11 === 0){
        //     boxInstances[x].material.emissiveColor = null;
        //     boxInstances[x].material.emissiveColor = color0;
        // }       if(x%11 === 1){
        //     boxInstances[x].material.emissiveColor = null;
        //     boxInstances[x].material.emissiveColor = color1;
        // }  
        // else {
        //     console.log("IN ONE!!!");
        //     boxInstances[x].material.emissiveColor = null;
        //     boxInstances[x].material.emissiveColor = colorB;

        // }

        // function mainTick(timestamp, count){
        //     console.log("timestamp: ", timestamp);
        //     console.log("count: ", count);
        // }

        const frameRate = game.animation.fps;

        const xSlide = new BABYLON.Animation("xSlide", "position.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
        game.previousTime = game.previousTime || game.room.id.startGameTick;

        var assessAudio = new BABYLON.AnimationEvent(
            ((game.room.id.bpm/30)/2)/16 * frameRate,
            function () {
                let timeNow = window.__emscripten_date_now();  
                let startTime = game.previousTime;
              
                let timeElapsed = (timeNow - startTime) % 10;  
      
               
               
                // console.log("what is time elapsed? ", timeElapsed);
                // if(0 <= timeElapsed < 250){
                
                //     // mainTick(timeElapsed, "one");
                //     // console.log("one");
                // } else if (250 <= timeElapsed < 500){
               
                //     // mainTick(timeElapsed, "two");
                //     console.log("two");
                // } else if (500 <= timeElapsed < 750){
                    
                //     // mainTick(timeElapsed, "three");
                //     console.log("three");
                // } else if (750 <= timeElapsed < 1000){
             
                //     // mainTick(timeElapsed, "four");
                //     console.log("four");
                //     game.previousTime = window.__emscripten_date_now();
                //     game.oneCount = game.twoCount = game.threeCount = game.fourCount = false;
                // }
                // else{
                //     console.log("TOOOOOOOOOCK!")
                // }
                let timeAnalysisBucket = (timeElapsed) / 1000;

           

     
   
                if(((game.room.id.bpm/30)/2)/16 * frameRate || (game.room.id.analysisTimeBucket === 0)){
                    game.room.id.analysisTimeBucket = timeAnalysisBucket;
                    let meshesToDestroy = game.scene.meshes;
                    let done = false;
                    function cleanMeshes(){
                        for(let u= 5; u < meshesToDestroy.length; u++){

                            meshesToDestroy[u].dispose();
                            
        
                        }
                    }
                    async function remakeWall(){
                        await cleanMeshes();
                        // tktktktktk
                        console.log("remaking wall");
                        return game.createBoxRow(); 
                    }
                } 
              
                return;
            },
            true,
        );
          // Attach your event to your animation
          xSlide.addEvent(assessAudio);
        
        const keyFrames = [];

        keyFrames.push({
            frame: 0,
            value: (game.scene.meshes[1]._width/2),
        });

        keyFrames.push({
            frame: ((game.room.id.bpm/30)/2) * frameRate,
            value: 0,
        })

        keyFrames.push({
            frame: (game.room.id.bpm/30) * frameRate,
            value: -(game.scene.meshes[1]._width/2),
        });

        if(keyFrames[keyFrames.length -1].value === 0){
            console.log("SENT ANALYSIS NOTE");
            //beginPyAnalysisNote(game.user, game.user.id.latestPitch.noteLetter, game.user.id.latestOctaveNote.octave, game.user.id.latestMingusNumNote, game.user.id.latestKeyNotePiano, game.user.id.latestKeyNoteOrgan, game.user.id.latestMidiNoteNumber, game.room.id.bpm);
            
            // beginPyAnalysisNote()
        }

        // console.log("kf ", keyFrames);

        xSlide.setKeys(keyFrames);
        boxInstances[x].animations.push(xSlide);
        scene.beginAnimation(boxInstances[x], 0, (game.room.id.bpm/30) * frameRate, true);
        // boxInstances[x].moveTo = function (targetPos, speed) {
        //     var ease = new BABYLON.CubicEase();
        //     targetPos = new BABYLON.Vector3(boxInstances[x].position.x,boxInstances[x].position.y,boxInstances[x].position.z);
        //     ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        //     BABYLON.Animation.CreateAndStartAnimation('at5', this, 'position', 10, 12, this.position, targetPos, 0, ease);
        // }
    }
    game.user.boxInstances = boxInstances;
  
    return boxInstances;
}





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

// game.user.id.toggleCameras = () => {
//     // if(game.user.id.cameraView === 1){
//         game.scene.activeCamera = game.scene.cameras[0];
//     // }
// }


game.mainTick = () => {
    game.room.id.delta = window.__emscripten_date_now() - game.room.id.previousTick;
    
    if((game.room.id.delta) >= 250){
        game.room.id.previousTick = window.__emscripten_date_now();
        game.room.id.setNextNotes(game.room.id.recommendationsScale.ascending)
        // READS MAIN TICK DELTA!!!
        // console.log("Tick! ", game.room.id.delta);
       
        game.room.id.delta === 0;
        if(game.user.id.isPlaying){
            console.log("updating py with note we just played");
            beginPyAnalysisNote(game.user, game.user.id.latestPitch.noteLetter, game.user.id.latestOctave.octave, game.user.id.latestMingusNumNote, game.user.id.latestKeyNotePiano, game.user.id.latestKeyNoteOrgan, game.user.id.latestMidiNoteNumber, game.room.id.bpm);
        }
    }
    let currPitch = pitchChanged();
    if(currPitch === "NaN"){
        player.position.z = player.position.z || 0;
    } else{
        console.log("GROUND HEIGHT: ", ground.height);
        console.log("PLAYER z ", player.position.z);
        player.position.z = game.scene.camera.position.z = currPitch - ground.height;
        playerY_Observable.add(()=>{
            game.scene.camera.position.z = player.position.z;
        });
        playerY_Observable.notifyObservers();
        async function setFollowCamera(){
            // This targets the camera to scene origin
            let targetMesh = await game.scene.meshes[0];
        
            game.scene.cameraspeed = 0;
            game.scene.cameraheightOffset = 8;
            game.scene.cameraradius = 1;
            game.scene.cameracameraAcceleration = 0.005;
        //     game.scene.cameramaxCameraSpeed = 10;
            // game.scene.cameralockedTarget = targetMesh;
            game.scene.camerasetTarget(targetMesh.position);
            // game.scene.cameraposition.y = game.scene.meshes[0].position.z;
        }
        setFollowCamera();

    }    
}


let start, previousTimeStamp;
let done = false


game.animation.fps = 60;
var now;
var then;
var interval = 10000/game.animation.fps;
var delta;

function tick(now) {
    if (!then) { then = now; }
    requestAnimationFrame(tick);
    delta = now - then;

    if (delta > interval) {
        // update time stuffs
       
        // Just `then = now` is not enough.
        // Lets say we set fps at 10 which means
        // each frame must take 100ms
        // Now frame executes in 16ms (60fps) so
        // the loop iterates 7 times (16*7 = 112ms) until
        // delta > interval === true
        // Eventually this lowers down the FPS as
        // 112*10 = 1120ms (NOT 1000ms).
        // So we have to get rid of that extra 12ms
        // by subtracting delta (112) % interval (100).
        // Hope that makes sense.

        then = now - (delta % interval);
    
        // ... Code for Ticking the Frame ...
        game.mainTick();
    }
}

tick();
