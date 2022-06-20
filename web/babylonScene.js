import "./index.js";
import {pitchChanged} from "./AudioThreadManagerHooks.js";
// import * as BABYLON from "https://unpkg.com/@babylonjs/core@4.0.0-beta.1/index.js?module";
import "./babylon.4.2.0.min.js";
import "./babylon.gui.4.2.0.min.js";
import "./babylon.loaders.4.2.0.min.js";
import "./babylon-inspector.min.js";
import { beginPyAnalysisNote } from "./beginPyAnalysisNote.js"

console.log("??? BABYLOON ", BABYLON);

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
game.ground = game.ground || ground;
game.ground.material = groundMaterial;
game.ground.material.alpha = 1;
let r = 98/255;
let b = 176/255;
let g = 155/255;
game.ground.material.emissiveColor = new BABYLON.Color3(r,b,g);
game.ground.material.disableLighting = true;
game.ground.scaling.x = 1;
game.ground.scaling.z = 1;

game.ground.material.diffuseColor = new BABYLON.Color3(r,b,g);
game.ground.material = groundMaterial; // <--
// groundMaterial.diffuseTexture = new BABYLON.Texture("https://i.imgur.com/GNlBk3u.png", scene);
ground.material.diffuseTexture = new BABYLON.Texture("https://static.vecteezy.com/system/resources/previews/002/968/296/non_2x/flat-design-nature-landscape-with-hills-and-clouds-free-vector.jpg", scene);
// game.ground = ground;

player.checkCollisions = true;
player.applyGravity = true;
player.ellipsoid = new BABYLON.Vector3(0.9, 0.45, 0.9);
player.speed = new BABYLON.Vector3(0, 0, 0.0);
player.nextspeed = new BABYLON.Vector3.Zero();
player.nextspeed = player.nextspeed || {};


