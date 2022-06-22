import "./index.js";
import {pitchChanged} from "./AudioThreadManagerHooks.js";
// import * as BABYLON from "https://unpkg.com/@babylonjs/core@4.0.0-beta.1/index.js?module";
import "./babylon.4.2.0.min.js";
import "./babylon.gui.4.2.0.min.js";
import "./babylon.loaders.4.2.0.min.js";
import "./babylon-inspector.min.js";
import "./meshwriter.min.js";

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

game.boxBlueprint = game.boxBlueprint || {};
game.boxBlueprint = box;


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

game.getNoteColor = (note) => {
    let response = {};
    switch(note){
        case "A":
            response = game.scene.color_A;
            return response;
        case "A#":
            response = game.scene.color_As;
            return response;
        case "Ab":
            response = game.scene.color_Gs;
            return response;
        case "B":
            response = game.scene.color_B;
            return response;
        case "B#":
            response = game.scene.color_C;
            return response;
        case "Bb":
            response = game.scene.color_As;
            return response;
        case "C":
            response = game.scene.color_C;
            return response;
        case "C#":
            response = game.scene.color_Cs;
            return response;
        case "Cb":
            response = game.scene.color_B;
            return response;
        case "D":
            response = game.scene.color_D;
            return response;
        case "D#":
            response = game.scene.color_Ds;
            return response;
        case "Db":
            response = game.scene.color_Cs;
            return response;
        case "E":
            response = game.scene.color_E;
            return response;
        case "E#":
            response = game.scene.color_F;
            return response;
        case "Eb":
            response = game.scene.color_Ds;
            return response;
        case "F":
            response = game.scene.color_F;
            return response;
        case "F#":
            response = game.scene.color_Fs;
            return response;
        case "Fb":
            response = game.scene.color_E;
            return response;
        case "G":
            response = game.scene.color_G;
            return response;
        case "G#":
            response = game.scene.color_Gs;
            return response;
        case "Gb":
            response = game.scene.color_Fs;
            return response;
    }
};

game.getNoteMaterial = (note) => {
    let response = {};
    switch(note){
        case "A":
            response = game.scene.material_A;
            return response;
        case "A#":
            response = game.scene.material_As;
            return response;
        case "Ab":
            response = game.scene.material_Gs;
            return response;
        case "B":
            response = game.scene.material_B;
            return response;
        case "B#":
            response = game.scene.material_C;
            return response;
        case "Bb":
            response = game.scene.material_As;
            return response;
        case "C":
            response = game.scene.material_C;
            return response;
        case "C#":
            response = game.scene.material_Cs;
            return response;
        case "Cb":
            response = game.scene.material_B;
            return response;
        case "D":
            response = game.scene.material_D;
            return response;
        case "D#":
            response = game.scene.material_Ds;
            return response;
        case "Db":
            response = game.scene.material_Cs;
            return response;
        case "E":
            response = game.scene.material_E;
            return response;
        case "E#":
            response = game.scene.material_F;
            return response;
        case "Eb":
            response = game.scene.material_Ds;
            return response;
        case "F":
            response = game.scene.material_F;
            return response;
        case "F#":
            response = game.scene.material_Fs;
            return response;
        case "Fb":
            response = game.scene.material_E;
            return response;
        case "G":
            response = game.scene.material_G;
            return response;
        case "G#":
            response = game.scene.material_Gs;
            return response;
        case "Gb":
            response = game.scene.material_Fs;
            return response;
    }
};

