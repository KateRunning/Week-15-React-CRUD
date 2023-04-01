import React from 'react';

export default function Form ({
    handleTask,
    getTask,
    postTask,
}) {
    return (
        <form onSubmit={(e) => postTask(e)} className="form">
            <h2>New Task</h2>
            <label>Task</label>
            <input
            value={newTask.task}
            onChange={(e) => handleTask(e.target.value)}
            />  
            <button onClick={handleTask}>Add Task</button>    
            </form>
            
    )
};
