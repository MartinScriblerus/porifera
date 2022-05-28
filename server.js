const express = require('express');

// const path = require('node:path');
const wasm = require('./src/lib.rs');
const app = express();
const port = 3000

// let addon=require('./index.node');
// console.log(addon.hello);

app.get('/', (req, res) => {
  res.send('Hello from Node!!');
  console.log("WHAT IS WASM? >>> ", wasm);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});






