# porifera
A project in process

currently, node is connected to c++ modules & a python server (hit "to_node") through websockets and redis pubsub

## Enter rust/python env
cd rust-node

## Update rust-neon
npm run build --release

## Start virtual environment
source .env/bin/activate

## Run python server
python app.py 

## Build emscripten (cpp -> wasm)
## Run node server 
### open a new terminal...
./build.sh