rm build/ -rf
mkdir build
cd build
em++ ../cpp/hello.cpp ../cpp/fib.cpp -s WASM=1 -o hello.js || exit 1
mv hello.js ../web/gen/
mv hello.wasm ../web/gen/