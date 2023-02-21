What is React Fiber: 

what can React Fiber do :  | Pause | Priority | Reuse | Abort |

requestIdleCallback API is the core of react fiber
    The window.requestIdleCallback() method queues a function to be called during a browser's idle periods. 
    syntax: requestIdleCallback(callback)
            requestIdleCallback(callback, options)
            requestIdleCallback(cb(deadline){
                deadline.timeRemaining() // returned value is in ms
            })
    logic:  render 60 frames / second. --> smooth 
            per frame render < 16 ms --> browser hs free time to render. 

