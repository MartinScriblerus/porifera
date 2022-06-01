rmdir build/
mkdir build
cd build
em++ ../cpp/hello.cpp ../cpp/fib.cpp -s WASM=1 -s EXPORTED_FUNCTIONS="[_new_fib, _next_val, _get_new_number, _do_math, _get_name, _main]" -sEXPORTED_RUNTIME_METHODS=ccall,cwrap -o hello.js || exit 1
mv hello.js ../web/gen/
mv hello.wasm ../web/gen/
node ../lib/server.js


# configure FFMpeg with Emscripten
ARGS=(
  --target-os=none        # use none to prevent any os specific configurations
  --arch=x86_32           # use x86_32 to achieve minimal architectural optimization
  --enable-cross-compile  # enable cross compile
  --disable-x86asm        # disable x86 asm
)
emconfigure ./configure "${ARGS[@]}"