"use strict";

// export const _encodeURIComponent = encodeURIComponent;

export const _wsocket = function (url) {
    return function() {
        return (new WebSocket(url));
    };
  };

// Event listener for when the WebSocket connection is opened
export const _addEventListener1 = function (socket){
    return function (){
        socket.addEventListener('open', (event) => {
            console.log('WebSocket connection opened:', event);
            // Send a welcome message or perform any initial setup here
        });
    }
};

// Event listener for incoming messages from the WebSocket server
export const _addEventListener2 = function (socket){
    return function (){
        socket.addEventListener('message', (event) => {
            const message = event.data;
            console.log('Received message:', message);
            // updateLineTable(message);
        });
    }
};



// Event listener for when the WebSocket connection is closed
export const _addEventListener3 = function (socket){
    return function (){
        socket.addEventListener('close', (event) => {
            console.log('WebSocket connection closed:', event);
            // You can handle reconnection or other actions here
        });
    }
};


// export const _square = function (n) {
//     return n * n;
//   };

// export const diagonal = function (w) {
//     return function (h) {
//       return Math.sqrt(w * w + h * h);
//     };
//   };

