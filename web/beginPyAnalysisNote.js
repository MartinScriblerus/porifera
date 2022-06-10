export function beginPyAnalysisNote(note,octave){
    console.log("note: ", note);
    console.log("octave: ", octave);
    if(!note){
        note = '';
    }
    if(!octave){
        octave = 0;
    }
    let noteData = {
        "timestamp": Date.now(),
        "note": note,
        "octave": octave
    }
    triggerMathPy(noteData)
}
