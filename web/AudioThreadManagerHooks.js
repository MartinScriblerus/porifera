import { getWebAudioMediaStream, setupAudio } from "./setupAudio.js";
import { beginPyAnalysisNote } from "./beginPyAnalysisNote.js"
import "./index.js";

// ========================================
// HOOKS IMPLEMENTATION
// ========================================

function gameStarted(){
  setScale(game.room.id.targetScale);
  setScalePos(game.room.id.scalePosition); 
  setTargetKey(game.room.id.targetKey);
  setTargetOctave(game.room.id.targetOctave);
  game.room.id.setNextNotes(game.room.id.recommendationsScale.ascending);
  setOctaveRange(1);
  
  game.room.id.updateTargetNoteDom();
  game.room.id.updateTargetKeyDom();
  game.room.id.updateTargetOctaveDom();
  game.room.id.updateTargetOctaveRangeDom();
  game.room.id.updateScalePositionDom();
  game.room.id.updateScaleDom();
  game.room.id.updateFutureNotesDom();  
} 

game.room.id.setNextNotes = (targetScale) => {
  // console.log("here is scale position: ", game.room.id.scalePosition);
  // console.log("rec scale object => ",  game.room.id.recommendationsScale);
  // console.log("this is scale ascending... ", game.room.id.recommendationsScale.ascending);
  setTargetNote(game.room.id.recommendationsScale.ascending[game.room.id.scalePosition]);
  game.room.id.updateTargetNoteDom();
  // console.log("here is ascending... ", game.room.id.recommendationsScale.ascending);
  setFutureNotes(game.room.id.recommendationsScale.ascending);
  game.room.id.updateFutureNotesDom();
}

game.room.id.updateTargetNoteDom = () => {
  let targetNoteDOM = document.getElementById("targetNoteDisplay");
  if(targetNoteDOM){
    let oldNums = targetNoteDOM.childNodes;

    for(let i = 0; i < oldNums.length; i++){
      oldNums[i].remove();
      delete oldNums[i];
    }
    if(targetNote()){
      targetNoteDOM.append(targetNote());
    } else {
      targetNoteDOM.style.display = "flex";
      targetNoteDOM.append(targetNote());

    }
  }
}

game.room.id.updateTargetKeyDom = () => {
  let targetKeyDOM = document.getElementById("targetKeyDisplay");
  if(targetKeyDOM){
    let oldNums = targetKeyDOM.childNodes;

    for(let i = 0; i < oldNums.length; i++){
      oldNums[i].remove();
      delete oldNums[i];
    }
    if(targetKey()){
      targetKeyDOM.append(targetKey());
    } else {
      targetKeyDOM.style.display = "flex";
      targetKeyDOM.append(targetKey());
    }
  }
}

game.room.id.updateTargetOctaveDom = () => {
  let targetOctaveDOM = document.getElementById("targetOctaveDisplay");
  
  if(targetOctaveDOM){
    let oldNums = targetOctaveDOM.childNodes;

    for(let i = 0; i < oldNums.length; i++){
      oldNums[i].remove();
      delete oldNums[i];
    }
    if(targetOctave()){
      targetOctaveDOM.append(targetOctave());
    } else {
      targetOctaveDOM.style.display = "flex";
      targetOctaveDOM.append(game.room.id.targetOctave);
    }
  }
}

game.room.id.updateScalePositionDom = () => {
  let scalePositionDisplayDOM = document.getElementById("scalePositionDisplay");
  
  if(scalePositionDisplayDOM){
    let oldNums = scalePositionDisplayDOM.childNodes;

    for(let i = 0; i < oldNums.length; i++){
      oldNums[i].remove();
      delete oldNums[i];
    }
    if(scalePos()){
      scalePositionDisplayDOM.append(scalePos());
    } else {
      scalePositionDisplayDOM.style.display = "flex";
      scalePositionDisplayDOM.append(scalePos());
    }
  }
}

game.room.id.updateTargetOctaveRangeDom = () => {
  let octaveRangeDOM = document.getElementById("octaveRangeDisplay");
  
  if(octaveRangeDOM ){
    let oldNums = octaveRangeDOM .childNodes;

    for(let i = 0; i < oldNums.length; i++){
      oldNums[i].remove();
      delete oldNums[i];
    }
    if(octaveRange()){
      octaveRangeDOM.append(octaveRange());
    } else {
      octaveRangeDOM.style.display = "flex";
      octaveRangeDOM.append(octaveRange());
    }
  }
}

game.room.id.updateFutureNotesDom = () => {
  let futureNotesDOM = document.getElementById("futureNotesDisplay");
 // console.log("ascending sscale: ", game.room.id.recommendationsScale.ascending);
  if(futureNotesDOM){
    let oldNums = futureNotesDOM.childNodes;

    for(let i = 0; i < oldNums.length; i++){
      oldNums[i].remove();
      delete oldNums[i];
    }
    if(futureNotes()){
      futureNotesDOM.append(futureNotes());
    } else {
      futureNotesDOM.style.display = "flex";
      // futureNotesDOM.append(futureNotes());
      futureNotesDOM.append(game.room.id.recommendationsScale.ascending)
    }
  }
}

game.room.id.updateScaleDom = () => {
  let scaleDOM = document.getElementById("scaleDisplay");

  if(scaleDOM ){
    let oldNums = scaleDOM.childNodes;

    for(let i = 0; i < oldNums.length; i++){
      oldNums[i].remove();
      delete oldNums[i];
    }
    if(scale()){
      scaleDOM.append(scale());
    } else {
      scaleDOM.style.display = "flex";
      scaleDOM.append(scale());
    }
  }
}

export function pitchChanged(user, newPitch){
    let newPitchTwoDecimals = parseFloat(newPitch).toFixed(2);
    if(newPitchTwoDecimals !== undefined){
      setLatestPitch(newPitchTwoDecimals);
    }
    // * THE PITCH SHOULD NOW BE CHANGED! *
    // DISPLAY IT! =>
    let pitchDisplayDOM = document.getElementById("pitchDisplay");



    if(pitchDisplayDOM){
        let oldNums = pitchDisplayDOM.childNodes;
        game.orchestration = game.orchestration || {};
        game.orchestration.recording = game.orchestration.recording || false;
        for(let i = 0; i < oldNums.length; i++){
          oldNums[i].remove();
          delete oldNums[i];
        }
        if(latestPitch() === "NaN" ){
          // document.getElementById("pitchBox").style.display = "none";
          // let notReadyMessage = "No readings";
          pitchDisplayDOM.append(game.user.id.latestPitch.noteHz + "Hz");

          // pitchDisplayDOM.append(notReadyMessage);
          game.orchestration.recording = false;
        } else {
          document.getElementById("pitchBox").style.display = "flex";
          pitchDisplayDOM.append(latestPitch() + " Hz");
          game.user.id.latestPitch.noteHz = latestPitch();
          game.orchestration.recording = true;
        }
        
        // tktktktktktk => WHAT IS THIS?
        pitchConversion(latestPitch());


    }
   return latestPitch();
};


