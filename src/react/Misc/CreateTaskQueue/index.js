const createTaskQueue = ()=> {
    const TaskQueue = []
    return {
        push: item => TaskQueue.push(item),
        pop: ()=> TaskQueue.shift(),
        isEmpty: ()=> TaskQueue.length === 0
    }
}

export default createTaskQueue