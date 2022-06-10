let initialTimestamp = Date.now();
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
    console.log("WHAT IS TS DIFF> ", timestampDiff);
    // this creates 4 time buckets per second 
    let timeBucket = parseFloat(timestampDiff / 1000).toFixed(2) * 120/bpm;
    let noteData = {
        "user": user,
        "initialTimestamp": initialTimestamp,
        "timestamp": Date.now(),
        "timestampDiff": timestampDiff,
        "timeBucket": timeBucket,
        "note": note,
        "octave": octave
    }
    triggerMathPy(noteData)
}
