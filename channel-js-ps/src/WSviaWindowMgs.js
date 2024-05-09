"use strict";

// Function to send a message to the consumer script
function sendMessageToConsumer(msg) {
    window.postMessage(msg, '*');
}

// // Function to handle incoming messages from the producer script
// function handleMessage(event) {
//     // Check if the message is from the expected source
//     if (event.source !== window) {
//         return;
//     }
//     // Handle the incoming message
//     console.log("Received message:", event.data);
// }


export const _addMessageEventListener = function(func){
    return function(){
        window.addEventListener('message', (event) => {
            if (event.source !== window) {
                return;
            } else {
            return func(event.data)();
            }
        });
    }
}

// init web-socket connection
export const _wsocket = function (url) {
    return function () {
        return (new WebSocket(url));
    };
};

// // Event listener for when the WebSocket connection is opened
// export const _addEventListener = function (socket, eventName, func){
//     return function (){
//         socket.addEventListener(eventName, func);
//     }
// };

// Event listener for when the WebSocket connection is opened
export const _addEventListenerConnectionIsOpen = function (socket) {
    return function () {
        socket.addEventListener('open', (event) => {
            console.log('WebSocket connection opened:', event);
            // Send a welcome message or perform any initial setup here
        });
    }
};

// Event listener for incoming messages from the WebSocket server
export const _addEventListenerMessageRecieved = function (socket) {
    return function () {
        socket.addEventListener('message', (event) => {
            sendMessageToConsumer(event.data);
            // console.log('Received message:', event.data);
        });
    }
};

export const _addEventListenerMessageRecievedSignal = function (socket) {
    return function (signalFunc){
        return function () {
            socket.addEventListener('message', (event) => {
                // sendMessageToConsumer(event.data);
                // console.log('Received message:', event.data);
                signalFunc(event.data)();
            });
        }
    }
};

// Event listener for when the WebSocket connection is closed
export const _addEventListenerConnectionIsClose = function (socket) {
    return function () {
        socket.addEventListener('close', (event) => {
            console.log('WebSocket connection closed:', event);
            // You can handle reconnection or other actions here
        });
    }
};



