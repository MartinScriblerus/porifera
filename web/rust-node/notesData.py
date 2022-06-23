import pandas as pd
import numpy as np
import mingus.core.notes as notes
from mingus.containers import Note
import mingus.core.scales as scales
import requests


import json

def mingus_get_scale(key, octave, octave_range, scale, scale_position):
    global scal_expected
    print(f'whast is scale?? {scale}')
    if scale[0:3]=="Asc":
        print('in expected !!!!!!!!!!!!!!!!!!')
        print(scale.split("\n"))
        print('!!!!!!!!!!!!!!!!!!')
    
    print(f'whast is key?? {key}')

    print(f'whast is octave {octave}')
    print(f'whast is octave range {octave_range}')
    
 

    if scale == "major":
        scal_expected = scales.Major(key)
        scal_expected = scal_expected.__str__()
        scal_expected = scal_expected.split('\n')[0]
        scal_expected = scal_expected.split('  ')[1]
        scal_expected = list(scal_expected.split(' '))
        print(f"here we go in major: {scal_expected}")
        note_holder1 = []
        for i in scal_expected:
            i = notes.reduce_accidentals(i)
            note_holder1.append(i)
        requests.post('http://127.0.0.1:3000/expectedAudio', json=note_holder1) 
        return note_holder1 
    elif scale == "harmonic_major":
        scal_expected = scales.HarmonicMajor(key)
        scal_expected = scal_expected.__str__()
        scal_expected = scal_expected.split('\n')[0]
        scal_expected = scal_expected.split('  ')[1]
        scal_expected = list(scal_expected.split(' '))
        print(f"here we go in harmonic major: {scal_expected}")
        note_holder1 = []
        for i in scal_expected:
            i = notes.reduce_accidentals(i)
            note_holder1.append(i)
        requests.post('http://127.0.0.1:3000/expectedAudio', json=note_holder1) 
        return note_holder1 
    elif scale == "natural_minor":
        scal_expected = scales.NaturalMinor(key)
        scal_expected = scal_expected.__str__()
        scal_expected = scal_expected.split('\n')[0]
        scal_expected = scal_expected.split('  ')[1]
        scal_expected = list(scal_expected.split(' '))
        print(f"here we go in nat minor: {scal_expected}")
        note_holder1 = []
        for i in scal_expected:
            i = notes.reduce_accidentals(i)
            note_holder1.append(i)
        requests.post('http://127.0.0.1:3000/expectedAudio', json=note_holder1) 
        return note_holder1 
    elif scale == "harmonic_minor":
        scal_expected = scales.HarmonicMinor(key)
        scal_expected = scal_expected.__str__()
        scal_expected = scal_expected.split('\n')[0]
        scal_expected = scal_expected.split('  ')[1]
        scal_expected = list(scal_expected.split(' '))
        print(f"here we go in harmonic minor: {scal_expected}")
        note_holder1 = []
        for i in scal_expected:
            i = notes.reduce_accidentals(i)
            note_holder1.append(i)
        requests.post('http://127.0.0.1:3000/expectedAudio', json=note_holder1) 
        return note_holder1 
    elif scale == "melodic_minor":
        scal_expected = scales.MelodicMinor(key)
        scal_expected = scal_expected.__str__()
        scal_expected = scal_expected.split('\n')[0]
        scal_expected = scal_expected.split('  ')[1]
        scal_expected = list(scal_expected.split(' '))
        print(f"here we go in melodic minor: {scal_expected}")
        note_holder1 = []
        for i in scal_expected:
            i = notes.reduce_accidentals(i)
            note_holder1.append(i)
        requests.post('http://127.0.0.1:3000/expectedAudio', json=note_holder1) 
        return note_holder1 
    elif scale == "bachian":
        scal_expected = scales.Bachian(key)
        scal_expected = scal_expected.__str__()
        scal_expected = scal_expected.split('\n')[0]
        scal_expected = scal_expected.split('  ')[1]
        scal_expected = list(scal_expected.split(' '))
        print(f"here we go in bachian: {scal_expected}")
        note_holder1 = []
        for i in scal_expected:
            i = notes.reduce_accidentals(i)
            note_holder1.append(i)
        requests.post('http://127.0.0.1:3000/expectedAudio', json=note_holder1) 
        return note_holder1 
    elif scale == "minor_neapolitan":
        scal_expected = scales.MinorNeapolitan(key)
        scal_expected = scal_expected.__str__()
        scal_expected = scal_expected.split('\n')[0]
        scal_expected = scal_expected.split('  ')[1]
        scal_expected = list(scal_expected.split(' '))
        print(f"here we go in minor neapolitan: {scal_expected}")
        note_holder1 = []
        for i in scal_expected:
            i = notes.reduce_accidentals(i)
            note_holder1.append(i)
        requests.post('http://127.0.0.1:3000/expectedAudio', json=note_holder1) 
        return note_holder1 
    elif scale == "mixolydian":
        scal_expected = scales.Mixolydian(key)
        scal_expected = scal_expected.__str__()
        scal_expected = scal_expected.split('\n')[0]
        scal_expected = scal_expected.split('  ')[1]
        scal_expected = list(scal_expected.split(' '))
        print(f"here we go in mixolydian: {scal_expected}")
        note_holder1 = []
        for i in scal_expected:
            i = notes.reduce_accidentals(i)
            note_holder1.append(i)
        requests.post('http://127.0.0.1:3000/expectedAudio', json=note_holder1) 
        return note_holder1 
    elif scale == "chromatic":
        scal_expected = scales.Chromatic(key)
        scal_expected = scal_expected.__str__()
        scal_expected = scal_expected.split('\n')[0]
        print(f"NEWWWWWW +> DO WE HAVE A DESCENDING?")
        print(scal_expected)
        print(f"END =============")
        scal_expected = scal_expected.split('  ')[1]
        scal_expected = list(scal_expected.split(' '))
        print(f"here we go: {scal_expected}")
        note_holder = []
        for i in scal_expected:
            # i = json.dumps(list(i))
            # print(f"what is typeof i?? {type(i)}")
            # print(f"what is i  {i}")
            # print(f"what is i to list {list(i)}")
            # print(f"what is i to json.dumps {json.dumps(list(i))}")
            i = notes.reduce_accidentals(i)
            note_holder.append(i)
            # print(f"ARE WE FREE OF ACCIDENTALS? {note_holder}")
            # return scal_expected
            if len(note_holder) >= 13:
                print(f"here is note holder: {note_holder}")
                requests.post('http://127.0.0.1:3000/expectedAudio', json=note_holder) 
                return note_holder
    elif scale == "whole_tone":
        scal_expected = scales.WholeTone(key)
        scal_expected = scal_expected.__str__()
        scal_expected = scal_expected.split('\n')[0]
        scal_expected = scal_expected.split('  ')[1]
        scal_expected = list(scal_expected.split(' '))
        print(f"here we go in whole tone: {scal_expected}")
        note_holder1 = []
        for i in scal_expected:
            i = notes.reduce_accidentals(i)
            note_holder1.append(i)
        requests.post('http://127.0.0.1:3000/expectedAudio', json=note_holder1) 
        return note_holder1 
    elif scale == "octatonic":
        scal_expected = scales.Octatonic(key)
        scal_expected = scal_expected.__str__()
        scal_expected = scal_expected.split('\n')[0]
        scal_expected = scal_expected.split('  ')[1]
        scal_expected = list(scal_expected.split(' '))
        print(f"here we go in octatonic: {scal_expected}")
        note_holder1 = []
        for i in scal_expected:
            i = notes.reduce_accidentals(i)
            note_holder1.append(i)
        requests.post('http://127.0.0.1:3000/expectedAudio', json=note_holder1) 
        return note_holder1 
    elif scale == "ionian":
        scal_expected = scales.Ionian(key)
        scal_expected = scal_expected.__str__()
        scal_expected = scal_expected.split('\n')[0]
        scal_expected = scal_expected.split('  ')[1]
        scal_expected = list(scal_expected.split(' '))
        print(f"here we go in ionian: {scal_expected}")
        note_holder1 = []
        for i in scal_expected:
            i = notes.reduce_accidentals(i)
            note_holder1.append(i)
        requests.post('http://127.0.0.1:3000/expectedAudio', json=note_holder1) 
        return note_holder1 
    elif scale == "dorian":
        scal_expected = scales.Dorian(key)
        scal_expected = scal_expected.__str__()
        scal_expected = scal_expected.split('\n')[0]
        scal_expected = scal_expected.split('  ')[1]
        scal_expected = list(scal_expected.split(' '))
        print(f"here we go in dorian: {scal_expected}")
        note_holder1 = []
        for i in scal_expected:
            i = notes.reduce_accidentals(i)
            note_holder1.append(i)
        requests.post('http://127.0.0.1:3000/expectedAudio', json=note_holder1) 
        return note_holder1 
    elif scale == "phrygian":
        scal_expected = scales.Phrygian(key)
        scal_expected = scal_expected.__str__()
        scal_expected = scal_expected.split('\n')[0]
        scal_expected = scal_expected.split('  ')[1]
        scal_expected = list(scal_expected.split(' '))
        print(f"here we go in phrygian: {scal_expected}")
        note_holder1 = []
        for i in scal_expected:
            i = notes.reduce_accidentals(i)
            note_holder1.append(i)
        requests.post('http://127.0.0.1:3000/expectedAudio', json=note_holder1) 
        return note_holder1 
    elif scale == "lydian":
        scal_expected = scales.Lydian(key)
        scal_expected = scal_expected.__str__()
        scal_expected = scal_expected.split('\n')[0]
        scal_expected = scal_expected.split('  ')[1]
        scal_expected = list(scal_expected.split(' '))
        print(f"here we go in lydian: {scal_expected}")
        note_holder1 = []
        for i in scal_expected:
            i = notes.reduce_accidentals(i)
            note_holder1.append(i)
        requests.post('http://127.0.0.1:3000/expectedAudio', json=note_holder1) 
        return note_holder1 
    elif scale == "aeolian":
        scal_expected = scales.Aeolian(key)
        scal_expected = scal_expected.__str__()
        scal_expected = scal_expected.split('\n')[0]
        scal_expected = scal_expected.split('  ')[1]
        scal_expected = list(scal_expected.split(' '))
        print(f"here we go in aeolian: {scal_expected}")
        note_holder1 = []
        for i in scal_expected:
            i = notes.reduce_accidentals(i)
            note_holder1.append(i)
        requests.post('http://127.0.0.1:3000/expectedAudio', json=note_holder1) 
        return note_holder1 
    elif scale == "locrian":
        scal_expected = scales.Locrian(key)
        scal_expected = scal_expected.__str__()
        scal_expected = scal_expected.split('\n')[0]
        scal_expected = scal_expected.split('  ')[1]
        scal_expected = list(scal_expected.split(' '))
        print(f"here we go in locrian: {scal_expected}")
        note_holder1 = []
        for i in scal_expected:
            i = notes.reduce_accidentals(i)
            note_holder1.append(i)
        requests.post('http://127.0.0.1:3000/expectedAudio', json=note_holder1) 
        return note_holder1 
    elif scale == "surprise_me":
        scal_expected = "surprise_me"
        scal_expected = scal_expected.__str__()
        print("todo: set up random scales")   
        requests.post('http://127.0.0.1:3000/expectedAudio', json=scal_expected) 
        return json.dumps(list(scal_expected))
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
    # if(result):
    #     requests.post('http://127.0.0.1:3000/expectedAudio', json=result) 
    # Return data in json format 

    # print(f">>>>>>>>>>>> {scal_expected}")
    # requests.post('http://127.0.0.1:3000/expectedAudio', json=scal_expected) 
    # return json.dumps(list(scal_expected))
    # return scal_expected

def expected_notes_Dataframes(expected_notesDf, expected_data):
    test = scal_expected
    print(f'here is the eeeeexxxxppppeeeccccttttteeeedddd scccccaaaaallllleeee {test}')
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
    # print(f'expecyting this data!!@@ {data}')
    return
    
