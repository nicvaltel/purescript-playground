"use strict";


function newChan() {
    const hole = { type: 'hole' };
    const chan = {
        readStream: hole,
        writeStream: hole,
        type: 'channel'
    };
    return chan;
}
function writeChan(chan, message) {
    const newHole = { type: 'hole' };
    
    const newItem = {
        msg: message,
        next: newHole,
        type: 'item'
    };
    chan.writeStream = newItem;
    return;
}



function readChan(chan) {
    switch (chan.readStream.type) {
        case 'item':
            const item = chan.readStream;
            chan.readStream = item.next;
            return item.msg;
        case 'hole':
            return null;
    }
}

// Returns a Promise that resolves after "ms" Milliseconds
const timer = ms => new Promise(res => setTimeout(res, ms))
