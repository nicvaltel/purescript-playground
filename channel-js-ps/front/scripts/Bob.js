// Bob Consumer.js

// // Function to handle incoming messages from the producer script
// function handleMessage(event) {
//     if (event.source !== window) {
//         return;
//     }
//     console.log("Received message:", event.data);
// }

// window.addEventListener("message", handleMessage);


function arrayIsNotEmpty(array){
    return (Array.isArray(array) && array.length);
}

async function revieveFromChannel () { // We need to wrap the loop into an async function for this to work
  while(true) {
    if (arrayIsNotEmpty (scriptsExchangeChannel)){
        console.log(scriptsExchangeChannel.pop());
    } else {}
    await timer(20); // then the created Promise can be awaited
  }
}

revieveFromChannel();