import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {useState, useEffect} from 'react';
import Form from './components/Form';
import Table from './components/Table';
import { post } from 'jquery';


function App() {
  const TASKS_ENDPOINT = 'https://6406aea577c1a905a0e079b5.mockapi.io/V1/tasklist';

  const [task, setTask] = useState({
    task: '',
    date: '',
  })

  const [newTask, setNewTask] = useState({
    task: '',
    date: '',
  })

  const [updatedTask, setUpdatedTask] = useState('')

  function handleTask(x) {
    setNewTask({
      ...newTask,
      task: x,
    })
  }

const getTask = () => {
    console.log('get function')

    useEffect(() => {
        fetch(TASKS_ENDPOINT)
          .then((data) => data.json())
          .then((data) => getTask(data))
    }, [])

const postTask = (e) => {
  e.preventDefault()
  console.log('post task')

  fetch(TASKS_ENDPOINT, {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newTask),
  }).then(() => postTask())

  setNewTask({
    task: '',
    date: ''
  })
}

  return (
    <div className="App">
      <Form 
      newTask={newTask}
      getTask={getTask}
      postTask={postTask}
      handleTask={handleTask}
      />
      <Table />
    </div>
  );
}
}

export default App;
