import { getWebAudioMediaStream, setupAudio, testConnect } from "./setupAudio.js";

function test(){
    testConnect(8);
};
test();

// ========================================
// HOOKS IMPLEMENTATION
// ========================================

export function pitchChanged(newPitch){
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
      }
};

export function audioChanged(newAudio){
    setAudio(newAudio);
};

export function runningChanged(newRunning){
    setRunning(newRunning);
    console.log("Running State: ", running());
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
//   console.log(audio()); 
//   console.log(running());
//   console.log(latestPitch());
//   setAudio(7) // sets _val inside useState's scope
//   setRunning(true);
//   setLatestPitch(300.00);
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