
async function readFromChannel () { // We need to wrap the loop into an async function for this to work
    for (var i = 0; i < 100000; i++) {
      msg = readChan(chanA);
      console.log("READ: " + msg);
      console.log(chanA);
      await timer(1000); // then the created Promise can be awaited
    }
  }
  
  readFromChannel();