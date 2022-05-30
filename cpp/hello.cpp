// #include <iostream>
#include "fib.h"
#include <vector>
#include <stdio.h>
#include "emscripten.h"

// #include "html5.h"

extern "C" {
 int new_fib();
 int next_val(int fib_instance);
inline uint32_t do_math(uint32_t a, uint32_t b) { return a+b; }
}

// Main Emscripten Loop
// Our "main loop" function. This callback receives the current time as
// reported by the browser, and the user data we provide in the call to
// emscripten_request_animation_frame_loop().
EM_BOOL one_iter(double time, void* userData) {
  // Can render to the screen here, etc.
  puts("one iteration");
  // Return true to keep the loop running.
  return EM_TRUE;
}

auto instances = std::vector<Fib>();

int next_val(int fib_instance) {
 return instances[fib_instance].next();
}

int new_fib() {
 instances.push_back(Fib());
 return instances.size() - 1;
}

EM_JS(void, two_alerts, (), {
  alert('hai');
  alert('bai');
});

int main() {
 int fib1 = new_fib();
 next_val(fib1);

 #ifdef __EMSCRIPTEN__
  // Receives a function to call and some user data to provide it.
  // emscripten_request_animation_frame_loop(one_iter, 0);
 
#else
  while (1) {
    one_iter();
     printf("hi ROWAN!!!\n");
    // Delay to keep frame rate constant (using SDL).
    SDL_Delay(time_to_next_frame());
  }
#endif
 return 0;
}