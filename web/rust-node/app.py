from ast import While
import nltk
from flask import Flask, request
import requests
import mingus_calcs
import notesData
import sys, json 
from flask_cors import CORS
import asyncio
from datetime import datetime
import websockets 
from websockets import connect
import mingus.core.notes as notes
from copy import deepcopy

print(sys.path)

app = Flask(__name__)
CORS(app, support_credentials=True)

def application(environ, start_response):
  if environ['REQUEST_METHOD'] == 'OPTIONS':
    start_response(
      '200 OK',
      [
        ('Content-Type', 'application/json'),
        ('Access-Control-Allow-Origin', '*'),
        ('Access-Control-Allow-Headers', 'Authorization, Content-Type'),
        ('Access-Control-Allow-Methods', 'POST'),
      ]
    )
    return ''

# ========================================================
# PYTHON ROUTES
# ========================================================

@app.route('/')
def hello():
    # Create Dictionary
    value = {
        "greeting": "Hello World!"
    }
    return value

    
@app.route('/return_name/<name>')
def hello_name(name):
    value = {
        "name": name
    }
    return value
    

#     # return "Hello {}!".format(name)
#     # d=string_sum.sum_as_string(12,13)
#     # print(d)
    

@app.route('/', methods=['POST'])
def my_form_post():
    # text = request.form['text']
    text = "Can you see who is on the wall--it is a beautiful bird."
    nltk.download('vader_lexicon')
    from nltk.sentiment.vader import SentimentIntensityAnalyzer
    sid = SentimentIntensityAnalyzer()
    score = ((sid.polarity_scores(str(text))))['compound']
    if(score > 0):
        label = 'This sentence is positive'
    elif(score == 0):
        label = 'This sentence is neutral'
    else:
        label = 'This sentence is negative'
    # return(render_template('index.html', variable=label))
    value = {
        "text": text,
        "sentiment": label
    }
    return value

# ========================================================
# (RECEIVE FROM) NODE INTEROP ROUTE
# ========================================================
last_val = {}
# Setup url route which will calculate
# total sum of array.
@app.route('/arraysum', methods = ['POST']) 
def sum_of_array(): 
    data = request.get_json() 
    
    # this is test (array 1-10)
    print(f"data(sum of array): {data}")
    
    # Data variable contains the 
    # data from the node server
    ls = data['array'] 

    result = sum(ls)/len(ls) # calculate the sum / length
    print(result)
    last_val = result
    if(result != last_val):
        requests.post('http://127.0.0.1:3000/arraysum', json=data) 
    # Return data in json format 
    return json.dumps({"result":result})



# ========================================================
# SOCKETS ROUTE
# ========================================================
async def test_sockets(expected_notes, path):
    
    async with connect(path) as websocket:
        now = datetime.now()
        # await websocket.send(f"Python sends now: {now} and {expected_notes}")
        await websocket.send(json.dumps({"notes":expected_notes}))

        test = await websocket.recv()
        print(f'Python receives {test} on path: {path}')
            
# while True:        
asyncio.run(test_sockets([],"ws://localhost:8081"))


# ========================================================
# SEND MINGUS SETUP DATA
# ========================================================


@app.route('/audio_selections', methods = ['POST'])
def audioSelections():
    
    #dataAudioSelections linkefd to Audio Thread Manager Hooks
    dataAudioSelections = request.get_json()
    print(f'is this what I think it is???? ', dataAudioSelections)
    # if len(dataAudioSelections["result"]) < 1:
    #     return
    print(f"Audio Selections: {dataAudioSelections}")
    if len(dataAudioSelections) <2:
        print(f'wjat are data selections {dataAudioSelections}')
    exp_scale = notesData.mingus_get_scale(dataAudioSelections['targetKey'], dataAudioSelections['targetOctave'], dataAudioSelections['targetOctaveRange'],dataAudioSelections['targetScale'],dataAudioSelections['scalePosition'])
    
    scal_expected1 = exp_scale.__str__()

    asyncio.run(test_sockets(scal_expected1,"ws://localhost:8081"))
    requests.post('http://127.0.0.1:3000/expectedAudio', json={'array':scal_expected1}) 

    print(f'EXPECTED SCALE IN APP PY: {exp_scale}')
    # print(f'EXPECTED SCALE KEYS IN APP PY: {type(exp_scale)}')
    
    # json_exp_scale = {'ascending': exp_scale['Ascending'], 'descending':exp_scale['Descending']}
    # print(f'EXPECTED SCALE TYPE IN APP PY: {json_exp_scale}')



    # if len(exp_scale) >= 1:
    # requests.post('http://127.0.0.1:3000/expectedAudio', exp_scale) 
        # The POST request to our node server
    
    #res = requests.post('http://127.0.0.1:3000/expectedAudio', exp_scale) 
    array = []
    data = {}
    # Convert response data to json
    #returned_data = res.json() 

    #result = returned_data['result'] 
    # requests.post('http://127.0.0.1:3000/expectedAudio', json=json_exp_scale)  
    
    # return dataAudioSelections
    return exp_scale

# ========================================================
# (SEND TO) NODE INTEROP ROUTE
# ========================================================
@app.route('/to_node', methods = ['POST']) 
def toNode():
    data1 = request.get_json() 

    # #TODO: MOVE TEST_SOCKETS TO AFTER DATA ANALYSIS
    ##asyncio.run(test_sockets("ws://localhost:8081"))

    # Sample array
    # array = [4,5,6,7,8,9,10]
    
    array = data1
    # print(f'array is... {array}')
    print(f'this is DATA1 len!!!! {len(array)}')
    # Data that we will send in post request.
    data = {'array':array}
    #print(f'THIS PRINYS A BUNCH OF DATA>>> {array}')
    notesData.mingus_expect_notes(array)
    mingus_calcs.mingus_calcs(data)
  
    # key, octave, octave_range, scale
    
    print(array.keys())
    ## START BACK HERE...
    ##notesData.mingus_get_scale(array["notesForAnalysis"]["targetKey"],array["notesForAnalysis"]["targetOctave"],array["notesForAnalysis"]["targetOctaveRange"],array["notesForAnalysis"]["scale"], array["notesForAnalysis"]["scalePosition"])
    # notesData.mingus_get_scale(array)



    # The POST request to our node server
    res = requests.post('http://127.0.0.1:3000/arraysum', json=data) 
    array = []
    data = {}
    # Convert response data to json
    returned_data = res.json() 

    result = returned_data['result'] 
    requests.post('http://127.0.0.1:3000/updateArraySum', json={'array':result})  
    # print(type(result))
    # print("just got this data from node!:", result)
    
    # return result
    return json.dumps({"response": result})
    ############




# ========================================================
# APP & SERVER
if __name__ == "__main__":
    app.run(port='8088', threaded=False, debug=True)
    