
// Function to calculate sum of array
function arraysum(arr) {
    let sum = 0;
    for (var i = 0; i < arr.length; i++) {
      if (isNaN(arr[i])) {
        continue;
      }
      sum += arr[i];
    }
    return sum;
  }
    
  // Get the command line arguments and
  // parse it to json
  var data = JSON.parse(process.argv[2]);
    
  // Get the required field form the data.
  array = data['array'];
    
  // Calculate the result.
  var sum = arraysum(array);
    
  // Print the data in stringified json
  // format so that we can easily parse
  // it in Python
  const newData = { sum }
  console.log(JSON.stringify(newData));