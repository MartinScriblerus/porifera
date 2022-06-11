let initialTimestamp = Date.now();
import "./index.js"

export function beginPyAnalysisNote(user,note,octave,bpm){
    console.log("note: ", note);
    console.log("octave: ", octave);
    if(!note){
        note = '';
    }
    if(!octave){
        octave = 0;
    }
    // if(!initialTimestamp){
    //     initialTimestamp = Date.now();
    // }
    let timestampDiff = Date.now() - initialTimestamp;
    console.log("WHAT IS TS DIFF> ", game.user.timeRecordingStart);
    // this creates 4 time buckets per second 
    let timeBucket = parseFloat(timestampDiff / 1000).toFixed(2) * 120/bpm;
    let noteData = {
        "user": game.user["000000"],
        "initialTimestamp": game.user.timeRecordingStart,
        "timestamp": Date.now(),
        "timestampDiff": timestampDiff,
        "timeBucket": timeBucket,
        "note": note,
        "octave": octave
    }
    triggerMathPy(noteData)
}
