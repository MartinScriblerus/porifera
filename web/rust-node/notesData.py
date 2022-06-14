import pandas as pd
import numpy as np
import mingus.core.notes as notes
import json


def notes_DataFrames(notesDf, data):
    df = pd.DataFrame(data, columns=["initialTimestamp", "timestamp", "timestampDiff", "timeBucket", "note", "octave", "keyNotePiano", "keyNoteOrgan", "midiNoteNumber"])
    notesDf = pd.concat([notesDf, df])
    return notesDf

def mingus_get_notes(data):
    for dic in range(len((data['notesForAnalysis']))):
        noteToAnalyze = data['notesForAnalysis'][dic]['note']
        print(f"DIC!: {noteToAnalyze}")
        if(notes.is_valid_note(noteToAnalyze)):
            return
        else:   
            print(f"THIS IS NOT A VALID NOTE!!!!!: {noteToAnalyze}")
