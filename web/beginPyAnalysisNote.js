let initialTimestamp = window.__emscripten_date_now();
import "./index.js"

export function beginPyAnalysisNote(user,note,octave,mingusNumNote, midiNoteNumber,bpm){
    if(!note){
        note = 'D';
    }
    if(!octave){
        octave = 0;
    }
    if(!initialTimestamp){
        initialTimestamp = window.__emscripten_date_now();
    }

    let timestampDiff = window.__emscripten_date_now() - game.room.id.startGameTick;
    //console.log("In beginpyanalysisnote... WHAT IS TIMESTAMP EMSCRIPTEN????> ", window.__emscripten_date_now());

    // this creates 4 time buckets per second 
    let timeBucket = parseFloat(timestampDiff / 1000).toFixed(2) * 120/bpm;

    let noteData = {
        "user": game.user["000000"],
        "initialTimestamp": game.room.id.startGameTick,
        "timestamp": window.__emscripten_date_now(),
        "timestampDiff": timestampDiff,
        "timeBucket": timeBucket,
        "targetKey": game.room.id.targetKey,
        "targetOctave": game.room.id.targetOctave,
        "targetOctaveRange": game.room.id.targetOctaveRange,
        "scalePosition": game.room.id.scalePosition,
        "scale": game.room.id.scale,
        "nextNote": "",
        "note": note,
        "octave": octave,
        "mingusNumNote": mingusNumNote,
        // "keyNotePiano": keyNotePiano,
        // "keyNoteOrgan": keyNoteOrgan,
        "midiNoteNumber": midiNoteNumber
    }

    //console.log("SENDING NOOTE DATA TO PYTON FROM BEGIN ANALYSIS NOTE js");
    //console.log("GAME DELTA >>>>> ", game.room.id.delta);
    // if((game.room.id.delta < 100 || undefined)){
        noteDataToPy(noteData);
    // }

    
    let scaleNotes = document.getElementsByClassName("futureNote");
    for(let c = 0; c < scaleNotes.length; c++){
        if(scaleNotes[c].classList.contains("scale-position-emphasis")){
            scaleNotes[c].classList.remove("scale-position-emphasis")
        }
    }
    // if(game.room.id.scalePosition === null){
    //     game.room.id.scalePosition = 0;
    //     console.log("hittttttting this? ",game.room.id.scalePosition);
    // } else {
        document.getElementById("futureNotes_" + game.room.id.scalePosition).classList.add("scale-position-emphasis");
        game.room.id.scalePosition = game.room.id.scalePosition + 1;
    // }



    // document.getElementById("futureNotes_" + game.room.id.scalePosition).classList.add("scale-position-emphasis");
}
