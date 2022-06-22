// 'use strict';
const express = require('express');
var child_process = require('child_process');
const redis = require('redis');
const http = require('http');
var cors = require('cors');
var fs = require('fs');


const factory = require('../web/gen/hello.js')
console.log("What are factory keys? ", Object.keys(factory));

var request = require('request-promise');
var bodyParser = require('body-parser');
// const path = require('node:path');
const {test} = require('../web/rust-node/index.node');
// const arraySum = require('arraysum.js');

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// =============================================
// BUILD
// =============================================

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


// =============================================
// WEBSOCKET SERVER
// =============================================

const WebSocket = require('ws');
//initialize a simple http server
const server = http.createServer(app);


const wss = new WebSocket.Server({ port : 8081});
const ws = new WebSocket('ws://127.0.0.1:8081');

// export function passSocket(data){
//   const ws = new WebSocket('ws://127.0.0.1:8081');
//   wss.on('connection', function(ws) {
//     console.log("MADE IT INTO FUNCTION");
//     ws.on('something', function(data){
//       console.log('client!!?? received:', data);
//     });
//     ws.send(JSON.stringify({ message: data }));
//   });
  
// }
ws.on('message', function(data) {
  console.log('client received:', data);
});



wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
    // console.log("data is ", data);
    if(Object.keys(data).indexOf("Ascending") !== -1){
      ws.send('something', function(data) {
        console.log('server is sending...:', data);
      });
    }
    // ws.emit(JSON.stringify(data));

    return data;
  });
  
  if(!data){
    data = [1, 1, 2]
  }
  ws.send(JSON.stringify(data));
});



const redisPort = 6379
const client = redis.createClient(redisPort);

const publisher = redis.createClient();
var redisSubscriber = redis.createClient();
var redisPublisher = redis.createClient();
async function connectPublisher(){
  try{
    await publisher.connect();
  } catch(e){
    console.log(e);
  }
}
connectPublisher();
redisSubscriber.on('subscribe', function (channel, count) {
  console.log('client subscribed to ' + channel + ', ' + count + ' total subscriptions');
});

redisSubscriber.on('message', function (channel, message) {
  console.log('client channel ' + channel + ': ' + message);
  wss.emit('connection', message);
});

async function createRedisPublisher (msg) {
  const article = {
    id: '123456',
    name: 'Using Redissss Pub/Sub with Node.js',
    message: JSON.stringify(msg) || 'that is right, motherfucker',
  };  
  console.log(article); // 'message'
  await publisher.publish('article', JSON.stringify(article));
};


async function createRedisSubscriber () {

  const client = redis.createClient();

  const subscriber = client.duplicate();
  await client.connect()
  await subscriber.connect();

  await subscriber.subscribe('article', (message) => {
    message="Redis Pub/Sub Connected in subscriber";
    console.log(message); // 'message'
  });

};




// =============================================
// CHILD PROCESSES
// =============================================

console.log('[Parent]', 'initalize');

var child1 = child_process.fork(__dirname + '/child');
child1.on('message', function(msg) { 
    console.log('[Parent]', 'Answer from child: ', msg); 
});

// one can send as many messages as one want
child1.send('Hello'); // Hello to you too :)
child1.send('Hello'); // Hello to you too :)

// one can also have multiple children
var child2 = child_process.fork(__dirname + '/child');

   

// =============================================
// ASYNC HELPER FUNCTION 
// =============================================

function asyncWrapper(fn) {
  return (req, res, next) => {
    return Promise.resolve(fn(req))
      .then((result) => res.send(result))
      .catch((err) => next(err))
  }
}

// =============================================
// RUST INTEROP
// =============================================

async function rustInterop_(x, y, z){
  const n = await x;
  console.log("Called on get root// x value from rust: ", x);
  console.log("Called on get root// y value from rust: ", y);
  console.log("Called on get root// z value from rust: ", z);


}

let addon=require('../web/rust-node/index.node');
// console.log(addon.hello);
const works = addon;



// =============================================
// PYTHON INTEROP => call this method to return a number (sum of array)
// =============================================

