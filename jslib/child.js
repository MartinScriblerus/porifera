const { fork } = require('child_process');

// here would one initialize this child
// this will be executed only once
console.log('[Child]', 'initalize');



// here one listens for new tasks from the parent
process.on('message', function(messageFromParent) {
    
    //do some intense work here
    console.log('[Child]', messageFromParent);

    if(messageFromParent == 'Hello') process.send('Hello to you too ... I am the python child process :)');
    else process.send('[Python Child]: I just got some data');
})

