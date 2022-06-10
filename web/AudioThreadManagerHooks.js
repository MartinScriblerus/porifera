import { getWebAudioMediaStream, setupAudio } from "./setupAudio.js";
import { beginPyAnalysisNote } from "./beginPyAnalysisNote.js"
import "./index.js";
// ========================================
// HOOKS IMPLEMENTATION
// ========================================

export function pitchChanged(user, newPitch){
    let newPitchTwoDecimals = parseFloat(newPitch).toFixed(2);
    setLatestPitch(newPitchTwoDecimals);
    // * THE PITCH SHOULD NOW BE CHANGED! *
    // DISPLAY IT! =>
    let pitchDisplayDOM = document.getElementById("pitchDisplay");
    
    if(pitchDisplayDOM){
        let oldNums = pitchDisplayDOM.childNodes;

        for(let i = 0; i < oldNums.length; i++){
          oldNums[i].remove();
          delete oldNums[i];
        }
        pitchDisplayDOM.append(latestPitch());
        pitchConversion(latestPitch());
    }
   
};

export function pitchConversion(latestPitch){
  let latestPitchNote;
  let latestOctaveNote;
  let pitchLetterDisplayDOM = document.getElementById("pitchDisplayLetter");
  let pitchOctaveDisplayDOM = document.getElementById("pitchDisplayOctave");
  switch (true) {
    case 0.00 <= latestPitch && latestPitch < 16.35:
      latestPitchNote = "Too low";
      latestOctaveNote = 0;
      break;
    case 16.35 <= latestPitch && latestPitch < 17.32:
      latestPitchNote = "C";
      latestOctaveNote = 0;
      break;
    case 17.32 <= latestPitch && latestPitch < 18.35:
      latestPitchNote = "C&#x266f/D&#x266d";
      latestOctaveNote = 0;
      break;
    case 18.35 <= latestPitch && latestPitch < 19.45:
      latestPitchNote = "D";
      latestOctaveNote = 0;
      break;
    case 19.45 <= latestPitch && latestPitch < 20.60:
      latestPitchNote = "D&#x266f/E&#x266d";
      latestOctaveNote = 0;
      break;
    case 20.60 <= latestPitch && latestPitch < 21.83:
      latestPitchNote = "E";
      latestOctaveNote = 0;
      break;
    case 21.83 <= latestPitch && latestPitch < 23.12:
      latestPitchNote = "F";
      latestOctaveNote = 0;
      break;
    case 23.12 <= latestPitch && latestPitch < 24.50:
      latestPitchNote = "F&#x266f/G&#x266d";
      latestOctaveNote = 0;
      break;
      case 24.50 <= latestPitch && latestPitch < 25.96:
      latestPitchNote = "G";
      latestOctaveNote = 0;
      break;
    case 25.96 <= latestPitch && latestPitch < 27.50:
      latestPitchNote = "G&#x266f/A&#x266d";
      latestOctaveNote = 0;
      break;
    case 27.50 <= latestPitch && latestPitch < 29.14:
      latestPitchNote = "A";
      latestOctaveNote = 0;
      break;
    case 29.14 <= latestPitch && latestPitch < 30.87:
      latestPitchNote = "A&#x266f/B&#x266d";
      latestOctaveNote = 0;
      break;
    case 30.87 <= latestPitch && latestPitch < 32.70:
      latestPitchNote = "B";
      latestOctaveNote = 0;
      break;

    case 32.70 <= latestPitch && latestPitch < 34.65:
      latestPitchNote = "C";
      latestOctaveNote = 1;
      break;
    case 34.65 <= latestPitch && latestPitch < 36.71:
      latestPitchNote = "C&#x266f/D&#x266d";
      latestOctaveNote = 1;
      break;
    case 36.71 <= latestPitch && latestPitch < 38.89:
      latestPitchNote = "D";
      latestOctaveNote = 1;
      break;
    case 38.89 <= latestPitch && latestPitch < 41.20:
      latestPitchNote = "D&#x266f/E&#x266d";
      latestOctaveNote = 1;
      break;
    case 41.20 <= latestPitch && latestPitch < 43.65:
      latestPitchNote = "E";
      latestOctaveNote = 1;
      break;
    case 43.65 <= latestPitch && latestPitch < 46.25:
      latestPitchNote = "F";
      latestOctaveNote = 1;
      break;
    case 46.25 <= latestPitch && latestPitch < 49.00:
      latestPitchNote = "F&#x266f/G&#x266d";
      latestOctaveNote = 1;
      break;
      case 49.00 <= latestPitch && latestPitch < 51.91:
      latestPitchNote = "G";
      latestOctaveNote = 1;
      break;
    case 51.91 <= latestPitch && latestPitch < 55.00:
      latestPitchNote = "G&#x266f/A&#x266d";
      latestOctaveNote = 1;
      break;
    case 55.00 <= latestPitch && latestPitch < 58.27:
      latestPitchNote = "A";
      latestOctaveNote = 1;
      break;
    case 58.27 <= latestPitch && latestPitch < 61.74:
      latestPitchNote = "A&#x266f/B&#x266d";
      latestOctaveNote = 1;
      break;
    case 61.74 <= latestPitch && latestPitch < 65.41:
      latestPitchNote = "B";
      latestOctaveNote = 1;
      break;

    case 65.41 <= latestPitch && latestPitch < 69.30:
      latestPitchNote = "C";
      latestOctaveNote = 2;
      break;
    case 69.30 <= latestPitch && latestPitch < 73.42:
      latestPitchNote = "C&#x266f/D&#x266d";
      latestOctaveNote = 2;
      break;
    case 73.42 <= latestPitch && latestPitch < 77.78:
      latestPitchNote = "D";
      latestOctaveNote = 2;
      break;
    case 77.78 <= latestPitch && latestPitch < 82.41:
      latestPitchNote = "D&#x266f/E&#x266d";
      latestOctaveNote = 2;
      break;
    case 82.41 <= latestPitch && latestPitch < 87.31:
      latestPitchNote = "E";
      latestOctaveNote = 2;
      break;
    case 87.31 <= latestPitch && latestPitch < 92.50:
      latestPitchNote = "F";
      latestOctaveNote = 2;
      break;
    case 92.50 <= latestPitch && latestPitch < 98.00:
      latestPitchNote = "F&#x266f/G&#x266d";
      latestOctaveNote = 2;
      break;
      case 98.00 <= latestPitch && latestPitch < 103.83:
      latestPitchNote = "G";
      latestOctaveNote = 2;
      break;
    case 103.83 <= latestPitch && latestPitch < 110.00:
      latestPitchNote = "G&#x266f/A&#x266d";
      latestOctaveNote = 2;
      break;
    case 110.00 <= latestPitch && latestPitch < 116.54:
      latestPitchNote = "A";
      latestOctaveNote = 2;
      break;
    case 116.54 <= latestPitch && latestPitch < 123.47:
      latestPitchNote = "A&#x266f/B&#x266d";
      latestOctaveNote = 2;
      break;
    case 123.47 <= latestPitch && latestPitch < 130.81:
      latestPitchNote = "B";
      latestOctaveNote = 2;
      break;

    case 130.81 <= latestPitch && latestPitch < 138.59:
      latestPitchNote = "C";
      latestOctaveNote = 3;
      break;
    case 138.59 <= latestPitch && latestPitch < 146.83:
      latestPitchNote = "C&#x266f/D&#x266d";
      latestOctaveNote = 3;
      break;
    case 146.83 <= latestPitch && latestPitch < 155.56:
      latestPitchNote = "D";
      latestOctaveNote = 3;
      break;
    case 155.56 <= latestPitch && latestPitch < 164.81:
      latestPitchNote = "D&#x266f/E&#x266d";
      latestOctaveNote = 3;
      break;
    case 164.81 <= latestPitch && latestPitch < 174.61:
      latestPitchNote = "E";
      latestOctaveNote = 3;
      break;
    case 174.61 <= latestPitch && latestPitch < 185.00:
      latestPitchNote = "F";
      latestOctaveNote = 3;
      break;
    case 185.00 <= latestPitch && latestPitch < 196.00:
      latestPitchNote = "F&#x266f/G&#x266d";
      latestOctaveNote = 3;
      break;
      case 196.00 <= latestPitch && latestPitch < 207.65:
      latestPitchNote = "G";
      latestOctaveNote = 3;
      break;
    case 207.65 <= latestPitch && latestPitch < 220.00:
      latestPitchNote = "G&#x266f/A&#x266d";
      latestOctaveNote = 3;
      break;
    case 220.00 <= latestPitch && latestPitch < 233.08:
      latestPitchNote = "A";
      latestOctaveNote = 3;
      break;
    case 233.08 <= latestPitch && latestPitch < 246.94:
      latestPitchNote = "A&#x266f/B&#x266d";
      latestOctaveNote = 3;
      break;
    case 246.94 <= latestPitch && latestPitch < 261.63:
      latestPitchNote = "B";
      latestOctaveNote = 3;
      break;

    case 261.63 <= latestPitch && latestPitch < 277.18:
      latestPitchNote = "C";
      latestOctaveNote = 4;
      break;
    case 277.18 <= latestPitch && latestPitch < 293.66:
      latestPitchNote = "C&#x266f/D&#x266d";
      latestOctaveNote = 4;
      break;
    case 293.66 <= latestPitch && latestPitch < 311.13:
      latestPitchNote = "D";
      latestOctaveNote = 4;
      break;
    case 311.13 <= latestPitch && latestPitch < 329.63:
      latestPitchNote = "D&#x266f/E&#x266d";
      latestOctaveNote = 4;
      break;
    case 329.63 <= latestPitch && latestPitch < 349.23:
      latestPitchNote = "E";
      latestOctaveNote = 4;
      break;
    case 349.23 <= latestPitch && latestPitch < 369.99:
      latestPitchNote = "F";
      latestOctaveNote = 4;
      break;
    case 369.99 <= latestPitch && latestPitch < 392.00:
      latestPitchNote = "F&#x266f/G&#x266d";
      latestOctaveNote = 4;
      break;
      case 392.00 <= latestPitch && latestPitch < 415.30:
      latestPitchNote = "G";
      latestOctaveNote = 4;
      break;
    case 415.30 <= latestPitch && latestPitch < 440.00:
      latestPitchNote = "G&#x266f/A&#x266d";
      latestOctaveNote = 4;
      break;
    case 440.00 <= latestPitch && latestPitch < 466.16:
      latestPitchNote = "A";
      latestOctaveNote = 4;
      break;
    case 466.16 <= latestPitch && latestPitch < 493.88:
      latestPitchNote = "A&#x266f/B&#x266d";
      latestOctaveNote = 4;
      break;
    case 493.88 <= latestPitch && latestPitch < 523.25:
      latestPitchNote = "B";
      latestOctaveNote = 4;
      break;

    case 523.25 <= latestPitch && latestPitch < 554.37:
      latestPitchNote = "C";
      latestOctaveNote = 5;
      break;
    case 554.37 <= latestPitch && latestPitch < 587.33:
      latestPitchNote = "C&#x266f/D&#x266d";
      latestOctaveNote = 5;
      break;
    case 587.33 <= latestPitch && latestPitch < 622.25:
      latestPitchNote = "D";
      latestOctaveNote = 5;
      break;
    case 622.25 <= latestPitch && latestPitch < 659.25:
      latestPitchNote = "D&#x266f/E&#x266d";
      latestOctaveNote = 5;
      break;
    case 659.25 <= latestPitch && latestPitch < 698.46:
      latestPitchNote = "E";
      latestOctaveNote = 5;
      break;
    case 698.46 <= latestPitch && latestPitch < 739.99:
      latestPitchNote = "F";
      latestOctaveNote = 5;
      break;
    case 739.99 <= latestPitch && latestPitch < 783.99:
      latestPitchNote = "F&#x266f/G&#x266d";
      latestOctaveNote = 5;
      break;
      case 783.99 <= latestPitch && latestPitch < 830.61:
      latestPitchNote = "G";
      latestOctaveNote = 5;
      break;
    case 830.61 <= latestPitch && latestPitch < 880.00:
      latestPitchNote = "G&#x266f/A&#x266d";
      latestOctaveNote = 5;
      break;
    case 880.00 <= latestPitch && latestPitch < 932.33:
      latestPitchNote = "A";
      latestOctaveNote = 5;
      break;
    case 932.33 <= latestPitch && latestPitch < 987.77:
      latestPitchNote = "A&#x266f/B&#x266d";
      latestOctaveNote = 5;
      break;
    case 987.77 <= latestPitch && latestPitch < 1046.50:
      latestPitchNote = "B";
      latestOctaveNote = 5;
      break;

    case 1046.50 <= latestPitch && latestPitch < 1108.73:
      latestPitchNote = "C";
      latestOctaveNote = 6;
      break;
    case 1108.73 <= latestPitch && latestPitch < 1174.66:
      latestPitchNote = "C&#x266f/D&#x266d";
      latestOctaveNote = 6;
      break;
    case 1174.66 <= latestPitch && latestPitch < 1244.51:
      latestPitchNote = "D";
      latestOctaveNote = 6;
      break;
    case 1244.51 <= latestPitch && latestPitch < 1318.51:
      latestPitchNote = "D&#x266f/E&#x266d";
      latestOctaveNote = 6;
      break;
    case 1318.51 <= latestPitch && latestPitch < 1396.91:
      latestPitchNote = "E";
      latestOctaveNote = 6;
      break;
    case 1396.91 <= latestPitch && latestPitch < 1479.98:
      latestPitchNote = "F";
      latestOctaveNote = 6;
      break;
    case 1479.98 <= latestPitch && latestPitch < 1567.98:
      latestPitchNote = "F&#x266f/G&#x266d";
      latestOctaveNote = 6;
      break;
      case 1567.98 <= latestPitch && latestPitch < 1661.22:
      latestPitchNote = "G";
      latestOctaveNote = 6;
      break;
    case 1661.22 <= latestPitch && latestPitch < 1760.00:
      latestPitchNote = "G&#x266f/A&#x266d";
      latestOctaveNote = 6;
      break;
    case 1760.00 <= latestPitch && latestPitch < 1864.66:
      latestPitchNote = "A";
      latestOctaveNote = 6;
      break;
    case 1864.66 <= latestPitch && latestPitch < 1975.53:
      latestPitchNote = "A&#x266f/B&#x266d";
      latestOctaveNote = 6;
      break;
    case 1975.53 <= latestPitch && latestPitch < 2093.00:
      latestPitchNote = "B";
      latestOctaveNote = 6;
      break;

    case 2093.00 <= latestPitch && latestPitch < 2217.46:
      latestPitchNote = "C";
      latestOctaveNote = 7;
      break;
    case 2217.46 <= latestPitch && latestPitch < 2349.32:
      latestPitchNote = "C&#x266f/D&#x266d";
      latestOctaveNote = 7;
      break;
    case 2349.32 <= latestPitch && latestPitch < 2489.02:
      latestPitchNote = "D";
      latestOctaveNote = 7;
      break;
    case 2489.02 <= latestPitch && latestPitch < 2637.02:
      latestPitchNote = "D&#x266f/E&#x266d";
      latestOctaveNote = 7;
      break;
    case 2637.02 <= latestPitch && latestPitch < 2793.83:
      latestPitchNote = "E";
      latestOctaveNote = 7;
      break;
    case 2793.83 <= latestPitch && latestPitch < 2959.96:
      latestPitchNote = "F";
      latestOctaveNote = 7;
      break;
    case 2959.96 <= latestPitch && latestPitch < 3135.96:
      latestPitchNote = "F&#x266f/G&#x266d";
      latestOctaveNote = 7;
      break;
      case 3135.96 <= latestPitch && latestPitch < 3322.44:
      latestPitchNote = "G";
      latestOctaveNote = 7;
      break;
    case 3322.44 <= latestPitch && latestPitch < 3520.00:
      latestPitchNote = "G&#x266f/A&#x266d";
      latestOctaveNote = 7;
      break;
    case 3520.00 <= latestPitch && latestPitch < 3729.31:
      latestPitchNote = "A";
      latestOctaveNote = 7;
      break;
    case 3729.31 <= latestPitch && latestPitch < 3951.07:
      latestPitchNote = "A&#x266f/B&#x266d";
      latestOctaveNote = 7;
      break;
    case 3951.07 <= latestPitch && latestPitch < 4186.01:
      latestPitchNote = "B";
      latestOctaveNote = 7;
      break;

    case 4186.01 <= latestPitch && latestPitch < 4434.92:
      latestPitchNote = "C";
      latestOctaveNote = 8;
      break;
    case 4434.92 <= latestPitch && latestPitch < 4698.63:
      latestPitchNote = "C&#x266f/D&#x266d";
      latestOctaveNote = 8;
      break;
    case 4698.63 <= latestPitch && latestPitch < 4978.03:
      latestPitchNote = "D";
      latestOctaveNote = 8;
      break;
    case 4978.03 <= latestPitch && latestPitch < 5274.04:
      latestPitchNote = "D&#x266f/E&#x266d";
      latestOctaveNote = 8;
      break;
    case 5274.04 <= latestPitch && latestPitch < 5587.65:
      latestPitchNote = "E";
      latestOctaveNote = 8;
      break;
    case 5587.65 <= latestPitch && latestPitch < 5919.91:
      latestPitchNote = "F";
      latestOctaveNote = 8;
      break;
    case 5919.91 <= latestPitch && latestPitch < 6271.93:
      latestPitchNote = "F&#x266f/G&#x266d";
      latestOctaveNote = 8;
      break;
    case 6271.93 <= latestPitch && latestPitch < 6644.88:
      latestPitchNote = "G";
      latestOctaveNote = 8;
      break;
    case 6644.88 <= latestPitch && latestPitch < 7040.00:
      latestPitchNote = "G&#x266f/A&#x266d";
      latestOctaveNote = 8;
      break;
    case 7040.00 <= latestPitch && latestPitch < 7458.62:
      latestPitchNote = "A";
      latestOctaveNote = 8;
      break;
    case 7458.62 <= latestPitch && latestPitch < 7902.13:
      latestPitchNote = "A&#x266f/B&#x266d";
      latestOctaveNote = 8;
      break;
    case 7902.13 <= latestPitch && latestPitch < 8000.00:
      latestPitchNote = "B";
      latestOctaveNote = 8;
      break;
    case 8000.00 <= latestPitch && latestPitch < 20000.00:
      latestPitchNote = "Too high!";
      latestOctaveNote = 8;
      break;    
    default:
      console.log("!!!: ", latestPitch);
      latestPitchNote = "other";
  }
  console.log("PITCH AND OCTAGVE REVRIHEFEH");
  pitchLetterDisplayDOM.innerHTML = latestPitchNote;
  pitchOctaveDisplayDOM.innerHTML = latestOctaveNote;
  if(latestPitchNote && latestOctaveNote){
    console.log("TODO=> make html for bpm");
    let bpm = 120;
    beginPyAnalysisNote(game.user, latestPitchNote, latestOctaveNote, bpm);
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

  console.log("EEEEEER YEAH -- audio", audio()); // logs 1 - new initialValue, despite exact same call
  console.log("EEEEEER YEAH -- running", running());
  console.log("EEEEEER@@@@@ YEAH -- pitch", latestPitch());

let x = document.getElementById("getUserAudio");
let y = document.getElementById("setUpAudio");
console.log(x);

x.addEventListener("click",function(){
  getWebAudioMediaStream();
});
y.addEventListener("click", async function(){
    //   setupAudio();
    setAudio(await setupAudio(setLatestPitch()));
    setRunning(true);
    
});

console.log("CHECK IT OUT!!!!-- audio", latestPitch()); // logs 1 - new initialValue, despite exact same call