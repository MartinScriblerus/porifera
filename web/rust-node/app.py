from ast import While
import nltk
from flask import Flask, request
import requests
import sys, json 
from flask_cors import CORS
import asyncio
from datetime import datetime
import websockets 
from websockets import connect

print(sys.path)

app = Flask(__name__)
CORS(app)


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
    
    print(f"data(sum of array): {data}")
    
    # Data variable contains the 
    # data from the node server
    ls = data['array'] 
    print(f"DATA FROM NODE {ls}")
    result = sum(ls) # calculate the sum
    print(result)
    last_val = result
    if(result != last_val):
        res = requests.post('http://127.0.0.1:3000/arraysum', json=data) 
    # Return data in json format 
    return json.dumps({"result":result})



# ========================================================
# SOCKETS ROUTE
# ========================================================
async def test_sockets(path):
    async with connect(path) as websocket:
        now = datetime.now()
        await websocket.send(f"Python sends now: {now}")

        test = await websocket.recv()
        print(f'Python receives {test}')
            
# while True:        
asyncio.run(test_sockets("ws://localhost:8081"))


# ========================================================
# (SEND TO) NODE INTEROP ROUTE
# ========================================================
@app.route('/to_node', methods = ['POST']) 
def toNode():
    data1 = request.get_json() 
    asyncio.run(test_sockets("ws://localhost:8081"))
    # Sample array
    # array = [4,5,6,7,8,9,10]
    array = data1
    
    # Data that we will send in post request.
    data = {'array':array}
    
    # The POST request to our node server
    res = requests.post('http://127.0.0.1:3000/arraysum', json=data) 
    # Convert response data to json
    returned_data = res.json() 
    print(type(returned_data))
    print(returned_data)
    result = returned_data['result'] 
    requests.post('http://127.0.0.1:3000/updateArraySum', json={'array':result}) 
    print(type(result))
    print("just got this data from node!:", result)
   
    # return result
    return json.dumps({"response": result})
    ############




# ========================================================
# APP & SERVER
if __name__ == "__main__":
    app.run(port='8088', threaded=False, debug=True)
    