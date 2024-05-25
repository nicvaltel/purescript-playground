//board
let board;
let boardWidth = 360;
let boardHeight = 576;
let visibleCtx;
let bufferCanvas;
let bufferCtx;

//doodler
let doodlerWidth = 46;
let doodlerHeight = 46;
let doodlerX = boardWidth/2 - doodlerWidth/2;
let doodlerY = boardHeight*7/8 - doodlerHeight;
let doodlerImg;

let doodler = {
    img : null,
    x : doodlerX,
    y : doodlerY,
    width : doodlerWidth,
    height : doodlerHeight
}

//physics
let velocityX = -8; 
let velocityY = -3; //doodler jump speed

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    visibleCtx = board.getContext("2d"); //used for drawing on the board


    bufferCanvas = document.createElement('canvas');
    bufferCanvas.width = board.width;
    bufferCanvas.height = board.height;
    bufferCtx = bufferCanvas.getContext('2d');


    // var bufferCanvas = document.createElement('canvas');
    // bufferCanvas.width = canvas.width;
    // bufferCanvas.height = canvas.height;
    // var bufferCanvasCtxMaybe = bufferCanvas.getContext('2d');
    // var bufferCanvasCtx;
    // if (bufferCanvasCtxMaybe !== null) {
    //     bufferCanvasCtx = bufferCanvasCtxMaybe;
    // }
    // else {
    //     throw new Error("draw-board initGame: bufferCanvasCtxMaybe in null");
    // }


    //load images
    doodlerImg = new Image();
    doodlerImg.src = "images/1_Billiard_Ball@72p@72p.png";
    doodler.img = doodlerImg;
    doodlerImg.onload = function() {
      bufferCtx.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);
    }

    requestAnimationFrame(update);
}

function update() {
    
    

    //doodler
    doodler.x += velocityX;
    if (doodler.x > boardWidth) {
        doodler.x = 0;
    } else if (doodler.x + doodler.width < 0) {
      doodler.x = boardWidth;
    }

    

    doodler.y += velocityY;
    if (doodler.y > boardHeight) {
      doodler.y = 0;
    } else if (doodler.y + doodler.height < 0) {
      doodler.y = boardHeight;
    }

    bufferCtx.clearRect(0, 0, board.width, board.height);
    visibleCtx.clearRect(0, 0, board.width, board.height);

    bufferCtx.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);
    visibleCtx.drawImage(bufferCanvas, 0, 0);

    requestAnimationFrame(update);
}
