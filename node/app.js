var ref = require("ref");
var ffi = require("ffi");

// typedefs
var myobj = ref.types.void // we don't know what the layout of "myobj" looks like
var myobjPtr = ref.refType(myobj);

var MyLibrary = ffi.Library('libmylibrary', {
  "do_some_number_fudging": [ 'double', [ 'double', 'int' ] ],
  "create_object": [ myobjPtr, [] ],
  "do_stuff_with_object": [ "double", [ myobjPtr ] ],
  "use_string_with_object": [ "void", [ myobjPtr, "string" ] ],
  "delete_object": [ "void", [ myobjPtr ] ]
});