const express = require('express');

var request = require('request-promise');
var bodyParser = require('body-parser');
// const path = require('node:path');
const {test} = require('../rust-node');
// const arraySum = require('arraysum.js');

// =============================================
// BUILD
// =============================================
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = 3000


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
// PYTHON INTEROP
// =============================================

async function arraysum() {
  
  // This variable contains the data to send
  var data = {
      array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }

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
        console.log(parsedBody);
          
        // TODO: do something with returned data
        let result;
        result = parsedBody['result'];
        console.log("Result value (array sum) from Python: ", result);
    })
    .catch(function (err) {
        console.log("error: ", err);
    });
}
arraysum();


// =============================================
// RUST INTEROP
// =============================================

let addon=require('../rust-node');
// console.log(addon.hello);
const works = addon;

async function rustInterop_(x, y, z, zz){
  const n = await x;
  console.log("Called on get root// x value from rust: ", x);
  console.log("Called on get root// y value from rust: ", y);
  console.log("Called on get root// z value from rust: ", z);
  console.log("Called on get root// z value from rust: ", zz);

}


// =============================================
// NODE ROUTES 
// =============================================

app.get('/', (req, res) => {
  let x = works.get();
  let y = works.getNum();
  let z = works.getHello();
  let xx = works.timed();
  res.json({x:x,y:y,z:z});
  rustInterop_(x, y, z, zz);  
});

app.post("/arraysum", (req, res) => {
  let rustReminder = works.get();
  console.log("we can call rust as node does python stuff", rustReminder);

  // Retrieve array form post body
  var array = req.body.array;  
  if(!array){
    console.log("array length undefined");
    return;
  } 

  console.log("array from python: ", array);

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
  res.json({ result: sum });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});






