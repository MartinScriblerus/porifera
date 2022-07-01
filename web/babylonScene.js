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
scene.useRightHandedSystem = true;
scene.collisionsEnabled = true;
scene.actionManager = new BABYLON.ActionManager(scene);
engine.getInputElement = () => canvas

game.scene = scene;

console.log("Game Scene: ", game.scene);

// var createScene = function () {

game.animation.fps = 60;

// This creates and positions a free camera (non-mesh)
game.scene.camera = new BABYLON.FollowCamera("camera1", new BABYLON.Vector3(0, 3, 0), scene);
    // camera 1
game.scene.camera1 = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 10, 0), scene);
game.scene.camera1.setTarget(BABYLON.Vector3.Zero());


scene.getCameraByID("camera1").alpha = 1.4233160050013756;
scene.getCameraByID("camera1").beta = 1.77290545417584;

scene.activeCameras.push(game.scene.camera1);
scene.activeCameras.push(game.scene.camera);

game.scene.camera.viewport = new BABYLON.Viewport(0, 0.4, 0.2, 0.8);
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
    game.user.id.player = player;
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
box.scaling.z = 1/(12*game.room.id.targetOctaveRange);
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

game.createTimeRow = () => {
    console.log("CHECK THIS FOR TICK CANDIDATE: ", window.__emscripten_date_now() - game.room.id.startGameTick);
   
};

