let initialTimestamp = window.__emscripten_date_now();
import "./index.js"

export function beginPyAnalysisNote(user,note,octave,keyNotePiano,keyNoteOrgan,midiNoteNumber,bpm){
    console.log("note: ", note);
    console.log("octave: ", octave);
    if(!note){
        note = '';
    }
    if(!octave){
        octave = 0;
    }
    if(!initialTimestamp){
        initialTimestamp = window.__emscripten_date_now();
    }

    let timestampDiff = window.__emscripten_date_now() - initialTimestamp;
    console.log("WHAT IS TIMESTAMP EMSCRIPTEN????> ", window.__emscripten_date_now());
    // this creates 4 time buckets per second 
    let timeBucket = parseFloat(timestampDiff / 1000).toFixed(2) * 120/bpm;
    let noteData = {
        "user": game.user["000000"],
        "initialTimestamp": game.user.timeRecordingStart,
        "timestamp": Date.now(),
        "timestampDiff": timestampDiff,
        "timeBucket": timeBucket,
        "note": note,
        "octave": octave,
        "keyNotePiano": keyNotePiano,
        "keyNoteOrgan": keyNoteOrgan,
        "midiNoteNumber": midiNoteNumber
    }
    noteDataToPy(noteData)
}