game.createBoxRow = (isMeasured, keysToCreate) => {
    let boxInstances = [];
    if(keysToCreate){
        console.log("HERE ARE OUR KEYS TO CREATE!!!!!: ", keysToCreate);

    }
    game.room.id.timeGroup = game.room.id.timeGroup + 1;

    // console.log("this is the keys up ==> ", game.room.id.recommendationsScale.basic_keys_ascending);
    // this will replace 128 as # => 
        // if octaveRange = 0 we need 11 boxes
    // let convertedRange = 128 * (game.room.id.targetOctaveRange / 10)
    let convertedRange;
    if(!isMeasured){
        convertedRange = 2;
    } else {
        convertedRange = keysToCreate;
    }
    // let convertedRange = 2;
    for(let x = 1; x< convertedRange; x++){
        console.log("KEYS TO CREATE: ", keysToCreate);
    // for(let x = 1; x< keysToCreate.length; x++){
        
        let boxInstances = [];
       
        if(isMeasured && 
            game.room.id.recommendationsScale.basic_keys_ascending ){
            //for(let bka = 0; bka < game.room.id.recommendationsScale.basic_keys_ascending.basic_keys.length; bka++){
                boxInstances[x] = box.clone("activeNote_" + x + "_" + game.room.id.timeGroup);
                console.log("EEEEE HERE!!!");
                boxInstances[x].speed = 0.1

                boxInstances[x].position.z = ((game.scene.meshes[1]._height / 2) - (x * ((1/12) * (12/game.room.id.targetOctaveRange)))); 
                boxInstances[x].material = game.getNoteMaterial(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]);
                boxInstances[x].material.emissiveColor = game.getNoteColor(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]);   
                    
                    switch(x%12){
                        case 1:
                            //alert(game.room.id.recommendationsScale.basic_keys_ascending[x-1])
                            boxInstances[x].material = game.getNoteMaterial(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]);
                            boxInstances[x].material.emissiveColor = game.getNoteColor(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]); 
                            return boxInstances;
                        case 2:
                            boxInstances[x].material = game.getNoteMaterial(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]);
                            boxInstances[x].material.emissiveColor = game.getNoteColor(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]);           
                            return boxInstances;
                        case 3:
                            boxInstances[x].material = game.getNoteMaterial(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]);
                            boxInstances[x].material.emissiveColor = game.getNoteColor(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]); 
                            return boxInstances;
                        case 4:
                            boxInstances[x].material = game.getNoteMaterial(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]);
                            boxInstances[x].material.emissiveColor = game.getNoteColor(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]); 
                            return boxInstances;
                        case 5:
                            boxInstances[x].material = game.getNoteMaterial(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]);
                            boxInstances[x].material.emissiveColor = game.getNoteColor(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]); 
                            return boxInstances;
                        case 6:
                            boxInstances[x].material = game.getNoteMaterial(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]);
                            boxInstances[x].material.emissiveColor = game.getNoteColor(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]); 
                            return boxInstances
                        case 7:
                            boxInstances[x].material = game.getNoteMaterial(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]);
                            boxInstances[x].material.emissiveColor = game.getNoteColor(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]); 
                            return boxInstances;
                        case 8:
                            boxInstances[x].material = game.getNoteMaterial(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]);
                            boxInstances[x].material.emissiveColor = game.getNoteColor(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]); 
                            return boxInstances;
                        case 9:
                            boxInstances[x].material = game.getNoteMaterial(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]);
                            boxInstances[x].material.emissiveColor = game.getNoteColor(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]); 
                            return boxInstances;
                        case 10:
                            boxInstances[x].material = game.getNoteMaterial(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]);
                            boxInstances[x].material.emissiveColor = game.getNoteColor(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]); 
                            return boxInstances;
                        case 11:
                            boxInstances[x].material = game.getNoteMaterial(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]);
                            boxInstances[x].material.emissiveColor = game.getNoteColor(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]); 
                            return boxInstances;
                        case 12:
                            //alert(game.room.id.recommendationsScale.basic_keys_ascending[x-1])
                            boxInstances[x].material = game.getNoteMaterial(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]);
                            boxInstances[x].material.emissiveColor = game.getNoteColor(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys[x-1]); 
                            return boxInstances[x];
                        default:
                            // game.createBoxRow();
                            console.log("no box reading");
                    }
                // }
            // }
            // for(let bkd = 0; bkd < game.room.id.recommendationsScale.basic_keys_descending.length; bkd++){
                
            // }
            console.log("BOX INSTYANCES: ", boxInstances);
            return boxInstances;
        }
        
        if(!x%12 || (x%12>12 || x === 0)){
            return;
        }

        let checkExisting = game.scene.getMeshByID("noteBox_" + x);
        let checkExistingTest = game.scene.getMeshByID("noteBox_" + x + "_" + game.room.id.timeGroup);
        let checkExistingTick = game.scene.getMeshByID(`tickbox_${game.room.id.timeGroup}_${game.room.id.currentCount}_${x}`);
        if(checkExisting || checkExistingTick || checkExistingTest){
            return;
        } 

        if(isMeasured === false){
            boxInstances[x] = box.clone("activeNote_" + x + "_" + game.room.id.timeGroup);
            boxInstances[x].speed = 0.1
            boxInstances[x].position.z = 0;
            boxInstances[x].scaling.z = 10;
            boxInstances[x].scaling.x = 1/16;
            boxInstances[x].timeGroup = game.room.id.timeGroup,
            boxInstances[x].position.z = 0; 
            boxInstances[x].name = `tickbox_${game.room.id.timeGroup}_${game.room.id.currentCount}_${x}`;
        } 
     
        if(game.room.id.timeGroup > 4){
            game.room.id.timeGroup = 0;
        } 

        if(boxInstances[x]){
            boxInstances[x].setParent(boxInstances[0])
            boxInstances[x].parent = boxInstances[0];
        }

        const frameRate = game.animation.fps;

        const xSlide = new BABYLON.Animation("xSlide", "position.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
        game.previousTime = game.previousTime || game.room.id.startGameTick;

        var assessAudio = new BABYLON.AnimationEvent(
            ((game.room.id.bpmInverted/30)/2)/16 * frameRate,
            function () {
                let timeNow = window.__emscripten_date_now();  
                let startTime = game.previousTime;
              
                let timeElapsed = (timeNow - startTime) % 10;  
      
                let timeAnalysisBucket = (timeElapsed) / 1000;

                console.log("CHECK!!!!");
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
            frame: ((game.room.id.bpmInverted/30)/2) * frameRate,
            value: 0,
        })

        keyFrames.push({
            frame: (game.room.id.bpmInverted/30) * frameRate,
            value: -(game.scene.meshes[1]._width/2),
        });

        console.log("ARE WE GETTING BOXINSTANCES??? ", boxInstances[x]);
        xSlide.setKeys(keyFrames);
        if(boxInstances[x]){
            console.log("made it to here... her eare boxInstances => ", boxInstances[x]);
            boxInstances[x].animations.push(xSlide);
            if(game.room.id.recommendationsScale.basic_keys_ascending && game.room.id.scalePosition){
                boxInstances[x].name = 'activeNote_' + game.room.id.recommendationsScale.basic_keys_ascending[game.room.id.scalePosition];
                console.log("Gave the box a name...........");
            }
            scene.beginAnimation(boxInstances[x], 0, (game.room.id.bpmInverted/30) * frameRate, true);
        }

        
    }
    game.user.boxInstances = boxInstances;
    
    return boxInstances;
};

