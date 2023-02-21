import {createTaskQueue,arrified} from "../Misc"
const taskQueue = createTaskQueue()
let subTask = null

export const render = (elemment, dom)=> {
    //1. add task to task queue
        // task: create fiber object using virtualDOM object
        // task queue: [task, task ....]
    //2. execute task when idle

    // find all virtualDOM and use that to create fiber object, 
    // therefore, we need parent and child
    taskQueue.push({
        dom,  // parent 
        props: {children: elemment} // child
    })
    requestIdleCallback(performTask)
}


const performTask = (deadline) => {
    workLoop(deadline)

    if(subTask || !taskQueue.isEmpty()){
        requestIdleCallback(performTask)
    }
}
const workLoop = deadline => {
    if(!subTask){
        subTask = getFirstTask()
        console.log(subTask)
    }
    while( subTask && deadline.timeRemaining()>1){
       subTask =  executeTask(subTask)
    }
}
const getFirstTask = () => {
    const task = taskQueue.pop()
    console.log(task)
    // return fiber object of outter node
    return {
        props: task.props,
        stateNode: task.dom,
        tag: "host_root",
        effects: [],
        child: null
    }
}
const executeTask = fiber => {
    reconcileChildren(fiber, fiber.props.children)
    console.log(fiber)
}

const reconcileChildren =  (fiber, children) => {
    // children --> array 
    const arrifiedChildren = arrified(children)

    let index = 0
    let numberOfElements = arrifiedChildren.length
    let element = null
    let newFiber = null 
    let prevFiber =null

    while (index < numberOfElements) {
        element = arrifiedChildren[index]
        console.log(element)
        newFiber = {
            type: element.type,
            props: element.props,
            tag: "host_component",
            effects:[],
            effectTag: "placement",
            stateNode: null,
            parent: fiber,
        }
        if(index === 0 ) {
         fiber.child = newFiber
        }else{
            prevFiber.sibling = newFiber
        }
        prevFiber = newFiber
        index++
    }
}
