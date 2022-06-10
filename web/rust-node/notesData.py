import pandas as pd
import numpy as np

def notes_DataFrames(notesDf, data):
    df = pd.DataFrame(data, columns=["initialTimestamp", "timestamp", "timestampDiff", "timeBucket", "note", "octave"])
    notesDf = pd.concat([notesDf, df])
    return notesDf