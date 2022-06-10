import pandas as pd
import numpy as np

def notes_DataFrames(notesDf, data):
    df = pd.DataFrame(data, columns=["note", "octave", "timestamp"])
    notesDf = pd.concat([notesDf, df])
    return notesDf