game.room.id.createText = (inputText) => {
    //data reporter
    console.log("IN CREATE TEXT!!!");
	var outputplane = new BABYLON.Mesh.CreatePlane("outputplane", 25, scene, false);
	outputplane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
	outputplane.material = new BABYLON.StandardMaterial("outputplane", scene);
	outputplane.position = new BABYLON.Vector3(0, 0, 0);
	outputplane.scaling.y = 40;
    

	var outputplaneTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
	outputplane.material.diffuseTexture = outputplaneTexture;
	outputplane.material.specularColor = new BABYLON.Color3(0, 0, 0);
	outputplane.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
	outputplane.material.backFaceCulling = false;

    //outputplaneTexture.getContext().clearRect(0, 140, 512, 512);
	outputplaneTexture.drawText(inputText, null, 140, "bold 80px verdana", "white");

    outputplaneTexture.hasAlpha = true;
    return outputplaneTexture;
};

game.room.id.cleanMeshes = () => {
    console.log("hit clean meshes");
    if(!game.scene.meshes){
        return;
    }
    let meshesToDestroy = game.scene.meshes;
    let meshHolder = [];
    for(let u= 5; u < meshesToDestroy.length; u++){
        // if(meshesToDestroy[u].material){
        //     meshesToDestroy[u].material.dispose();
        // }
        if(meshesToDestroy[u]){
            if(meshesToDestroy[u] && meshesToDestroy[u].name && meshesToDestroy[u].name.indexOf('activeNote_') === -1){
                meshesToDestroy[u].dispose();
            } else {
                meshHolder.push(meshesToDestroy[u].name)
                if(meshHolder.length > 1000){
                    // meshesToDestroy[u].dispose();
                    console.log("meshholder length: ", meshHolder.length)
                }
            }
            
            
        }
        // console.log("WTF ARE MRSHES???: ", game.scene.meshes)
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
    
    if((game.room.id.delta) > ((game.room.id.boxAnimationAcrossScreen) /game.countNominator) * (game.room.id.boxAnimationAcrossScreen)%(game.currentCount+1)){
        if(game.countNominator > game.currentCount){
            game.currentCount += game.currentCount; 
            if(game.user.id.isPlaying && (game.currentCount%8===0)){
                if(game.user.id.isPlaying && (Object.keys(game.room.id.recommendationsScale))){
                    if((game.room.id.delta) >= (game.room.id.boxAnimationAcrossScreen)){
                        game.room.id.scalePosition = game.room.id.scalePosition + 1;
                        console.log("HUUUUUUUUUUUUUUGE=>=>=>: ", game.room.id.scalePosition);
                        console.log("recommendations object!!! ", game.room.id.recommendationsScale.basic_keys_ascending);
                        game.createBoxRow(true, game.room.id.recommendationsScale.basic_keys_ascending.basic_keys);
                        game.room.id.setNextNotes(game.room.id.recommendationsScale.basic_keys_ascending.basic_keys)
                    }
                }
            }    
        }    
    }

    if(game.room.id.bpmInverted){
        game.room.id.bpm = (120/game.room.id.bpmInverted) * 120;
        let bpmDisplay = document.getElementById("bpmDisplay");
        bpmDisplay.innerText = game.room.id.bpm;
        game.room.id.delta = game.room.id.delta * (120/game.room.id.bpmInverted);
    }

    game.room.id.delta * (game.room.id.bpmInverted/120)


    
    if((game.room.id.delta) >= (game.room.id.boxAnimationAcrossScreen) * 4){
        console.log("CLEAN THOSE MESHES!");

        game.room.id.previousTick = window.__emscripten_date_now();
        // game.room.id.setNextNotes(game.room.id.recommendationsScale.ascending)
       // game.room.id.cleanMeshes();
        // READS MAIN TICK DELTA!!!
        // console.log("Tick! ", game.room.id.delta);
     
        if(game.user.id.isPlaying ){
            // game.createBoxRow(true);
            game.room.id.cleanMeshes();
           
        }
        
       if(window.__emscripten_date_now() - game.room.id.timeTickMeasureStart > 0){
            game.room.id.timeTickMeasureStart = window.__emscripten_date_now() + 125;
            game.createBoxRow(false);
       }

        game.room.id.delta === 0;
        if(game.user.id.isPlaying){
            //console.log("updating py with note we just played");
            beginPyAnalysisNote(game.user, game.user.id.latestPitch.noteLetter, game.user.id.latestOctave.octave, game.user.id.latestMingusNumNote, game.user.id.latestKeyNotePiano, game.user.id.latestKeyNoteOrgan, game.user.id.latestMidiNoteNumber, game.room.id.bpmInverted);
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
        if(!game.room.id.isPaused){
            game.mainTick();
        }
    }
}

tick();

