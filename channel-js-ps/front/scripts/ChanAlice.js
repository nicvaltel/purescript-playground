const chanA = newChan();

async function sendToChannel () { // We need to wrap the loop into an async function for this to work
  for (var i = 0; i < 100; i++) {
    msg = 'Alice: ' + i;
    writeChan(chanA, msg);
    console.log("WRITE: " + msg);
    await timer(3000); // then the created Promise can be awaited
  }
}

sendToChannel();


