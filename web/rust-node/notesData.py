import pandas as pd
import numpy as np
import mingus.core.notes as notes
import json


def notes_DataFrames(notesDf, data):
    df = pd.DataFrame(data, columns=["initialTimestamp", "timestamp", "timestampDiff", "timeBucket", "note", "octave"])
    notesDf = pd.concat([notesDf, df])
    return notesDf

def mingus_get_notes(data):
    print(f"KEEEEYS: {data['notesForAnalysis']}")
    index = 0
    for dic in range(len((data['notesForAnalysis']))):
        noteToAnalyze = data['notesForAnalysis'][dic]['note']
        print(f"DIC!: {noteToAnalyze}")
        # for key in dic:
        #     print(f"KEY!!! {key}")
        #     print(f'YOYOYOYOYOYOY {data[index]}')
        if(notes.is_valid_note(noteToAnalyze)):
            print(f"CHECKS OUT!!! {noteToAnalyze}")
        else:   
            print(f"THIS IS NOT A VALID NOTE!!!!!: {noteToAnalyze}")
#print(f'HEYHEYHEYHEYHEEYYYY {data.iloc["note"]}')
# for i in data['note']:
#     print(f'HEYYYYYYYY: {notes.is_valid_note(i)}')