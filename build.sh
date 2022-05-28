rmdir build/
mkdir build
cd build
em++ ../cpp/hello.cpp ../cpp/fib.cpp -s WASM=1 -s EXPORTED_FUNCTIONS="[_new_fib, _next_val, _main]" -o hello.js || exit 1
mv hello.js ../web/gen/
mv hello.wasm ../web/gen/