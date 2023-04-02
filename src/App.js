import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {useState, useEffect} from 'react';
import Form from './components/Form';
import Table from './components/Table';
import { post } from 'jquery';
import DataTable from 'react-data-table-component';


function App() {
  const TASKS_ENDPOINT = 'https://6406aea577c1a905a0e079b5.mockapi.io/V1/tasklist';

  const [task, setTask] = useState('')
    // task: '',
    // date: '',

  const [newTask, setNewTask] = useState([])
    // task: '',
    // date: '',

  const [updatedTask, setUpdatedTask] = useState('')

  const handleChange = (e) => {
    setTask(e.target.value)
 }  

const handleEvent = () => {
    setTask([])
    setNewTask([...newTask, task])
}

function handleDelete(id) {
  const taskCopy = [...newTask]
  taskCopy.splice(id, 1);
  setNewTask(taskCopy)
};

    useEffect(() => {
        fetch(TASKS_ENDPOINT)
          .then((data) => data.json())
          .then((data) => handleEvent(data))
    }, [])

const getTask = () => {
  console.log('get function')

  fetch(TASKS_ENDPOINT)
  .then((data) => data.json())
  .then((data) => setTask())
}

const postTask = (e) => {
  e.preventDefault()
  console.log('post task')

  fetch(TASKS_ENDPOINT, {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newTask),
  }).then(() => getTask())

  // setNewTask({
  //   task: '',
  //   date: ''
  // })
}

  return (
    <div className="App">
      <Form 
      newTask={newTask}
      handleEvent={handleEvent}
      postTask={postTask}
      />
      <Table />
    </div>
  );
}


export default App;
