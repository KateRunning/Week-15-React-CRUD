import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import Form from './components/Form';
import { deleteTask } from './components/onDelete';
import Table from './components/Table';
// import { post } from 'jquery';
// import DataTable from 'react-data-table-component';


export default function App() {
  const TASKS_ENDPOINT = 'https://6406aea577c1a905a0e079b5.mockapi.io/V1/tasklist';

  const [task, setTask] = useState(''); //input value hooks
  const [date, setDate] = useState(''); //input value hooks
  const [tasks, setTasks] = useState([]) //storing object from 14 & 15

  function handleTask(e) { //updates the state
    setTask(
      // ...newTask, //try newTasks
      e.target.value,
    )
  }

  function handleDate(e) { //updates the state
    setDate(
      e.target.value
    )
  }

  const handleEvent = (data) => {
    console.log(data)
    const newTask = { date, task, id: 0 } //holds state variables, creates object
    fetch(TASKS_ENDPOINT, { //enabling API to receive our info
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask), //format for data to be received
    })
      // setTask(data)
      .then((response) => response.json())
      .then((newTask) => setTasks([...tasks, newTask])) //promise returned. spreads tasks array, adds new object to back
    console.log(tasks)
  }


  useEffect(() => {
    fetch(TASKS_ENDPOINT)
      .then((data) => data.json())
      .then((data) => setTasks(data)) //promise to update state array with new data
  }, [])

  const handleDelete = async (id) => {
    const response = await fetch("/tasks/" + id, {
      method: "DELETE"
    })
    console.log("delete")
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (

    // <ul>
    //   {task.map(t => <li>{t.name} <button onClick={() => onDelete(t.id)}>Delete</button></li>)}
    // </ul>
    <div className="App">
      <input type='text' onChange={handleTask}>

      </input>
      <input type='date' onChange={handleDate}></input>
      <button onClick={handleEvent}>Submit</button>

      {tasks.map((t, i) => <li key={i}>{t.task}{t.date}
        <button onClick={handleDelete}>Delete</button></li>)}

   

      {/* <Form

        
        // onDelete={onDelete}
        handleEvent={handleEvent}
        // createTask={createTask}
        // task={task}
      /> */}
      <Table
      // handleChange={handleChange}
      // task={task}
      // updateTask={updateTask}
      // handleDelete={handleDelete}
      />
      {/* {task.map((id) => (
        <li className="list" key={id}>
          {task}
          <button className='btn btn-danger btn-sm ms-5' id={id} onClick={() => handleDelete(id)} >
            Delete
          </button>
        </li>
      ))} */}
    </div>

  )
}


