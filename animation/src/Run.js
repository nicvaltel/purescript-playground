

// export const _requestAnimationFrame = requestAnimationFrame;


export function requestAnimationFrame(fn) {
    // return function(window) {
      return function() {
        return window.requestAnimationFrame(fn);
      };
    // };
  }