async function arraysum(data) {
  var options = {
      method: 'POST',

      // http:flaskserverurl:port/route
      uri: 'http://127.0.0.1:8088/arraysum',
      body: data,

      // Automatically stringify the body to JSON 
      json: true
  };

  var sendrequest = await request(options)
    // The parsedBody contains the data
    // sent back from the Flask server 
    .then(function (parsedBody) {  
        // TODO: do something with returned data
        let result;
        result = parsedBody['result'];
        console.log("Result value (array sum) from Python: ", result);
        
        console.log("send to python child process!! ", result);
        //child1.send("message", result); // Hello to you too :)

  
        wss.on('connection', function(ws) {
          ws.on('message', function(result) {
            console.log('websocket to browser delivers python message:', result);
          });
          ws.send(result);
        });
    })
    .catch(function (err) {
        console.log("error: ", err);
    });
}  // This variable contains the data to send
var data = {
    array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}  
arraysum(data);




// =============================================
// NODE ROUTES 
// =============================================

app.get('/', cors(corsOptions), (req, res) => {
  console.log("works: ", works);
  let x = works.get();
  let y = works.getNum();
  let z = works.getHello(120);
  createRedisSubscriber();
  
  // let xx = works.timed();
  // console.log("WORKS:", works);
  console.log(`$x ${x} // y ${y} // z ${z}`);
  // res.json({x:x,y:y,z:z});
  rustInterop_(x, y, z);  
  res.json({"rust_x": x, "rust_y": y, "rust_z": z, "data": data});
  return;
});

app.get('/rust_pkg_wasm', cors(corsOptions), (req,res) => {
  try {
    const data = fs.readFileSync('/Users/matthewreilly/Desktop/porifera/rust-node/pkg/rust_node.js', 'utf8');
    return console.log(data);
  } catch (err) {
    console.error(err);
  }
})

app.post("/updateArraySum", cors(corsOptions), async (req, res) => {
  // createRedisSubscriber();
  createRedisPublisher(req.body);
  
  let wsMsg = req.body;

  wss.clients.forEach((client) => {
   
    // if (client.readyState === WebSocket.OPEN) {
    if (client.readyState === 1) {
      client.send(JSON.stringify({message: wsMsg }));
      console.log("sent websocket message from server.js ");
    }
  });

  res.json({"received*in*node": req.body.arraysum});
});

app.post("/expectedAudio", cors(corsOptions), (req, res) => {
  console.log("THIS IS REQQQQ IN NODE SERVER: ", req.body);
  // console.log("THIS IS RESSSSS IN NODE SERVER: ", res);
  // child1.send(req.body);
  // child1.send(req.body);
  let data = req.body;
  console.log("THIS IS BODY OF EXPECTED AUDIO IN NODE SERVER: ", req.body);

  createRedisPublisher(data);
  wss.clients.forEach((client) => {
    // console.log("ARE WE HITTING CLIENT>??? ", client)
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({message: data }));
    }
  });
  ws.on('message', function(data) {
    console.log('client received expected audio:', data);
  });
  
  // wss.on('connection', function connection(ws) {
  //   ws.on('message', function message(data) {
  //     console.log('received: %s', data);
  //   });
  
  //   data = [1, 1, 2]
  
  //   ws.send(JSON.stringify(data));
  // });
  res.json({ result: req.body });
});

app.post("/arraysum", cors(corsOptions), (req, res) => {
  child1.send(req.body);
  // arraysum();
  let rustReminder = works.get();
  console.log("we can call rust as node does python stuff", rustReminder);

  // Call CPP function
  // factory._get_new_number(); // direct calling works
  // factory.ccall("get_new_number"); // using ccall etc. also work


  var array = req.body;  
  if(!array){
    console.log("array length undefined");
    res.json({ result: "no array provided" });
    return;
  } else {
    console.log("array from python: ", JSON.stringify(array[0]));
  }
  
  // Calculate sum,5
  var sum = 0;
  for (var i = 0; i < array.length; i++) {
      if (isNaN(array[i])) {
          continue;
      }
      sum += array[i];
  }
  console.log("sum of that array: ", sum);
  
  // Return json response
  res.json({ result: array });
});







