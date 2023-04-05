import React from 'react';
import {useState, useEffect} from 'react';;

export default function Form ({
    handleTask,
    handleChange,
    setNewTask,
    postTask,
}) {
    return (
        <form onSubmit={(e) => postTask(e)} className="form">
            
            <h2>New Task</h2>
            <label>Task</label>
            <input 
            value={setNewTask.task}
            onChange={(e) => handleChange(e.target.value)}
            />
            <label>Date</label>
            <input
            value={setNewTask.date}
            onChange={(e) => handleTask(e.target.value)}
            />  
            <button>Add Task</button>    
            </form>
            
    )
}

// onClick={handleChange}
// onChange={(e) => (e.target.value)}
// onSubmit={(e) => console.log('test')} 