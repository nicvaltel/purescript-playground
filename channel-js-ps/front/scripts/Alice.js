// Alice - Producer.js

// // Function to send a message to the consumer script
// function sendMessageToConsumer(msg) {
//     window.postMessage(msg, '*'); 
// }
// sendMessageToConsumer("Hello from Producer1!");
// sendMessageToConsumer("Hello from Producer2!");
// sendMessageToConsumer("Hello from Producer3!");


var scriptsExchangeChannel = [];

// Returns a Promise that resolves after "ms" Milliseconds
const timer = ms => new Promise(res => setTimeout(res, ms))

async function sendToChannel () { // We need to wrap the loop into an async function for this to work
  for (var i = 0; i < 100; i++) {
    console.log('Alice: ' + i);
    await timer(1000); // then the created Promise can be awaited
  }
}

sendToChannel();
