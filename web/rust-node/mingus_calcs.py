from tabulate import tabulate
import notesData 
import pandas as pd
import numpy as np

notesDf = pd.DataFrame()

def mingus_calcs(data):
    global notesDf
    receivedData = list(data.values())
    notesDataFrame = notesData.notes_DataFrames(notesDf, receivedData[0]['notesForAnalysis'])
    #THIS IS DATAFRAME TABLE
    print(tabulate(notesDataFrame, headers='keys', tablefmt='psql'))
    notesDf = notesDataFrame
    # mingus_get_notes(data)
    return notesDf

if __name__ == '__main__':
    # test1.py executed as script
    mingus_calcs()