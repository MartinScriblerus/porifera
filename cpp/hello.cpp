#include "emscripten.h"
#include "emscripten/html5.h"
#include "emscripten/val.h"
#include "emscripten/bind.h"
#include "SDL.h"
// #include "faust/dsp/llvm-dsp.h" 

#include "faust/dsp/libfaust.h" 
#include "faust/dsp/dsp.h"
#include "faust/dsp/llvm-dsp.h"

#include <iostream>
#include "fib.h"
#include <vector>
#include <stdio.h>
#include <stdlib.h>

using emscripten::val;






// #include "html5.h"
EM_JS(void, two_alerts, (std::string someName), {
  // alert('hello world from c++ to js!');
  // char str; 
  // name = &str;

  alert(UTF8ToString(someName));      
  document.getElementById("cppToJs").append(UTF8ToString(someName));
});


extern "C" {
  int new_fib();
  int next_val(int fib_instance);
  int get_new_number();
  double render();
  void main_tick();
  int do_math(uint32_t a, uint32_t b) { return a+b; }
  char *get_name(char *nom){
    std::cout << "I am stupid " << nom << std::endl;
    std::string someName(nom);
    std::cout << "??? " << someName << std::endl;

    two_alerts(someName);
    return nom;
  };
}
// Use thread_local when you want to retrieve & cache a global JS variable once per thread.
thread_local const val document = val::global("document");


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

int do_math(int32_t a, int32_t b){
  int32_t c = a + b;
  return c;
}

EMSCRIPTEN_KEEPALIVE
int get_new_number(){
  int fib1 = new_fib();

////////////////////////////////////////////////////////
  
////////////////////////////////////////////////////////

  return next_val(fib1);
}

// EMSCRIPTEN_BINDINGS(events){
//   function("get_new_number",get_new_number);
// }



int render_loop(){
  std::cout << "hitting this!!!" << std::endl;
  return 0;
}





static int quit = 0;

EM_JS(void, update_browser_tick, (clock_t now, clock_t delta, double seconds_elapsed), {
  console.log("Clock Now: ", now);
  console.log("Delta: ", delta);
  console.log("Seconds Elapsed: ", seconds_elapsed);

  return now;
});
clock_t start = clock();

#ifdef __EMSCRIPTEN__
double render()
{
  // std::cout << "IN RENDER" << std::endl;
  // return 0;
  
  // do stuff here
  clock_t now = clock();
  clock_t delta = now - start;
  double seconds_elapsed = static_cast<double>(delta) / CLOCKS_PER_SEC;
  
  if(delta > 100000){
 
    // std::cout << "NOW from c++: " << start << std::endl;
    get_new_number();
    start = now;
    // update_browser_tick(now, delta, seconds_elapsed);
    return start;
  } else {
    // std::cout << 0 << std::endl;
    return 0;
  }
  return EM_TRUE;
  // return now;
}
#else
    return 0;
#endif

#if __EMSCRIPTEN__
void main_tick() {
    render();
#else
    return 0;
#endif
}

void main_loop()
{

#if __EMSCRIPTEN__
    emscripten_set_main_loop(main_tick, -1, 0);
#else
    while (0 == quit)
    {
        main_tick();
    }
#endif
}


int main() {

  get_new_number();
  
  #ifdef __EMSCRIPTEN__
    printf("hi ROWAN!!!\n");
       // Write the code to call the function and get the returned pointer.
    // get_name("Birds on my head");
  #else
    while (1) {
      // one_iter();
      
      // Delay to keep frame rate constant (using SDL).
      SDL_Delay(time_to_next_frame());
    }
  #endif


    main_loop();
  return 0;
}