export function pitchConversion(latestPitch){
  if(latestPitch !== undefined && latestPitch !== "NaN"){
    game.user.id.latestPitch.noteHz = latestPitch + " ";
  }
  let latestPitchNote;
  let latestOctaveNote;
  let mingusNumNote;
  let keyNotePiano;
  let keyNoteOrgan;
  let midiNoteNumber;
  let pitchLetterDisplayDOM = document.getElementById("pitchDisplayLetter");
  let pitchOctaveDisplayDOM = document.getElementById("pitchDisplayOctave");
  switch (true) {
    case 0.00 <= latestPitch && latestPitch < 8.18:
      latestPitchNote = "Too low";
      latestOctaveNote = "Too Low";
      mingusNumNote = undefined;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = undefined;
      break;
    case 8.18 <= latestPitch && latestPitch < 8.66:
      latestPitchNote = "Too low";
      latestOctaveNote = undefined;
      mingusNumNote = undefined;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 0;
      break;
    case 8.66 <= latestPitch && latestPitch < 9.18:
      latestPitchNote = "Too low";
      latestOctaveNote = undefined;
      mingusNumNote = undefined;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 1;
      break;
    case 9.18 <= latestPitch && latestPitch < 9.72:
      latestPitchNote = "Too low";
      latestOctaveNote = undefined;
      mingusNumNote = undefined;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 2;
      break;
    case 9.72 <= latestPitch && latestPitch < 10.30:
      latestPitchNote = "Too low";
      latestOctaveNote = undefined;
      mingusNumNote = undefined;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 3;
      break;
    case 10.30 <= latestPitch && latestPitch < 10.91:
      latestPitchNote = "Too low";
      latestOctaveNote = undefined;
      mingusNumNote = undefined;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 4;
      break;  
    case 10.91 <= latestPitch && latestPitch < 11.56:
      latestPitchNote = "Too low";
      latestOctaveNote = undefined;
      mingusNumNote = undefined;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 5;
      break;
    case 11.56 <= latestPitch && latestPitch < 12.25:
      latestPitchNote = "Too low";
      latestOctaveNote = undefined;
      mingusNumNote = undefined;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 6;
      break;
    case 12.25 <= latestPitch && latestPitch < 12.98:
      latestPitchNote = "Too low";
      latestOctaveNote = undefined;
      mingusNumNote = undefined;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 7;
      break; 
    case 12.98 <= latestPitch && latestPitch < 13.75:
      latestPitchNote = "Too low";
      latestOctaveNote = undefined;
      mingusNumNote = undefined;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 8;
      break;
    case 13.75 <= latestPitch && latestPitch < 14.57:
      latestPitchNote = "Too low";
      latestOctaveNote = undefined;
      mingusNumNote = undefined;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 9;
      break;
    case 14.57 <= latestPitch && latestPitch < 15.43:
      latestPitchNote = "Too low";
      latestOctaveNote = undefined;
      mingusNumNote = undefined;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 10;
      break;
    case 15.43 <= latestPitch && latestPitch < 16.35:
      latestPitchNote = "Too low";
      latestOctaveNote = undefined;
      mingusNumNote = undefined;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 11;
      break;


    case 16.35 <= latestPitch && latestPitch < 17.32:
      latestPitchNote = "C";
      latestOctaveNote = 0;
      mingusNumNote = 0;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 12;
      break;
    case 17.32 <= latestPitch && latestPitch < 18.35:
      latestPitchNote = "C&#x266f/D&#x266d";
      latestOctaveNote = 0;
      mingusNumNote = 1;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 13;
      break;
    case 18.35 <= latestPitch && latestPitch < 19.45:
      latestPitchNote = "D";
      latestOctaveNote = 0;
      mingusNumNote = 2;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 14;
      break;
    case 19.45 <= latestPitch && latestPitch < 20.60:
      latestPitchNote = "D&#x266f/E&#x266d";
      latestOctaveNote = 0;
      mingusNumNote = 3;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 15;
      break;
    case 20.60 <= latestPitch && latestPitch < 21.83:
      latestPitchNote = "E";
      latestOctaveNote = 0;
      mingusNumNote = 4;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 16;
      break;
    case 21.83 <= latestPitch && latestPitch < 23.12:
      latestPitchNote = "F";
      latestOctaveNote = 0;
      mingusNumNote = 5;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 17;
      break;
    case 23.12 <= latestPitch && latestPitch < 24.50:
      latestPitchNote = "F&#x266f/G&#x266d";
      latestOctaveNote = 0;
      mingusNumNote = 6;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 18;
      break;
      case 24.50 <= latestPitch && latestPitch < 25.96:
      latestPitchNote = "G";
      latestOctaveNote = 0;
      mingusNumNote = 7;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 19;
      break;
    case 25.96 <= latestPitch && latestPitch < 27.50:
      latestPitchNote = "G&#x266f/A&#x266d";
      latestOctaveNote = 0;
      mingusNumNote = 8;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 20;
      break;
    case 27.50 <= latestPitch && latestPitch < 29.14:
      latestPitchNote = "A";
      latestOctaveNote = 0;
      mingusNumNote = 9;
      keyNotePiano = 1;
      keyNoteOrgan = undefined;
      midiNoteNumber = 21;
      break;
    case 29.14 <= latestPitch && latestPitch < 30.87:
      latestPitchNote = "A&#x266f/B&#x266d";
      latestOctaveNote = 0;
      mingusNumNote = 10;
      keyNotePiano = 2;
      keyNoteOrgan = undefined;
      midiNoteNumber = 22;
      break;
    case 30.87 <= latestPitch && latestPitch < 32.70:
      latestPitchNote = "B";
      latestOctaveNote = 0;
      mingusNumNote = 11;
      keyNotePiano = 3;
      keyNoteOrgan = undefined;
      midiNoteNumber= 23;
      break;

    case 32.70 <= latestPitch && latestPitch < 34.65:
      latestPitchNote = "C";
      latestOctaveNote = 1;
      mingusNumNote = 12;
      keyNotePiano = 4;
      keyNoteOrgan = undefined;
      midiNoteNumber = 24;
      break;
    case 34.65 <= latestPitch && latestPitch < 36.71:
      latestPitchNote = "C&#x266f/D&#x266d";
      latestOctaveNote = 1;
      mingusNumNote = 13;
      keyNotePiano = 5;
      keyNoteOrgan = undefined;
      midiNoteNumber = 25;
      break;
    case 36.71 <= latestPitch && latestPitch < 38.89:
      latestPitchNote = "D";
      latestOctaveNote = 1;
      mingusNumNote = 14;
      keyNotePiano = 6;
      keyNoteOrgan = undefined;
      midiNoteNumber = 26;
      break;
    case 38.89 <= latestPitch && latestPitch < 41.20:
      latestPitchNote = "D&#x266f/E&#x266d";
      latestOctaveNote = 1;
      mingusNumNote = 15;
      keyNotePiano = 7;
      keyNoteOrgan = undefined;
      midiNoteNumber = 27;
      break;
    case 41.20 <= latestPitch && latestPitch < 43.65:
      latestPitchNote = "E";
      latestOctaveNote = 1;
      mingusNumNote = 16;
      keyNotePiano = 8;
      keyNoteOrgan = undefined;
      midiNoteNumber = 28;
      break;
    case 43.65 <= latestPitch && latestPitch < 46.25:
      latestPitchNote = "F";
      latestOctaveNote = 1;
      mingusNumNote = 17;
      keyNotePiano = 9;
      keyNoteOrgan = undefined;
      midiNoteNumber = 29;
      break;
    case 46.25 <= latestPitch && latestPitch < 49.00:
      latestPitchNote = "F&#x266f/G&#x266d";
      latestOctaveNote = 1;
      mingusNumNote = 18;
      keyNotePiano = 10;
      keyNoteOrgan = undefined;
      midiNoteNumber = 30;
      break;
      case 49.00 <= latestPitch && latestPitch < 51.91:
      latestPitchNote = "G";
      latestOctaveNote = 1;
      mingusNumNote = 19;
      keyNotePiano = 11;
      keyNoteOrgan = undefined;
      midiNoteNumber = 31;
      break;
    case 51.91 <= latestPitch && latestPitch < 55.00:
      latestPitchNote = "G&#x266f/A&#x266d";
      latestOctaveNote = 1;
      mingusNumNote = 20;
      keyNotePiano = 12;
      keyNoteOrgan = undefined;
      midiNoteNumber = 32;
      break;
    case 55.00 <= latestPitch && latestPitch < 58.27:
      latestPitchNote = "A";
      latestOctaveNote = 1;
      mingusNumNote = 21;
      keyNotePiano = 13;
      keyNoteOrgan = undefined;
      midiNoteNumber = 33;
      break;
    case 58.27 <= latestPitch && latestPitch < 61.74:
      latestPitchNote = "A&#x266f/B&#x266d";
      latestOctaveNote = 1;
      mingusNumNote = 22;
      keyNotePiano = 14;
      keyNoteOrgan = undefined;
      midiNoteNumber = 34;
      break;
    case 61.74 <= latestPitch && latestPitch < 65.41:
      latestPitchNote = "B";
      latestOctaveNote = 1;
      mingusNumNote = 23;
      keyNotePiano = 15;
      keyNoteOrgan = undefined;
      midiNoteNumber = 35;
      break;

    case 65.41 <= latestPitch && latestPitch < 69.30:
      latestPitchNote = "C";
      latestOctaveNote = 2;
      mingusNumNote = 24;
      keyNotePiano = 16;
      keyNoteOrgan = 1;
      midiNoteNumber = 36;
      break;
    case 69.30 <= latestPitch && latestPitch < 73.42:
      latestPitchNote = "C&#x266f/D&#x266d";
      latestOctaveNote = 2;
      mingusNumNote = 25;
      keyNotePiano = 17;
      keyNoteOrgan = 2;
      midiNoteNumber = 37;
      break;
    case 73.42 <= latestPitch && latestPitch < 77.78:
      latestPitchNote = "D";
      latestOctaveNote = 2;
      mingusNumNote = 26;
      keyNotePiano = 18;
      keyNoteOrgan = 3;
      midiNoteNumber = 38;
      break;
    case 77.78 <= latestPitch && latestPitch < 82.41:
      latestPitchNote = "D&#x266f/E&#x266d";
      latestOctaveNote = 2;
      mingusNumNote = 27;
      keyNotePiano = 19;
      keyNoteOrgan = 4;
      midiNoteNumber = 39;
      break;
    case 82.41 <= latestPitch && latestPitch < 87.31:
      latestPitchNote = "E";
      latestOctaveNote = 2;
      mingusNumNote = 28;
      keyNotePiano = 20;
      keyNoteOrgan = 5;
      midiNoteNumber = 40;
      break;
    case 87.31 <= latestPitch && latestPitch < 92.50:
      latestPitchNote = "F";
      latestOctaveNote = 2;
      mingusNumNote = 29;
      keyNotePiano = 21;
      keyNoteOrgan = 6;
      midiNoteNumber = 41;
      break;
    case 92.50 <= latestPitch && latestPitch < 98.00:
      latestPitchNote = "F&#x266f/G&#x266d";
      latestOctaveNote = 2;
      mingusNumNote = 30;
      keyNotePiano = 22;
      keyNoteOrgan = 7;
      midiNoteNumber = 42;
      break;
      case 98.00 <= latestPitch && latestPitch < 103.83:
      latestPitchNote = "G";
      latestOctaveNote = 2;
      mingusNumNote = 31;
      keyNotePiano = 23;
      keyNoteOrgan = 8;
      midiNoteNumber = 43;
      break;
    case 103.83 <= latestPitch && latestPitch < 110.00:
      latestPitchNote = "G&#x266f/A&#x266d";
      latestOctaveNote = 2;
      mingusNumNote = 32;
      keyNotePiano = 24;
      keyNoteOrgan = 9;
      midiNoteNumber = 44;
      break;
    case 110.00 <= latestPitch && latestPitch < 116.54:
      latestPitchNote = "A";
      latestOctaveNote = 2;
      mingusNumNote = 33;
      keyNotePiano = 25;
      keyNoteOrgan = 10;
      midiNoteNumber = 45;
      break;
    case 116.54 <= latestPitch && latestPitch < 123.47:
      latestPitchNote = "A&#x266f/B&#x266d";
      latestOctaveNote = 2;
      mingusNumNote = 34;
      keyNotePiano = 26;
      keyNoteOrgan = 11;
      midiNoteNumber = 46;
      break;
    case 123.47 <= latestPitch && latestPitch < 130.81:
      latestPitchNote = "B";
      latestOctaveNote = 2;
      mingusNumNote = 35;
      keyNotePiano = 27;
      keyNoteOrgan = 12;
      midiNoteNumber = 47;
      break;

    case 130.81 <= latestPitch && latestPitch < 138.59:
      latestPitchNote = "C";
      latestOctaveNote = 3;
      mingusNumNote = 36;
      keyNotePiano = 28;
      keyNoteOrgan = 13;
      midiNoteNumber = 48;
      break;
    case 138.59 <= latestPitch && latestPitch < 146.83:
      latestPitchNote = "C&#x266f/D&#x266d";
      latestOctaveNote = 3;
      mingusNumNote = 37;
      keyNotePiano = 29;
      keyNoteOrgan = 14;
      midiNoteNumber = 49;
      break;
    case 146.83 <= latestPitch && latestPitch < 155.56:
      latestPitchNote = "D";
      latestOctaveNote = 3;
      mingusNumNote = 38;
      keyNotePiano = 30;
      keyNoteOrgan = 15;
      midiNoteNumber = 50;
      break;
    case 155.56 <= latestPitch && latestPitch < 164.81:
      latestPitchNote = "D&#x266f/E&#x266d";
      latestOctaveNote = 3;
      mingusNumNote = 39;
      keyNotePiano = 31;
      keyNoteOrgan = 16;
      midiNoteNumber = 51;
      break;
    case 164.81 <= latestPitch && latestPitch < 174.61:
      latestPitchNote = "E";
      latestOctaveNote = 3;
      mingusNumNote = 40;
      keyNotePiano = 32;
      keyNoteOrgan = 17;
      midiNoteNumber = 52;
      break;
    case 174.61 <= latestPitch && latestPitch < 185.00:
      latestPitchNote = "F";
      latestOctaveNote = 3;
      mingusNumNote = 41;
      keyNotePiano = 33;
      keyNoteOrgan = 18;
      midiNoteNumber = 53;
      break;
    case 185.00 <= latestPitch && latestPitch < 196.00:
      latestPitchNote = "F&#x266f/G&#x266d";
      latestOctaveNote = 3;
      mingusNumNote = 42;
      keyNotePiano = 34;
      keyNoteOrgan = 19;
      midiNoteNumber = 54;
      break;
    case 196.00 <= latestPitch && latestPitch < 207.65:
    latestPitchNote = "G";
    latestOctaveNote = 3;
    mingusNumNote = 43;
    keyNotePiano = 35;
    keyNoteOrgan = 20;
    midiNoteNumber = 55;
    break;
    case 207.65 <= latestPitch && latestPitch < 220.00:
      latestPitchNote = "G&#x266f/A&#x266d";
      latestOctaveNote = 3;
      mingusNumNote = 44;
      keyNotePiano = 36;
      keyNoteOrgan = 21;
      midiNoteNumber = 56;
      break;
    case 220.00 <= latestPitch && latestPitch < 233.08:
      latestPitchNote = "A";
      latestOctaveNote = 3;
      mingusNumNote = 45;
      keyNotePiano = 37;
      keyNoteOrgan = 22;
      midiNoteNumber = 57;
      break;
    case 233.08 <= latestPitch && latestPitch < 246.94:
      latestPitchNote = "A&#x266f/B&#x266d";
      latestOctaveNote = 3;
      mingusNumNote = 46;
      keyNotePiano = 38;
      keyNoteOrgan = 23;
      midiNoteNumber = 58;
      break;
    case 246.94 <= latestPitch && latestPitch < 261.63:
      latestPitchNote = "B";
      latestOctaveNote = 3;
      mingusNumNote = 47;
      keyNotePiano = 39;
      keyNoteOrgan = 24;
      midiNoteNumber = 59;
      break;

    case 261.63 <= latestPitch && latestPitch < 277.18:
      latestPitchNote = "C";
      latestOctaveNote = 4;
      mingusNumNote = 48;
      keyNotePiano = 40;
      keyNoteOrgan = 25;
      midiNoteNumber = 60;
      break;
    case 277.18 <= latestPitch && latestPitch < 293.66:
      latestPitchNote = "C&#x266f/D&#x266d";
      latestOctaveNote = 4;
      mingusNumNote = 49;
      keyNotePiano = 41;
      keyNoteOrgan = 26;
      midiNoteNumber = 61;
      break;
    case 293.66 <= latestPitch && latestPitch < 311.13:
      latestPitchNote = "D";
      latestOctaveNote = 4;
      mingusNumNote = 50;
      keyNotePiano = 42;
      keyNoteOrgan = 27;
      midiNoteNumber = 62;
      break;
    case 311.13 <= latestPitch && latestPitch < 329.63:
      latestPitchNote = "D&#x266f/E&#x266d";
      latestOctaveNote = 4;
      mingusNumNote = 51;
      keyNotePiano = 43;
      keyNoteOrgan = 28;
      midiNoteNumber = 63;
      break;
    case 329.63 <= latestPitch && latestPitch < 349.23:
      latestPitchNote = "E";
      latestOctaveNote = 4;
      mingusNumNote = 52;
      keyNotePiano = 44;
      keyNoteOrgan = 29;
      midiNoteNumber = 64;
      break;
    case 349.23 <= latestPitch && latestPitch < 369.99:
      latestPitchNote = "F";
      latestOctaveNote = 4;
      mingusNumNote = 53;
      keyNotePiano = 45;
      keyNoteOrgan = 30;
      midiNoteNumber = 65;
      break;
    case 369.99 <= latestPitch && latestPitch < 392.00:
      latestPitchNote = "F&#x266f/G&#x266d";
      latestOctaveNote = 4;
      mingusNumNote = 54;
      keyNotePiano = 46;
      keyNoteOrgan = 31;
      midiNoteNumber = 66;
      break;
      case 392.00 <= latestPitch && latestPitch < 415.30:
      latestPitchNote = "G";
      latestOctaveNote = 4;
      mingusNumNote = 55;
      keyNotePiano = 47;
      keyNoteOrgan = 32;
      midiNoteNumber = 67;
      break;
    case 415.30 <= latestPitch && latestPitch < 440.00:
      latestPitchNote = "G&#x266f/A&#x266d";
      latestOctaveNote = 4;
      mingusNumNote = 56;
      keyNotePiano = 48;
      keyNoteOrgan = 33;
      midiNoteNumber = 68;
      break;
    case 440.00 <= latestPitch && latestPitch < 466.16:
      latestPitchNote = "A";
      latestOctaveNote = 4;
      mingusNumNote = 57;
      keyNotePiano = 49;
      keyNoteOrgan = 34;
      midiNoteNumber = 69;
      break;
    case 466.16 <= latestPitch && latestPitch < 493.88:
      latestPitchNote = "A&#x266f/B&#x266d";
      latestOctaveNote = 4;
      mingusNumNote = 58;
      keyNotePiano = 50;
      keyNoteOrgan = 35;
      midiNoteNumber = 70;
      break;
    case 493.88 <= latestPitch && latestPitch < 523.25:
      latestPitchNote = "B";
      latestOctaveNote = 4;
      mingusNumNote = 59;
      keyNotePiano = 51;
      keyNoteOrgan = 36;
      midiNoteNumber = 71;
      break;

    case 523.25 <= latestPitch && latestPitch < 554.37:
      latestPitchNote = "C";
      latestOctaveNote = 5;
      mingusNumNote = 60;
      keyNotePiano = 52;
      keyNoteOrgan = 37;
      midiNoteNumber = 72;
      break;
    case 554.37 <= latestPitch && latestPitch < 587.33:
      latestPitchNote = "C&#x266f/D&#x266d";
      latestOctaveNote = 5;
      mingusNumNote = 61;
      keyNotePiano = 53;
      keyNoteOrgan = 38;
      midiNoteNumber = 73;
      break;
    case 587.33 <= latestPitch && latestPitch < 622.25:
      latestPitchNote = "D";
      latestOctaveNote = 5;
      mingusNumNote = 62;
      keyNotePiano = 54;
      keyNoteOrgan = 39;
      midiNoteNumber = 74;
      break;
    case 622.25 <= latestPitch && latestPitch < 659.25:
      latestPitchNote = "D&#x266f/E&#x266d";
      latestOctaveNote = 5;
      mingusNumNote = 63;
      keyNotePiano = 55;
      keyNoteOrgan = 40;
      midiNoteNumber = 75;
      break;
    case 659.25 <= latestPitch && latestPitch < 698.46:
      latestPitchNote = "E";
      latestOctaveNote = 5;
      mingusNumNote = 64;
      keyNotePiano = 56;
      keyNoteOrgan = 41;
      midiNoteNumber = 76;
      break;
    case 698.46 <= latestPitch && latestPitch < 739.99:
      latestPitchNote = "F";
      latestOctaveNote = 5;
      mingusNumNote = 65;
      keyNotePiano = 57;
      keyNoteOrgan = 42;
      midiNoteNumber = 77;
      break;
    case 739.99 <= latestPitch && latestPitch < 783.99:
      latestPitchNote = "F&#x266f/G&#x266d";
      latestOctaveNote = 5;
      mingusNumNote = 66;
      keyNotePiano = 58;
      keyNoteOrgan = 43;
      midiNoteNumber = 78;
      break;
      case 783.99 <= latestPitch && latestPitch < 830.61:
      latestPitchNote = "G";
      latestOctaveNote = 5;
      mingusNumNote = 67;
      keyNotePiano = 59;
      keyNoteOrgan = 44;
      midiNoteNumber = 79;
      break;
    case 830.61 <= latestPitch && latestPitch < 880.00:
      latestPitchNote = "G&#x266f/A&#x266d";
      latestOctaveNote = 5;
      mingusNumNote = 68;
      keyNotePiano = 60;
      keyNoteOrgan = 45;
      midiNoteNumber = 80;
      break;
    case 880.00 <= latestPitch && latestPitch < 932.33:
      latestPitchNote = "A";
      latestOctaveNote = 5;
      mingusNumNote = 69;
      keyNotePiano = 61;
      keyNoteOrgan = 46;
      midiNoteNumber = 81;
      break;
    case 932.33 <= latestPitch && latestPitch < 987.77:
      latestPitchNote = "A&#x266f/B&#x266d";
      latestOctaveNote = 5;
      mingusNumNote = 70;
      keyNotePiano = 62;
      keyNoteOrgan = 47;
      midiNoteNumber = 82;
      break;
    case 987.77 <= latestPitch && latestPitch < 1046.50:
      latestPitchNote = "B";
      latestOctaveNote = 5;
      mingusNumNote = 71;
      keyNotePiano = 63;
      keyNoteOrgan = 48;
      midiNoteNumber = 83;
      break;

    case 1046.50 <= latestPitch && latestPitch < 1108.73:
      latestPitchNote = "C";
      latestOctaveNote = 6;
      mingusNumNote = 72;
      keyNotePiano = 64;
      keyNoteOrgan = 49;
      midiNoteNumber = 84;
      break;
    case 1108.73 <= latestPitch && latestPitch < 1174.66:
      latestPitchNote = "C&#x266f/D&#x266d";
      latestOctaveNote = 6;
      mingusNumNote = 73;
      keyNotePiano = 65;
      keyNoteOrgan = 50;
      midiNoteNumber = 85;
      break;
    case 1174.66 <= latestPitch && latestPitch < 1244.51:
      latestPitchNote = "D";
      latestOctaveNote = 6;
      mingusNumNote = 74;
      keyNotePiano = 66;
      keyNoteOrgan = 51;
      midiNoteNumber = 86;
      break;
    case 1244.51 <= latestPitch && latestPitch < 1318.51:
      latestPitchNote = "D&#x266f/E&#x266d";
      latestOctaveNote = 6;
      mingusNumNote = 75;
      keyNotePiano = 67;
      keyNoteOrgan = 52;
      midiNoteNumber = 87;
      break;
    case 1318.51 <= latestPitch && latestPitch < 1396.91:
      latestPitchNote = "E";
      latestOctaveNote = 6;
      mingusNumNote = 76;
      keyNotePiano = 68;
      keyNoteOrgan = 53;
      midiNoteNumber = 88;
      break;
    case 1396.91 <= latestPitch && latestPitch < 1479.98:
      latestPitchNote = "F";
      latestOctaveNote = 6;
      mingusNumNote = 77;
      keyNotePiano = 69;
      keyNoteOrgan = 54;
      midiNoteNumber = 89;
      break;
    case 1479.98 <= latestPitch && latestPitch < 1567.98:
      latestPitchNote = "F&#x266f/G&#x266d";
      latestOctaveNote = 6;
      mingusNumNote = 78;
      keyNotePiano = 70;
      keyNoteOrgan = 55;
      midiNoteNumber = 90;
      break;
      case 1567.98 <= latestPitch && latestPitch < 1661.22:
      latestPitchNote = "G";
      latestOctaveNote = 6;
      mingusNumNote = 79;
      keyNotePiano = 71;
      keyNoteOrgan = 56;
      midiNoteNumber = 91;
      break;
    case 1661.22 <= latestPitch && latestPitch < 1760.00:
      latestPitchNote = "G&#x266f/A&#x266d";
      latestOctaveNote = 6;
      mingusNumNote = 80;
      keyNotePiano = 72;
      keyNoteOrgan = 57;
      midiNoteNumber = 92;
      break;
    case 1760.00 <= latestPitch && latestPitch < 1864.66:
      latestPitchNote = "A";
      latestOctaveNote = 6;
      mingusNumNote = 81;
      keyNotePiano = 73;
      keyNoteOrgan = 58;
      midiNoteNumber = 93;
      break;
    case 1864.66 <= latestPitch && latestPitch < 1975.53:
      latestPitchNote = "A&#x266f/B&#x266d";
      latestOctaveNote = 6;
      mingusNumNote = 82;
      keyNotePiano = 74;
      keyNoteOrgan = 59;
      midiNoteNumber = 94;
      break;
    case 1975.53 <= latestPitch && latestPitch < 2093.00:
      latestPitchNote = "B";
      latestOctaveNote = 6;
      mingusNumNote = 83;
      keyNotePiano = 75;
      keyNoteOrgan = 60;
      midiNoteNumber = 95;
      break;

    case 2093.00 <= latestPitch && latestPitch < 2217.46:
      latestPitchNote = "C";
      latestOctaveNote = 7;
      mingusNumNote = 84;
      keyNotePiano = 76;
      keyNoteOrgan = 61;
      midiNoteNumber = 96;
      break;
    case 2217.46 <= latestPitch && latestPitch < 2349.32:
      latestPitchNote = "C&#x266f/D&#x266d";
      latestOctaveNote = 7;
      mingusNumNote = 85;
      keyNotePiano = 77;
      keyNoteOrgan = undefined;
      midiNoteNumber = 97;
      break;
    case 2349.32 <= latestPitch && latestPitch < 2489.02:
      latestPitchNote = "D";
      latestOctaveNote = 7;
      mingusNumNote = 86;
      keyNotePiano = 78;
      keyNoteOrgan = undefined;
      midiNoteNumber = 98;
      break;
    case 2489.02 <= latestPitch && latestPitch < 2637.02:
      latestPitchNote = "D&#x266f/E&#x266d";
      latestOctaveNote = 7;
      mingusNumNote = 87;
      keyNotePiano = 79;
      keyNoteOrgan = undefined;
      midiNoteNumber = 99;
      break;
    case 2637.02 <= latestPitch && latestPitch < 2793.83:
      latestPitchNote = "E";
      latestOctaveNote = 7;
      mingusNumNote = 88;
      keyNotePiano = 80;
      keyNoteOrgan = undefined;
      midiNoteNumber = 100;
      break;
    case 2793.83 <= latestPitch && latestPitch < 2959.96:
      latestPitchNote = "F";
      latestOctaveNote = 7;
      mingusNumNote = 89;
      keyNotePiano = 81;
      keyNoteOrgan = undefined;
      midiNoteNumber = 101;
      break;
    case 2959.96 <= latestPitch && latestPitch < 3135.96:
      latestPitchNote = "F&#x266f/G&#x266d";
      latestOctaveNote = 7;
      mingusNumNote = 90;
      keyNotePiano = 82;
      keyNoteOrgan = undefined;
      midiNoteNumber = 102;
      break;
      case 3135.96 <= latestPitch && latestPitch < 3322.44:
      latestPitchNote = "G";
      latestOctaveNote = 7;
      mingusNumNote = 91;
      keyNotePiano = 83;
      keyNoteOrgan = undefined;
      midiNoteNumber = 103;
      break;
    case 3322.44 <= latestPitch && latestPitch < 3520.00:
      latestPitchNote = "G&#x266f/A&#x266d";
      latestOctaveNote = 7;
      mingusNumNote = 92;
      keyNotePiano = 84;
      keyNoteOrgan = undefined;
      midiNoteNumber = 104;
      break;
    case 3520.00 <= latestPitch && latestPitch < 3729.31:
      latestPitchNote = "A";
      latestOctaveNote = 7;
      mingusNumNote = 93;
      keyNotePiano = 85;
      keyNoteOrgan = undefined;
      midiNoteNumber = 105;
      break;
    case 3729.31 <= latestPitch && latestPitch < 3951.07:
      latestPitchNote = "A&#x266f/B&#x266d";
      latestOctaveNote = 7;
      mingusNumNote = 94;
      keyNotePiano = 86;
      keyNoteOrgan = undefined;
      midiNoteNumber = 106;
      break;
    case 3951.07 <= latestPitch && latestPitch < 4186.01:
      latestPitchNote = "B";
      latestOctaveNote = 7;
      mingusNumNote = 95;
      keyNotePiano = 87;
      keyNoteOrgan = undefined;
      midiNoteNumber = 107;
      break;

    case 4186.01 <= latestPitch && latestPitch < 4434.92:
      latestPitchNote = "C";
      latestOctaveNote = 8;
      mingusNumNote = 96;
      keyNotePiano = 88;
      keyNoteOrgan = undefined;
      midiNoteNumber = 108;
      break;
    case 4434.92 <= latestPitch && latestPitch < 4698.63:
      latestPitchNote = "C&#x266f/D&#x266d";
      latestOctaveNote = 8;
      mingusNumNote = 97;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 109;
      break;
    case 4698.63 <= latestPitch && latestPitch < 4978.03:
      latestPitchNote = "D";
      latestOctaveNote = 8;
      mingusNumNote = 98;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 110;
      break;
    case 4978.03 <= latestPitch && latestPitch < 5274.04:
      latestPitchNote = "D&#x266f/E&#x266d";
      latestOctaveNote = 8;
      mingusNumNote = 99;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 111;
      break;
    case 5274.04 <= latestPitch && latestPitch < 5587.65:
      latestPitchNote = "E";
      latestOctaveNote = 8;
      mingusNumNote = 100;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 112;
      break;
    case 5587.65 <= latestPitch && latestPitch < 5919.91:
      latestPitchNote = "F";
      latestOctaveNote = 8;
      mingusNumNote = 101;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 113;
      break;
    case 5919.91 <= latestPitch && latestPitch < 6271.93:
      latestPitchNote = "F&#x266f/G&#x266d";
      latestOctaveNote = 8;
      mingusNumNote = 102;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 114;
      break;
    case 6271.93 <= latestPitch && latestPitch < 6644.88:
      latestPitchNote = "G";
      latestOctaveNote = 8;
      mingusNumNote = 103;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 115;
      break;
    case 6644.88 <= latestPitch && latestPitch < 7040.00:
      latestPitchNote = "G&#x266f/A&#x266d";
      latestOctaveNote = 8;
      mingusNumNote = 104;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 116;
      break;
    case 7040.00 <= latestPitch && latestPitch < 7458.62:
      latestPitchNote = "A";
      latestOctaveNote = 8;
      mingusNumNote = 105;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 117;
      break;
    case 7458.62 <= latestPitch && latestPitch < 7902.13:
      latestPitchNote = "A&#x266f/B&#x266d";
      latestOctaveNote = 8;
      mingusNumNote = 106;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 118;
      break;
    case 7902.13 <= latestPitch && latestPitch < 8372.02:
      latestPitchNote = "B";
      latestOctaveNote = 8;
      mingusNumNote = 107;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 119;
      break;
    case 8372.02 <= latestPitch && latestPitch < 8869.04:
      latestPitchNote = "C";
      latestOctaveNote = 8;
      mingusNumNote = 108;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 120;
      break; 
      
    case 8869.04 <= latestPitch && latestPitch < 9397.27:
      latestPitchNote =  "C&#x266f/D&#x266d";
      latestOctaveNote = 9;
      mingusNumNote = 109;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 121;
      break;
    case 9397.27 <= latestPitch && latestPitch < 9956.06:
      latestPitchNote = "D";
      latestOctaveNote = 9;
      mingusNumNote = 110;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 122;
      break;
    case 9956.06 <= latestPitch && latestPitch < 10548.08:
      latestPitchNote = "D&#x266f/E&#x266d";
      latestOctaveNote = 9;
      mingusNumNote = 111;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 123;
      break;
    case 10548.08 <= latestPitch && latestPitch < 11175.30:
      latestPitchNote = "E";
      latestOctaveNote = 9;
      mingusNumNote = 112;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 124;
      break;
    case 11175.30 <= latestPitch && latestPitch < 11839.82:
      latestPitchNote = "F";
      latestOctaveNote = 9;
      mingusNumNote = 113;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 125;
      break;
    case 11839.82 <= latestPitch && latestPitch < 12543.85:
      latestPitchNote = "F&#x266f/G&#x266d";
      latestOctaveNote = 9;
      mingusNumNote = 114;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 126;
      break;
    case 12543.85 <= latestPitch && latestPitch < 13289.75:
      latestPitchNote = "G";
      latestOctaveNote = 9;
      mingusNumNote = 115;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = 127;
      break;
      case 	13289.75 <= latestPitch && latestPitch < 3322.44:
      latestPitchNote = "Too High";
      latestOctaveNote = undefined;
      mingusNumNote = undefined;
      keyNotePiano = undefined;
      keyNoteOrgan = undefined;
      midiNoteNumber = undefined;
      break;
    default:
      latestPitchNote = "";
      latestOctaveNote = "";
  }
  // console.log("MIDI::::::: ", (midiNoteNumber));
  let halfStepToShrinkDOM = latestPitchNote.match(/[#]/g);
  if(halfStepToShrinkDOM){
    pitchLetterDisplayDOM.classList.add("shrinkNoteLetter");
  } else {
    pitchLetterDisplayDOM.classList.remove("shrinkNoteLetter");
  }
  if(latestPitchNote !== "" && latestOctaveNote !== ""){
    pitchLetterDisplayDOM.innerHTML = latestPitchNote;
    pitchOctaveDisplayDOM.innerHTML = latestOctaveNote;
  }
  if (latestPitchNote.indexOf('&#x266f') !== -1){
    latestPitchNote = latestPitchNote[0] + '#';
  }

  
  if(latestPitchNote && latestOctaveNote){
    
  
    let timeDiff = window.__emscripten_date_now() - game.room.id.previousTick;
    let msConvertedForBpm = 250;
    let convertedMsAdjuster = msConvertedForBpm * (120/game.room.id.bpm);
    // console.log("timeediff tick ", timeDiff);
    // console.log("adjuster ", convertedMsAdjuster);

    // if(game.room.id.delta === 0 || undefined){
      //console.log("begin Py analysis tick -- delta is ", game.room.id.delta);
      // beginPyAnalysisNote(game.user, latestPitchNote, latestOctaveNote, mingusNumNote, keyNotePiano, keyNoteOrgan, midiNoteNumber, bpm);
      // beginPyAnalysisNote(game.user, latestPitchNote, latestOctaveNote, mingusNumNote, keyNotePiano, keyNoteOrgan, midiNoteNumber, bpm);
      game.user.id.latestPitch.noteLetter = latestPitchNote;
      game.user.id.latestOctave.octave = latestOctaveNote;
      game.user.id.latestMingusNumNote = mingusNumNote;
      game.user.id.latestKeyNotePiano = keyNotePiano;
      game.user.id.latestKeyNoteOrgan = keyNoteOrgan;
      game.user.id.latestMidiNoteNumber = midiNoteNumber;
        

    // }
    // THIS MOVES THE BALL!!! tktktktktktk
    // game.scene.meshes[0].position.z = -latestOctaveNote;
    if(game && game.scene && game.scene.meshes.length){
      // console.log("H E I G H T::::::: ", (game.scene.meshes[1]._height / 2));

      // // console.log("MIDI NOTE::::::: ", (midiNoteNumber));
      // console.log("desired octave range: ", game.room.id.targetOctaveRange * 12);
      // console.log("target key: ", game.room.id.targetKey);

      game.room.id.socket.addEventListener('message', function (event) {
        game.room.id.socket.onmessage = (event) => {
          console.log("eventy!!! ", event.data);
        }
      });
      // THIS IS WHERE WE CAN CONVERT SIZING & Y HEIGHT FOR PLAYER ON SCREEN (midi note # here will be # of moves up from lowest square)
      // function below positions the player... tktktktktktk
      game.scene.meshes[0].position.z = (game.scene.meshes[1]._height / 2) - ((midiNoteNumber/127)*game.scene.meshes[1]._height);
    }
  }

}

export function audioChanged(newAudio){
    setAudio(newAudio);
    console.log("NEW AUDIO: ", audio());
    console.log("NEW AUDIO TRACKS: ", audio().getTracks());
};

export function runningChanged(newRunning){
    console.log("Running State: ", running());
    setRunning(newRunning);
    console.log("new Running State: ", running());
}

function useState(initialValue) {
    var _val = initialValue // _val is a local variable created by useState
    function state() {
      // state is an inner function, a closure
      return _val // state() uses _val, declared by parent funciton
    }
    function setState(newVal) {
      // same
      _val = newVal // setting _val without exposing _val
    }
    return [state, setState] // exposing functions for external use
  }
  var [audio, setAudio] = useState(undefined); // using array destructuring
  var [running, setRunning] = useState(false);
  var [latestPitch, setLatestPitch] = useState(undefined);

  var [scale, setScale] = useState('Major');
  var [targetKey, setTargetKey] = useState('C');
  var [targetOctave, setTargetOctave] = useState(4);
  var [targetNote, setTargetNote] = useState('');
  var [futureNotes, setFutureNotes] = useState([]);
  var [scalePos, setScalePos] = useState(0);
  var [octaveRange, setOctaveRange] = useState(1);

let getUserAudioBtn = document.getElementById("getUserAudio");
let setRunningBtn = document.getElementById("setUpAudio");
let audioDeviceDrpdwn = document.getElementById("selectedAudioDevice");
let gameModeDrpdwn = document.getElementById("selectedGameMode");
let targetScaleDrpdwn = document.getElementById("targetScale");
let devicesBoxDiv = document.getElementById("devicesBox");
let octaveSetupDiv = document.getElementById("octaveSetupDiv");
let octaveSetupSaveBtn = document.getElementById("setUpOctave");
let targetKeyDrpdwn = document.getElementById("targetKey");
let targetOctaveDrpdwn = document.getElementById("targetOctave");
let targetOctaveRangeDrpdwn = document.getElementById("rangeOctave");
let bpmFormInput = document.getElementById("bpmFormInput");
let saveModeBtn = document.getElementById("setAudioParams");
let modeSetupDiv = document.getElementById("modeSetup");

getUserAudioBtn.addEventListener("click",function(){
  getWebAudioMediaStream();
  getUserAudioBtn.style.display = "none";
  modeSetupDiv.style.display = "flex";
});

saveModeBtn.addEventListener("click", function(){
  modeSetupDiv.style.display = "none";
  octaveSetupDiv.style.display = "flex";
  game.user.id.audioDevice = document.getElementById("selectedAudioDevice").value;
})

audioDeviceDrpdwn.addEventListener("change", function handleChange(event) {
  console.log(event.target.value);
  audioDeviceDrpdwn.value = event.target.value;
  game.user.id.audioDevice = gameModeDrpdwn.value;
})

targetKeyDrpdwn.addEventListener("change", function handleChange(event) {
  console.log(event.target.value);
  targetKeyDrpdwn.value = event.target.value;
  game.room.id.targetKey = targetKeyDrpdwn.value;
})

targetOctaveDrpdwn.addEventListener("change", function handleChange(event) {
  console.log(event.target.value);
  targetOctaveDrpdwn.value = event.target.value;
  game.room.id.targetOctave = targetOctaveDrpdwn.value;
})

targetOctaveRangeDrpdwn.addEventListener("change", function handleChange(event) {
  console.log(event.target.value);
  targetOctaveRangeDrpdwn.value = event.target.value;
  game.room.id.targetOctaveRange = targetOctaveRangeDrpdwn.value;
})

gameModeDrpdwn.addEventListener("change", function handleChange(event) {
  console.log(event.target.value);
  gameModeDrpdwn.value = event.target.value;
  game.gameMode = gameModeDrpdwn.value;
})


octaveSetupSaveBtn.addEventListener("click", function(){
  octaveSetupDiv.style.display = "none";
  document.getElementById("devicesBox").style.background = "transparent"; 
  let selectedBPM = parseInt(document.getElementById("bpmInput").value);
  game.room.id.bpmInverted = (120/selectedBPM) * 120;
  
  document.getElementById("bpmDisplay").innerText = game.room.id.bpmInverted;
  
  console.log("custom should be hidden!!");

  setRunningBtn.style.display = "flex";
});

targetScaleDrpdwn.addEventListener("change", function handleChange(event) {
  console.log(event.target.value);
  targetScaleDrpdwn.value = event.target.value;
  game.room.id.targetScale = targetScaleDrpdwn.value;
})

setRunningBtn.addEventListener("click", async function(){
    //   setupAudio();
    document.getElementById("devicesBox").style.backdropFilter = "none"; 

    // TO PYTHON HERE W AUDIO SELECTIONS
    //need to get this scale value from setup!
    game.room.id.triggerExpectedAudio();
    gameStarted();

    // Start rendering pitch data
    setAudio(await setupAudio(setLatestPitch()));
    setRunning(true);
    document.getElementById("pitchBox").display = "flex";

    // INITIAL BOX ROW (TODO: MOVE THIS OUT OF HERE // time it better)
    if(game){
      try{
        // game.createBoxRow(true);
        game.room.id.triggerExpectedAudio();
      } catch(e){

      }
    }
    game.room.id.startGameTick = window.__emscripten_date_now();

    setRunningBtn.style.display = "none";
    devicesBoxDiv.style.display = "none";
});

game.room.id.triggerExpectedAudio = () => {
  let audioSelections = {
    "targetKey" : game.room.id.targetKey || "E",
    "targetOctave": game.room.id.targetOctave,
    "targetOctaveRange":game.room.id.targetOctaveRange,
    "targetScale": game.room.id.targetScale,
    "scalePosition": game.room.id.scalePosition    
  }
  console.log("what are audio selections? ", JSON.stringify(audioSelections))
  if(JSON.stringify(audioSelections) !== [] && JSON.stringify(audioSelections) !== undefined){
    try{
      fetch('http://localhost:8088/audio_selections', {
        method: 'POST',
        body: JSON.stringify(audioSelections),
        headers: {'Content-type': 'application/json; charset=UTF-8'
    }
      })
      // .then(response => response.json())
      .then(response => console.log("!!!!!#!@#@#$@#$ ", response.body))
      // .then(json => console.log(json))
      .then(audioSelections = {});
    } catch (e){
      console.log("error from python interop: ", e);
    }
  }
}