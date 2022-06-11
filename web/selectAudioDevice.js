let audioDevice;
import "/index.js";

export default function selectAudioDevice(){

    // let audioDeviceSelect = document.getElementById("selectedAudioDevice");

    // if (!window.navigator.mediaDevices) {
    //     throw new Error(
    //       "This browser does not support web audio or it is not enabled."
    //     );
    //   }
    //   let devices = {};
      
    //   navigator.mediaDevices.enumerateDevices()
    //   .then(function(devices) {
    //     devices.forEach(function(device) {
    //         if(device.kind === "audioinput"){
            
    //             let option = document.createElement("option");
    //             option.value= device.deviceId;
    //             option.text = device.label;

    //             audioDeviceSelect.addEventListener("onchange", function(e){
    //                 chosenAudioDevice(e.target);
    //                 console.log("e.target is ", e.target);
    //                 console.log("AUDIO DEVICE VALUE: ", audioDeviceSelect.value);
    //                 game.user['000000000000'].audioDevice = document.getElementById("selectedAudioDevice").value;
    //                 if(audioDevice === ""){
    //                   game.user['000000000000'].audioDevice = document.getElementById("selectedAudioDevice").childNodes[1].deviceId;
    //                 }
    //             })
    //             audioDeviceSelect.appendChild(option);
    //             console.log("D_E_V_I_C_E_S: ", option);
                
    //             return audioDeviceSelect;
    //         }
    //     });
    //     console.log("AUDIO DEVICE SELECT ", audioDeviceSelect.options);
      
    //   })
    //   .catch(function(err) {
    //     console.log(err.name + ": " + err.message);
    //   });

}

export function chosenAudioDevice(audioDevice){
    console.log("AUDIO DEVICE CHOSEN ", audioDevice);
    
   
}