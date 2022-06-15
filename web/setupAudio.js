import PitchNode from "/PitchNode.js";
import { audioChanged, runningChanged} from "./AudioThreadManagerHooks.js";
import "/index.js";
import selectAudioDevice from "./selectAudioDevice.js";


// game.user.audio = [9,9,9,9,9,9,9];

async function getWebAudioMediaStream() {
  if (!window.navigator.mediaDevices) {
    throw new Error(
      "This browser does not support web audio or it is not enabled."
    );
  }
  
  // game.user['000000000000'].audioDevice = document.getElementById("selectedAudioDevice").value;
  // if(audioDevice === ""){
  //   game.user['000000000000'].audioDevice = document.getElementById("selectedAudioDevice").childNodes[1].deviceId;
  // }
  navigator.mediaDevices.enumerateDevices()
  .then(function(devices) {
    devices.forEach(function(device) {
      // console.log("D_E_V_I_C_E_S: ", device.kind + ": " + device.label +
      //             " id = " + device.deviceId);
      
    });
  })
  .catch(function(err) {
    console.log(err.name + ": " + err.message);
  });
  let audioDeviceSelect = document.getElementById("selectedAudioDevice");

  if (!window.navigator.mediaDevices) {
      throw new Error(
        "This browser does not support web audio or it is not enabled."
      );
    }
    let devices = {};
    
    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
      devices.forEach(function(device) {
          if(device.kind === "audioinput"){
          
              let option = document.createElement("option");
              option.value= device.deviceId;
              option.text = device.label;

              audioDeviceSelect.addEventListener("onchange", function(e){
                  chosenAudioDevice(e.target);
                  console.log("e.target is ", e.target);
                  console.log("AUDIO DEVICE VALUE: ", audioDeviceSelect.value);
                  game.user['000000000000'].audioDevice = document.getElementById("selectedAudioDevice").value;
                  if(audioDevice === ""){
                    game.user['000000000000'].audioDevice = document.getElementById("selectedAudioDevice").childNodes[1].deviceId;
                  }
              })
              audioDeviceSelect.appendChild(option);
              console.log("D_E_V_I_C_E_S: ", option);
              
              return audioDeviceSelect;
          }
      });
      console.log("AUDIO DEVICE SELECT ", audioDeviceSelect.options);
    
    })
    .catch(function(err) {
      console.log(err.name + ": " + err.message);
    });
  
  try {
    const result = await window.navigator.mediaDevices.getUserMedia({
      audio: {
        "deviceId": audioDeviceSelect.value || audioDeviceSelect.childNodes[1].deviceId 
       },
      video: false,
    });
    // setupAudio();
    audioChanged(result);
    return result;
  } catch (e) {
    switch (e.name) {
      case "NotAllowedError":
        throw new Error(
          "A recording device was found but has been disallowed for this application. Enable the device in the browser settings."
        );

      case "NotFoundError":
        throw new Error(
          "No recording device was found. Please attach a microphone and click Retry."
        );

      default:
        throw e;
    }
  }
}

async function setupAudio(onPitchDetectedCallback) {
  if(!game.user.isPlaying){
    game.user.isPlaying = true;
    game.user.startGameTime = window.__emscripten_date_now()
  }
  // Get the browser audio. Awaits user "allowing" it for the current tab.
  const mediaStream = await getWebAudioMediaStream();
  const tracks = mediaStream.getAudioTracks();
  console.log("T_R_A_C_K_S: ", tracks);
  
  const context = new window.AudioContext();
  const audioSource = context.createMediaStreamSource(mediaStream);



  let node;

  try {
    // Fetch the WebAssembly module that performs pitch detection.
    // const response = await fetch("../rust-node/pkg/rust_node_bg.wasm");
    const response = await (await window.fetch("rust_node_bg.wasm"));
    const wasmBytes = await response.arrayBuffer();
    // Add our audio processor worklet to the context.
    const processorUrl = "PitchProcessor.js";
    try {
      await context.audioWorklet.addModule(processorUrl);
    } catch (e) {
      throw new Error(
        `Failed to load audio analyzer worklet at url: ${processorUrl}. Further info: ${e.message}`
      );
    }
    // document.getElementById("pitchBox").style.display = "none";
    console.log("RAW DATA!!!!! ", context.audioWorklet);
    console.log("whole context@!!! ", context);
    
    // Create the AudioWorkletNode which enables the main JavaScript thread to
    // communicate with the audio processor (which runs in a Worklet).
    node = new PitchNode(context, "PitchProcessor");
    // numAudioSamplesPerAnalysis specifies the number of consecutive audio samples that
    // the pitch detection algorithm calculates for each unit of work. Larger values tend
    // to produce slightly more accurate results but are more expensive to compute and
    // can lead to notes being missed in faster passages i.e. where the music note is
    // changing rapidly. 1024 is usually a good balance between efficiency and accuracy
    // for music analysis.
    const numAudioSamplesPerAnalysis = 1024;

    // Send the Wasm module to the audio node which in turn passes it to the
    // processor running in the Worklet thread. Also, pass any configuration
    // parameters for the Wasm detection algorithm.
    node.init(wasmBytes, onPitchDetectedCallback, numAudioSamplesPerAnalysis);

    // Connect the audio source (microphone output) to our analysis node.
    audioSource.connect(node);

    // Connect our analysis node to the output. Required even though we do not
    // output any audio. Allows further downstream audio processing or output to
    // occur.
    node.connect(context.destination);
  } catch (err) {
    throw new Error(
      `Failed to load audio analyzer WASM module. Further info: ${err.message}`
    );
  }


  // TODO -> IMPLEMENT PAUSE PITCH GATHER HERE
  ///////////////////////////////////////////////////
  // if(context.state !== "running"){
  //   await context.suspend();
  //   console.log("WHAT IS CONTEXT>>> ", context);
  //   console.log("WHAT IS AUDIOSOURCE?? ", audioSource);
  //   runningChanged(undefined)
  //   mediaStream.enabled = false;

  // } else {
  //   await context.resume();
  //   runningChanged("running");
  //   mediaStream.enabled = true;
  // }

  

  return { context, node };
}


export { getWebAudioMediaStream, setupAudio };



