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

  const [task, setTask] = useState([
    {
      task: '',
      date: '',
    }
  ])
  const [tasks, setTasks] = useState(
    {
      task: [],
      date: [],
    }
  )
  const [newTask, setNewTask] = useState({
    task: '',
    date: '',
  })

  // const [updatedTask, setUpdatedTask] = useState('')

  function handleTask(x) {
    setNewTask({
      ...newTask, //try newTasks
      task: x,
    })
  }

  const handleChange = (e) => {
    console.log('handle change')
    setTask(e.target.value)
  }

  const handleEvent = (data) => {
    console.log(data)
    setTask(data)
    setNewTask([...newTask, task])
  }

  const handleDelete = (id) => {
    console.log('delete')
    fetch(`${TASKS_ENDPOINT}/${id}`, {
      method: 'DELETE',
    }).then(() => getTask())
  };

  useEffect(() => {
    fetch(TASKS_ENDPOINT)
      .then((data) => data.json())
      .then((data) => handleEvent(data))
  }, [])

  const getTask = () => {  //might be repetitive
    console.log('get function')

    fetch(TASKS_ENDPOINT)
      .then((data) => data.json())
      .then((data) => setTask(data))
  }

  const postTask = (e) => {
    // e.preventDefault()
    console.log('post task')

    fetch(TASKS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    }).then(() => getTask())

    setNewTask({
      task: '',
      date: ''
    })
    
  }
  // useEffect(() => {
  //   const refreshTasks = async () => {
  //     const response = await fetch(TASKS_ENDPOINT)
  //     const data = await response.json()
  //     setTask(data)
  //   }
  //   refreshTasks()
  // }, [])

  const onDelete = async (id) => {
    await deleteTask(id)
    setTask(task.filter(t => t.id !== id))
  }

  const createTask = async (newTask) => {
    const response = await fetch(TASKS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    })
    const createdTask = await response.json()
    setTask(task.concat(createdTask))
    createTask()
  }

  const updateTask = async (updatedTask) => {
    fetch(TASKS_ENDPOINT + updatedTask.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask)

    })
    // setTask(task.map(t => t.id === updatedTask.id ? updatedTask : t))
  }

  return (
    // <ul>
    //   {task.map(t => <li>{t.name} <button onClick={() => onDelete(t.id)}>Delete</button></li>)}
    // </ul>
    <div className="App">
      <Form
        handleTask={handleTask}
        // onDelete={onDelete}
        handleEvent={handleEvent}
        createTask={createTask}
        task={task}
      />
      <Table
      handleChange={handleChange}
      task={task}
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