scene.registerBeforeRender(function () {
    //player speed
    var v = 0.5;
    
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



// console.log("!!!!!!!!!BOUNDING INFO!!!@ ",game.scene.meshes[1]._width / 6);
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
// box.material.diffuseColor = new BABYLON.Color3.FromHexString("#DFFF3D");
// box.material.emissiveColor = new BABYLON.Color3.FromHexString("#FF30C2");


game.boxBlueprint = game.boxBlueprint || {};
game.boxBlueprint = box;
// let boxInstances = [];
// for(let x = 0; x< 64; x++){
//     box.clone(`boxNote_instance-${x}`);
// }

game.scene.material_C = new BABYLON.StandardMaterial(scene);
game.scene.color_C = new BABYLON.Color3.FromHexString("#E33836");

game.scene.material_Cs = new BABYLON.StandardMaterial(scene);
game.scene.color_Cs = new BABYLON.Color3.FromHexString("#ffffff");

game.scene.material_D = new BABYLON.StandardMaterial(scene);
game.scene.color_D = new BABYLON.Color3.FromHexString("#4C4AFF");

game.scene.material_Ds = new BABYLON.StandardMaterial(scene);
game.scene.color_Ds = new BABYLON.Color3.FromHexString("#AF4AFF");

game.scene.material_E = new BABYLON.StandardMaterial(scene);
game.scene.color_E = new BABYLON.Color3.FromHexString("#4773F5");

game.scene.material_F = new BABYLON.StandardMaterial(scene);
game.scene.color_F = new BABYLON.Color3.FromHexString("#ffffff");


game.scene.material_Fs = new BABYLON.StandardMaterial(scene);
game.scene.color_Fs = new BABYLON.Color3.FromHexString("#3CFA9B");

game.scene.material_G = new BABYLON.StandardMaterial(scene);
game.scene.color_G = new BABYLON.Color3.FromHexString("#2B98E3");

game.scene.material_Gs = new BABYLON.StandardMaterial(scene);
game.scene.color_Gs = new BABYLON.Color3.FromHexString("#E3B814");

game.scene.material_A = new BABYLON.StandardMaterial(scene);
game.scene.color_A = new BABYLON.Color3.FromHexString("#3643E3");

game.scene.material_As = new BABYLON.StandardMaterial(scene);
game.scene.color_As = new BABYLON.Color3.FromHexString("#E37242");

game.scene.material_B = new BABYLON.StandardMaterial(scene);
game.scene.color_B = new BABYLON.Color3.FromHexString("#2B99E3");


game.createBoxRow = (isMeasured) => {
    let boxInstances = [];
    
    game.room.id.timeGroup = game.room.id.timeGroup + 1;

    // this will replace 128 as # => 
        // if octaveRange = 0 we need 11 boxes
    let convertedRange = 128 * (game.room.id.targetOctaveRange / 10)
    if(!isMeasured){
        convertedRange = 2;
    }
    for(let x = 1; x< convertedRange; x++){
        // boxInstances[x] = BABYLON.MeshBuilder.CreateBox("noteBox_" + x, {}, scene);
        if(!x%12 || (x%12>12 || x === 0)){
            return;
        }

        let checkExisting = game.scene.getMeshByID("noteBox_" + x);
        let checkExistingTick = game.scene.getMeshByID(`tickbox_${game.room.id.timeGroup}_${game.room.id.currentCount}_${x}`);
        if(checkExisting || checkExistingTick){
            return;
        } else {
            boxInstances[x] = box.clone("noteBox_" + x + "_" + game.room.id.timeGroup);
            boxInstances[x].speed = 0.1
            // boxInstances[x].position.z = (game.scene.meshes[1]._height / 2) - (x * (10/128));
            
            if(isMeasured === false){
                boxInstances[x].position.z = 0;
                boxInstances[x].scaling.z = 10;
                boxInstances[x].scaling.x = 1/16;
                boxInstances[x].timeGroup = game.room.id.timeGroup,
                boxInstances[x].position.z = 0; 
                boxInstances[x].name = `tickbox_${game.room.id.timeGroup}_${game.room.id.currentCount}_${x}`;
            } else {
                boxInstances[x].position.z = ((game.scene.meshes[1]._height / 2) - (x * ((10/128) * (10/game.room.id.targetOctaveRange)))); 
                switch(x%12){
                    case 1:
                        boxInstances[x].material = game.scene.material_C;
                        boxInstances[x].material.emissiveColor = game.scene.color_C;
                        break;
                    case 2:
                        boxInstances[x].material = game.scene.material_Cs;
                        boxInstances[x].material.emissiveColor = game.scene.color_Cs;             
                        break;
                    case 3:
                        boxInstances[x].material = game.scene.material_D;
                        boxInstances[x].material.emissiveColor = game.scene.color_D;
                        break;
                    case 4:
                        boxInstances[x].material = game.scene.material_Ds;
                        boxInstances[x].material.emissiveColor = game.scene.color_Ds;
                    case 5:
                        boxInstances[x].material = game.scene.material_E;
                        boxInstances[x].material.emissiveColor = game.scene.color_E;
                        break;
                    case 6:
                        boxInstances[x].material= game.scene.material_F;
                        boxInstances[x].material.emissiveColor = game.scene.color_F;
                        break;
                    case 7:
                        boxInstances[x].material= game.scene.material_Fs;
                        boxInstances[x].material.emissiveColor = game.scene.color_Fs;
                        break;
                    case 8:
                        boxInstances[x].material = game.scene.material_G;
                        boxInstances[x].material.emissiveColor = game.scene.color_G;
                        break;
                    case 9:
                        boxInstances[x].material = game.scene.material_Gs;
                        boxInstances[x].material.emissiveColor = game.scene.color_Gs;
                        break;
                    case 10:
                        boxInstances[x].material = game.scene.material_A;
                        boxInstances[x].material.emissiveColor = game.scene.color_A;
                        break;
                    case 11:
                        boxInstances[x].material = game.scene.material_As;
                        boxInstances[x].material.emissiveColor = game.scene.color_As;
                    case 12:
                        boxInstances[x].material = game.scene.material_B;
                        boxInstances[x].material.emissiveColor = game.scene.color_B;
                    default:
                        // game.createBoxRow();
                        // console.log("no box reading");
                }
            }
    
    
    
            if(game.room.id.timeGroup > 4){
                game.room.id.timeGroup = 0;
            } 
            // boxInstances[x].setParent(boxInstances[0])
            boxInstances[x].setParent(boxInstances[0])
            boxInstances[x].parent = boxInstances[0];
        }
      
       
        //console.log("WHAT ARER BOX INSTANCES??? : ", boxInstances);

        const frameRate = game.animation.fps;

        const xSlide = new BABYLON.Animation("xSlide", "position.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
        game.previousTime = game.previousTime || game.room.id.startGameTick;

        var assessAudio = new BABYLON.AnimationEvent(
            ((game.room.id.bpm/30)/2)/16 * frameRate,
            function () {
                let timeNow = window.__emscripten_date_now();  
                let startTime = game.previousTime;
              
                let timeElapsed = (timeNow - startTime) % 10;  
      
               
                let timeAnalysisBucket = (timeElapsed) / 1000;

   
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
            alert("now");
            //beginPyAnalysisNote(game.user, game.user.id.latestPitch.noteLetter, game.user.id.latestOctaveNote.octave, game.user.id.latestMingusNumNote, game.user.id.latestKeyNotePiano, game.user.id.latestKeyNoteOrgan, game.user.id.latestMidiNoteNumber, game.room.id.bpm);
            boxInstances.forEach((x)=>{x.dispose()});
            console.log("WHAT ARE BOX INSSTAMCES!!!!>>> ", boxInstances);
            // beginPyAnalysisNote()
        }


        xSlide.setKeys(keyFrames);
        boxInstances[x].animations.push(xSlide);
        scene.beginAnimation(boxInstances[x], 0, (game.room.id.bpm/30) * frameRate, true);

    }
    game.user.boxInstances = boxInstances;
  
    return boxInstances;
};

game.room.id.cleanMeshes = () => {
    console.log("hit clean meshes");
    let meshesToDestroy = game.scene.meshes;
    for(let u= 5; u < meshesToDestroy.length; u++){
        // if(meshesToDestroy[u].material){
        //     meshesToDestroy[u].material.dispose();
        // }
        if(meshesToDestroy[u]){
            // meshesToDestroy[u] = null;
            meshesToDestroy[u].dispose();
            
        }
        console.log("WTF ARE MRSHES???: ", game.scene.meshes)
    }
};

game.room.id.cleanTickMeshes = () => {
    console.log("hit clean TICK meshes");
    game.scene.meshes.forEach((c)=>{
        if(c.name.split('_')[0] === "tickBox"){
            game.cleanTickMeshes();
        }
    })
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
    
    if((game.room.id.delta) > ((game.room.id.boxAnimationAcrossScreen/2) /game.countNominator) * game.room.id.boxAnimationAcrossScreen%(game.currentCount+1)){

        if(game.countNominator > game.currentCount){
            game.currentCount += game.currentCount; 

            game.createBoxRow(false);
        } else {
            game.currentCount = 0; 
        }    
    }

    // if((game.room.id.delta) >= game.room.id.boxAnimationAcrossScreen){
    //     game.createBoxRow(false);
    // }

    if((game.room.id.delta) >= game.room.id.boxAnimationAcrossScreen){
        console.log("CLEAN THOSE MESHES!");

        game.room.id.previousTick = window.__emscripten_date_now();
        game.room.id.setNextNotes(game.room.id.recommendationsScale.ascending)
       // game.room.id.cleanMeshes();
        // READS MAIN TICK DELTA!!!
        // console.log("Tick! ", game.room.id.delta);
     
        if(game.user.id.isPlaying){
            game.createBoxRow(true);
            game.room.id.cleanMeshes();
        }
        
       
        game.room.id.delta === 0;
        if(game.user.id.isPlaying){
            //console.log("updating py with note we just played");
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