game.createBoxRow = (isMeasured, keysToCreate) => {
// try{createBoxRow

    if(!keysToCreate || keysToCreate === []){
       isMeasured = false
    } else {
        // console.log("keys to create: ", keysToCreate);
    }

    let boxInstances = []

    game.room.id.timeGroup = game.room.id.timeGroup + 1;

    let convertedRange;

    if(!keysToCreate){
        convertedRange = 2;
    } else {
    //    convertedRange = 12 * game.room.id.targetOctaveRange;
    convertedRange = game.room.id.highestNoteOnScreen - game.room.id.lowestNoteOnScreen;
    }
    // console.log("WHAT IS CONVERTED RANGE: ", convertedRange);
    for(let x = 1; x< convertedRange; x++){
        // console.log("KEYS TO CREATE INSIDE LOOP: ", keysToCreate); 
        boxInstances[x-1] = {};
        // this is not growing 
        //console.log("HOW MANY BOXES DO WE HAVE? ", boxInstances.length);

        // game.room.id.octavesDiff;
        if(x>12){
            game.room.id.octavesDiff = Math.floor(x/12);
        }
        
        // this works =>
        //console.log("OCTAVES DIFF: ", game.room.id.octavesDiff);
        game.room.id.currentOctave = parseInt(game.room.id.targetOctave) + parseInt(game.room.id.octavesDiff);
        // }
        if(!game.scene || !game.scene.meshes || !game.room.id.recommendationsScale.basicKeys){
            return;
        }
        let allMeshes = game.scene.meshes;
        let exists = false;
        let noDupes = game.scene.meshes.filter(element => element.id === `activeNote_${game.room.id.recommendationsScale.ascending[game.room.id.scalePosition]}_${game.room.id.currentOctave}`);
        // for(let u = 0; u < allMeshes.length; u++){
        //     if(x === 1 && allMeshes[u].id.indexOf() !== -1){
        //         exists = true;
        //     }
        // } 

        if((isMeasured && 
            game.room.id.recommendationsScale &&
            game.room.id.recommendationsScale.ascending &&
            // game.room.id.recommendationsScale.ascending.length > 1
            // this line picks a single octave... tk
            // !game.scene.getMeshByID(`activeNote_${game.room.id.recommendationsScale.basicKeys[(x-1)%13]}_${game.room.id.currentOctave}`)){
            (noDupes.length <= 1)) &&
            game.room.id.recommendationsScale.basicKeys[(x-1)%12] === game.room.id.targetNote
            ){

                boxInstances[x-1] = box.clone(`activeNote_${game.room.id.recommendationsScale.basicKeys[(x-1)%12]}_${game.room.id.currentOctave}`);
                
                boxInstances[x-1].speed = 0.1;
                boxInstances[x-1]._position.z = ((((game.scene.meshes[1]._height / 2) - (x * (((1/convertedRange) * game.scene.meshes[1]._height))))) ); 

                // ====> sets height at double to give effect of tick
                boxInstances[x-1]._scaling.z = 2 * (game.scene.meshes[1]._height * (1/(game.room.id.targetOctaveRange * convertedRange)));
                boxInstances[x-1].material = game.getNoteMaterial(game.room.id.recommendationsScale.basicKeys[(x-1)%12]);

                boxInstances[x-1].material.emissiveColor = game.getNoteColor(game.room.id.recommendationsScale.basicKeys[(x-1)%12]);   
                boxInstances[x-1].id = `activeNote_${game.room.id.recommendationsScale.basicKeys[(x-1)%12]}_${game.room.id.currentOctave}`;
                boxInstances[x-1].checkCollisions = true;
                boxInstances[x-1].actionManager = new BABYLON.ActionManager(scene);
                boxInstances[x-1]._rotation.z = Math.PI;
               
                boxInstances[x-1].metadata = {
                    pitch: game.room.id.recommendationsScale.basicKeys[(x-1)%12] + (game.room.id.currentOctave),
                    noteValue: game.room.id.lowestNoteOnScreen + x
                }

                let oldMeshes = [];
                if(((game.room.id.recommendationsScale.basicKeys[(x-1)%12]) === game.room.id.targetNote)){
                    console.log("WHAT WOULD THIS BE DOING WRONG ? ", game.room.id.targetNote);
                    if((x === 1) && (game.room.id.creatingFirstMesh !== true)){
                        return;
                    }
                    game.room.id.creatingFirstMesh = true;
                    let Writer;

                    Writer = MeshWriter(game.scene, { scale: 1, defaultFont: "Arial" });
                    let lettersArr = [];
                    let boxesArr = [];
 
                    // let octaveNow = parseInt(game.room.id.targetOctave) + parseInt(game.room.id.octavesDiff);
                    if(game.room.id.octavesDiff){
 
                        let col = game.getNoteColor(game.room.id.targetNote);
                        let red = col.r * 255;
                        let green = col.g * 255;
                        let blue = col.b * 255;

                        function rgbToHex(r,g,b) {
                            r = r.toString(16);
                            g = g.toString(16);
                            b = b.toString(16);
                        
                            if (r.length == 1)
                            r = "0" + r;
                            if (g.length == 1)
                            g = "0" + g;
                            if (b.length == 1)
                            b = "0" + b;
                        
                            return "#" + r + g + b;
                        }

                        game.room.id.currentLetterMesh = new Writer(game.room.id.targetNote + " " + (game.room.id.currentOctave), {
                            "font-family": "Arial",
                            "letter-height": 0.75,
                            "letter-thickness": 0.4,
                            color: rgbToHex(red, green, blue),
                            anchor:boxInstances[x-1],
                            id: "noteLetterMesh_" + game.room.id.targetNote + "_" + (game.room.id.currentOctave),
                            colors: {
                                // diffuse: "#F0F0F0",
                                // specular: "#000000",
                                // ambient: "#F0F0F0",
                                emissive: rgbToHex(red, green, blue),
                            },
                            position: new BABYLON.Vector3(boxInstances[x-1]._position.x + 0.75, 1, boxInstances[x-1]._position.z),
                        });
                        if(game.room.id.currentLetterMesh ){
                            console.log("WTF IS THIS MESH? ", game.room.id.currentLetterMesh.getMesh());
                        
                        game.room.id.currentLetterMesh.getMesh().rotation._y = game.room.id.currentLetterMesh.getMesh().rotation._y - 2* Math.PI;
                        game.room.id.currentLetterMesh.getMesh().rotation._x = game.room.id.currentLetterMesh.getMesh().rotation._x - Math.PI;
                        game.room.id.currentLetterMesh.getMesh().rotation._z = game.room.id.currentLetterMesh.getMesh().rotation._z - Math.PI; 
    
                        game.room.id.currentLetterMesh.getMesh()._position._y = 2;
                        game.room.id.currentLetterMesh.getMesh()._rotation._z = 2 * Math.PI;
                        // if(game.room.id.currentLetterMesh.getLettersBoxes().length > 1){
                        //     game.room.id.currentLetterMesh.getLettersBoxes()[0] .dispose();
                        // }
                        game.room.id.currentLetterMesh.getMesh().setParent(boxInstances[x-1]);
                        
                    
                    }
              
                }
                
                } else {
                    //if(boxInstances[x-1].id.split[1] !== game.room.id.targetNote){
                        boxInstances[x-1].dispose();
                    // }
                    if(game.room.id.delta === 0){
                        console.log("Box instances: ", boxInstances);
                        
                        

                    }
                    // // console.log("HIT DISPOSE 513");
                    // game.scene.meshes.indexOf(game.scene.getMeshByID("noteLetterMesh_" + game.room.id.targetNote + "_" + (game.room.id.targetOctave + game.room.id.octavesDiff)));
                    
                    // oldMeshes.push(boxInstances[x-1])
                    // if(oldMeshes.length > 1){
                    //     //game.scene.getMeshByID(game.room.id.targetNote + "_" + (game.room.id.targetOctave + game.room.id.octavesDiff))[1].dispose();
                    //     console.log("JUST HIT THIS... ready for DISPOSAL ", oldMeshes);
                    // }
                }
            }
        
        

            if(isMeasured === false){
                boxInstances[x-1] = box.clone(`activeNote_${scalePosition[0]}_0`);
                            
                boxInstances[x-1].speed = 0.1;
                boxInstances[x-1]._position.z = (game.scene.meshes[1]._height / 2) ; 

                // ====> sets height at double to give effect of tick
                boxInstances[x-1]._scaling.x = 0.2;
                boxInstances[x-1]._scaling.z = game.scene.meshes[1]._height;
                boxInstances[x-1].material = game.getNoteMaterial(scalePosition[0]);

                boxInstances[x-1].material.emissiveColor = game.getNoteColor(gscalePosition[0]);   
                boxInstances[x-1].id = `activeNote_${scalePosition[0]}_${-1}`;
                boxInstances[x-1].checkCollisions = true;
                boxInstances[x-1].actionManager = new BABYLON.ActionManager(scene);
                boxInstances[x-1]._rotation.z = Math.PI;
            
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

                // console.log("CHECK!!!!");
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

        xSlide.setKeys(keyFrames);
        if(boxInstances[x-1]){
            if(boxInstances[x-1] && boxInstances[x-1].animations){
                boxInstances[x-1].animations.push(xSlide);
                scene.beginAnimation(boxInstances[x-1], 0, (game.room.id.bpmInverted/30) * frameRate, true);
            }
        }
    }    
};

game.room.id.cleanMeshes = () => {
    
    if(!game.scene.meshes){
        return;
    }
    let meshesToDestroy = game.scene.meshes;
    console.log("hit clean meshes / meshes: ", meshesToDestroy);
    let meshHolder = [];
    while(game.scene.meshes.length > 5){
        for(let u= 5; u < meshesToDestroy.length; u++){
            
            if(meshesToDestroy[u]){
                // if(meshesToDestroy[u] && meshesToDestroy[u].name.indexOf('activeNote_') === -1){
                //     console.log("hit dispose 1!!! ");
                //     meshesToDestroy[u].dispose();
                //     let oldLetterMeshes = game.scene.getMeshByID("noteLetterMesh");
                    
                //     if(oldLetterMeshes > 1){
                //         game.scene.getMeshByID("noteLetterMesh").dispose();
                //     }
                if(meshesToDestroy[u].id.indexOf("activeNote_" + game.room.id.targetNote) === -1){
                    meshesToDestroy[u].dispose();
                    
                } else {
                    console.log("TARGET MESH FOUND: ", game.room.id.targetNote);
                }      
                

            } else {
                meshHolder.push(meshesToDestroy[u])
                if(meshHolder.length > 15){
                    console.log("hit dispose 1!!! ");
                    // game.scene.getMeshById("noteLetterMesh").dispose();
                    alert("hit1");
                    meshHolder.forEach((mesh)=>{mesh.dispose()});
                }    
                console.log("meshholder length: ", meshHolder.length);
            }
        }
    }
    console.log("should be just 5 here...", meshesToDestroy)
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
    
    // if((game.room.id.delta) > ((game.room.id.boxAnimationAcrossScreen) /game.countNumerator) ){
    //     if(game.countNumerator > game.room.id.scalePosition){
       
    //     } else {
    //         // HANDLE CHANGE SCALE POSITION HERE!!!
    //     }   
    // }


    if(game.room.id.bpmInverted){
        
        let bpmDisplay = document.getElementById("bpmDisplay");
        bpmDisplay.innerText = game.room.id.bpm;
        game.room.id.deltaBPMAdjusted = game.room.id.delta * (120/game.room.id.bpmInverted);
    }
    
    // if((game.room.id.delta) >= (game.room.id.boxAnimationAcrossScreen) * 4){
        //most recent edit...causes quicker updates to scale position... 
    // if((game.room.id.delta) >= (game.room.id.boxAnimationAcrossScreen/8)){
        if((game.room.id.delta) >= (game.room.id.boxAnimationAcrossScreen/4)){
        
        //game.room.id.delta = 0;
        
        if(game.room.id.scalePosition){
            if(game.room.id.recommendationsScale && 
            game.room.id.recommendationsScale.ascending && 
            game.room.id.scalePosition <= game.room.id.recommendationsScale.ascending.length - 1){
                game.room.id.updateScalePositionDom();
                game.createBoxRow(true, game.room.id.recommendationsScale.basicKeys);
            } else {
                game.room.id.scalePosition = 0;
                game.room.id.updateScalePositionDom();
                game.room.id.intervalPosition = game.room.id.intervalPosition + 1;
                game.room.id.updateCurrentIntervalDom();
                
            }
        } 
        if(game.room.id.recommendationsScale.ascending && game.room.id.recommendationsScale.ascending){
            game.room.id.targetNote = game.room.id.recommendationsScale.ascending[game.room.id.scalePosition];
            game.room.id.updateTargetNoteDom();
        }
        game.room.id.previousTick = window.__emscripten_date_now();

        // READS MAIN TICK DELTA!!!
        // console.log("Tick! ", game.room.id.delta);
     
        if((game.user.id.isPlaying) && (game.room.id.delta > ((game.room.id.boxAnimationAcrossScreen) /game.countNumerator) )){
            if(game.room.id.recommendationsScale.ascending && game.room.id.recommendationsScale.basicKeys && (game.room.id.recommendationsScale.basicKeys > game.room.id.scalePosition)){

                if(game.room.id.scalePosition%(game.room.id.countNumerator) ===0){
                   // game.room.id.cleanMeshes();
                    console.log("ARE WE HITTING THIS???");
                }
            } 
        }
        
        if(window.__emscripten_date_now() - game.room.id.timeTickMeasureStart > 0){
                game.room.id.timeTickMeasureStart = window.__emscripten_date_now() + 125;
               // game.createBoxRow(false, []);
        }

        
        let firstKey; 
        // if(game.room.id.recommendationsScale.basicKeys && game.room.id.recommendationsScale.basicKeys.length > 0){
        //     // DOES THIS ACTUALLY WORK???
        //     firstKey = game.scene.meshes.indexOf("activeNote_") !== -1;
        // }
        if(game.user.id.isPlaying){
            if(game.room.id.expectedDelta > game.room.id.delta){
                game.room.id.delta = 0;
                game.createTimeRow();
            }
            if(game.room.id.delta%250 || (game.room.id.scalePosition === 0)){
                // THIS ONE IS LEGIT =>
                //console.log("CREATING A ROW WITH THESE BASIC KEYS: ", game.room.id.recommendationsScale.basicKeys);
                //game.room.id.timeTickMeasureStart = window.__emscripten_date_now() + 125;
               // game.createBoxRow(true, game.room.id.recommendationsScale.basicKeys);
            }
            //console.log("updating py with note we just played");
            beginPyAnalysisNote(game.user, game.user.id.latestPitch.noteLetter, game.user.id.latestOctave.octave, game.user.id.latestMingusNumNote, game.user.id.latestKeyNotePiano, game.user.id.latestKeyNoteOrgan, game.user.id.latestMidiNoteNumber, game.room.id.bpmInverted);
        }
        
    }


    let currPitch = pitchChanged();
    
    if(currPitch === "NaN"){
        player.position.z = player.position.z;
    } else{
        
        player.position.z = game.scene.camera.position.z = currPitch - ground.height;
        console.log("are we ummm hitting this???? ", player.position.z);
        playerY_Observable.add(()=>{
            game.scene.camera.position.z = player.position.z;
        });
        playerY_Observable.notifyObservers();
        async function setFollowCamera(){
            // This targets the camera to scene origin
            let targetMesh = await game.scene.meshes[0];
        
            game.scene.camera.speed = 0;
            game.scene.camera.heightOffset = 8;
            game.scene.camera.radius = 1;
            game.scene.camera.cameraAcceleration = 0.005;
        //     game.scene.cameramaxCameraSpeed = 10;
            // game.scene.cameralockedTarget = targetMesh;
            game.scene.camera.setTarget(targetMesh.position);
            // game.scene.cameraposition.y = game.scene.meshes[0].position.z;
        }
        setFollowCamera();

    }    
}


let start, previousTimeStamp;
let done = false


// game.animation.fps = 60;
var now;
var then;
var interval = 10000/game.animation.fps;
var delta;

function tick(now) {
    if (!then) { then = now; }
    requestAnimationFrame(tick);
    delta = now - then;

    if (delta > interval) {
        // update time stuffsx
       
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

