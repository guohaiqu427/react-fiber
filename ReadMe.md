# What is React Fiber: 
    a virtual dom diff algorithm

    older version :  use loops and self calling functions(can not be stopped) --> result in main thread been occupied, other tasks can not be done.
    fiber: only use loop | requestIdleCallback | samll tasks |

# what can React Fiber do :  | Pause | Priority | Reuse | Abort |

# requestIdleCallback
requestIdleCallback API is the core of react fiber
    The window.requestIdleCallback() method queues a function to be called during a browser's idle periods. 
    syntax: requestIdleCallback(callback)
            requestIdleCallback(callback, options)
            requestIdleCallback(cb(deadline){
                deadline.timeRemaining() // returned value is in ms
            })
    logic:  render 60 frames / second. --> smooth 
            per frame render < 16 ms --> browser hs free time to render. 

# How React Fiber work
    dom compare (two parts)
    1. virtual dom compare (can be stopped)
    2. dom update (can not be stopped)

    JSX --> react.createElement() --> virtualDom Object --> create fiber object --> store fiber object in array --> manipulate actual dom

    fiber object: 
    {
        type
        props
        stateNode 
        tag
        effects
        effectTag
        parent 
        child
        sibling
        alternate
    }