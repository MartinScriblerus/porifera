// #include <iostream>
#include "fib.h"
#include <vector>
#include <stdio.h>

extern "C" {
 int new_fib();
 int next_val(int fib_instance);
}
auto instances = std::vector<Fib>();
int next_val(int fib_instance) {
 return instances[fib_instance].next();
}
int new_fib() {
 instances.push_back(Fib());
 return instances.size() - 1;
}

int main() {
 int fib1 = new_fib();
 next_val(fib1);
 printf("hi\n");
 return 0;
}