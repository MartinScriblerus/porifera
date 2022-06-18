import pandas as pd
import numpy as np
import mingus.core.notes as notes
from mingus.containers import Note
import mingus.core.scales as scales



import json

def mingus_get_scale(key, octave, octave_range, scale):
    global scal_expected
    print(f'whast is scale?? {scale}')
    print(f'whast is key?? {key}')

    if scale == "major":
        scal_expected = scales.Major(key)
        print(scal_expected)
        return scal_expected
    if scale == "harmonic_major":
        scal_expected = scales.HarmonicMajor(key)
        print(scal_expected)
        return scal_expected
    if scale == "natural_minor":
        scal_expected = scales.NaturalMinor(key)
        print(scal_expected)
        return scal_expected
    if scale == "harmonic_minor":
        scal_expected = scales.HarmonicMinor(key)
        print(scal_expected)
        return scal_expected
    if scale == "melodic_minor":
        scal_expected = scales.MelodicMinor(key)
        print(scal_expected)
        return scal_expected
    if scale == "bachian":
        scal_expected = scales.Bachian(key)
        print(scal_expected)
        return scal_expected
    if scale == "minor_neapolitan":
        scal_expected = scales.MinorNeapolitan(key)
        print(scal_expected)
        return scal_expected
    if scale == "mixolydian":
        scal_expected = scales.Mixolydian(key)
        print(scal_expected)
        return scal_expected
    if scale == "chromatic":
        scal_expected = scales.Chromatic(key)
        print(scal_expected)
        return scal_expected
    if scale == "whole_tone":
        scal_expected = scales.WholeTone(key)
        print(scal_expected)
        return scal_expected
    if scale == "octatonic":
        scal_expected = scales.Octatonic(key)
        print(scal_expected)
        return scal_expected
    if scale == "ionian":
        scal_expected = scales.Ionian(key)
        print(scal_expected)
        return scal_expected
    if scale == "dorian":
        scal_expected = scales.Dorian(key)
        print(scal_expected)
        return scal_expected
    if scale == "phrygian":
        scal_expected = scales.Phrygian(key)
        print(scal_expected)
        return scal_expected
    if scale == "lydian":
        scal_expected = scales.Lydian(key)
        print(scal_expected)
        return scal_expected
    if scale == "aeolian":
        scal_expected = scales.Aeolian(key)
        print(scal_expected)
        return scal_expected
    if scale == "locrian":
        scal_expected = scales.Locrian(key)
        print(scal_expected)
        return scal_expected
    if scale == "surprise_me":
        scal_expected = "surprise_me"
        print("todo: set up random scales")   
        return scal_expected 
    # # If an exact match is not confirmed, this last case will be used if provided
    # else:
    #     # print(f"HERE's what I'm seeing in audio select: {key}, {octave}, {octave_range}, {scale}")
    #     # print(f"Diatonic C 0: {scales.Diatonic('C',[0])}")
    #     # print(f"Diatonic C 1: {scales.Diatonic('C',[1])}")
    #     # print(f"Diatonic C 2: {scales.Diatonic('C',[2])}")
    #     # print(f"Diatonic C 3: {scales.Diatonic('C',[3])}")
    #     # print(f"Diatonic C 4: {scales.Diatonic('C',[4])}")
    #     # print(f"Diatonic C 5: {scales.Diatonic('C',[5])}")
    #     # print(f"Diatonic C 6: {scales.Diatonic('C',[6])}")
    #     # print(f"Ionic C: {scales.Ionian('C')}")
    #     # print(f"Dorian C: {scales.Dorian('C')}")
    #     # print(f"Major C: {scales.Major('C')}")
    #     # print(f"Harmonic Major C: {scales.HarmonicMajor('C')}")
    #     # print(f"Harmonic Minor C: {scales.HarmonicMinor('C')}")
    #     # print(f"Natural Minor C: {scales.NaturalMinor('C')}")
    #     print(f"scale is undefined")
       
        # return "Something's wrong with the internet"
    else:
        print(f"something's wrong with the internet")
  
    print(f"heyaaaa... we got this result: {scal_expected}")
    # if(result):
    #     requests.post('http://127.0.0.1:3000/expectedAudio', json=result) 
    # Return data in json format 
    # return json.dumps({"result":scal_expected})
    return scal_expected

def expected_notes_Dataframes(expected_notesDf, expected_data):
    df_expected = pd.DataFrame(expected_data, columns=["key", "octave", "octave_range", "scale"])
    expected_notesDf = pd.concat([expected_notesDf, df_expected])
    return expected_notesDf

def notes_DataFrames(notesDf, data):
    df = pd.DataFrame(data, columns=["initialTimestamp", "timestamp", "timestampDiff", "note", "octave", "mingusNumNote", "midiNoteNumber"])
    notesDf = pd.concat([notesDf, df])
    return notesDf

# def mingus_get_notes(data):
#     for dic in range(len((data['notesForAnalysis']))):
#         # noteToAnalyze = data['notesForAnalysis'][dic]['note']
#         # print(data['notesForAnalysis'])
#         # print(f"is this growing? {len(data)}")
#         # this works ************ =>
#         # for n in data['notesForAnalysis']:
       
#             # print(f"THIS IS IS SISISIS {n['note']} and {n['octave']}")

#             # print(f'Mingus Num Note in Python => {n["mingusNumNote"]}')
#             # if(notes.is_valid_note(n['note'])):
#             #     return noteToAnalyze
#             # else:   
#             #     print(f"THIS IS NOT A VALID NOTE IN MINGUS!!!!!: {noteToAnalyze}")

def mingus_expect_notes(data):
    print(f'expecyting this data!!@@ {data}')
    
