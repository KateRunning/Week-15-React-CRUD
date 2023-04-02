import React from 'react';
import {useState, useEffect} from 'react';;

export default function Form ({
    handleEvent,
    handleChange,
    setNewTask,
    postTask,
}) {
    return (
        <form onSubmit={(e) => postTask(e)} className="form">
            <h2>New Task</h2>
            <label>Task</label>
            <input
            
            onChange={(e) => (e.target.value)}
            />  
            <button onClick={handleChange}>Add Task</button>    
            </form>
            
    )
};
