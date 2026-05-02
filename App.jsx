import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [tasks, setTasks] = useState([])
  const [taskInput, setTaskInput] = useState('')
  const [editId, setEditId] = useState(null)

  // Load tasks from localStorage

  useEffect(() => {

    const savedTasks = JSON.parse(localStorage.getItem('tasks'))

    if(savedTasks){
      setTasks(savedTasks)
    }

  }, [])

  // Save tasks to localStorage

  useEffect(() => {

    localStorage.setItem('tasks', JSON.stringify(tasks))

  }, [tasks])

  // Add or Edit Task

  const addTask = () => {

    if(taskInput.trim() === '') return

    if(editId){

      setTasks(
        tasks.map(task =>
          task.id === editId
            ? { ...task, text: taskInput }
            : task
        )
      )

      setEditId(null)

    } else {

      const newTask = {
        id: Date.now(),
        text: taskInput,
        completed: false
      }

      setTasks([newTask, ...tasks])

    }

    setTaskInput('')
  }

  // Delete Task

  const deleteTask = (id) => {

    setTasks(tasks.filter(task => task.id !== id))

  }

  // Complete Task

  const toggleComplete = (id) => {

    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )

  }

  // Edit Task

  const editTask = (task) => {

    setTaskInput(task.text)
    setEditId(task.id)

  }

  return (

    <div>

      {/* Navbar */}

      <div className="navbar">
        Smart Task Manager
      </div>

      {/* Main Container */}

      <div className="container">

        {/* Input Section */}

        <div className="input-section">

          <input
            type="text"
            placeholder="Enter your task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />

          <button onClick={addTask}>

            {editId ? 'Update Task' : 'Add Task'}

          </button>

        </div>

        {/* Task Counter */}

        <div className="task-count">
          Total Tasks: {tasks.length}
        </div>

        {/* Task List */}

        <div className="task-list">

          {tasks.length === 0 ? (

            <div className="empty">
              No tasks added yet
            </div>

          ) : (

            tasks.map((task) => (

              <div className="task-card" key={task.id}>

                <div>

                  <h2 className={task.completed ? 'completed' : ''}>
                    {task.text}
                  </h2>

                  <p>

                    Status:

                    <span className={task.completed ? 'done' : 'pending'}>

                      {task.completed
                        ? ' Completed'
                        : ' Pending'}

                    </span>

                  </p>

                </div>

                {/* Buttons */}

                <div className="buttons">

                  <button
                    className="complete-btn"
                    onClick={() => toggleComplete(task.id)}
                  >
                    Done
                  </button>

                  <button
                    className="complete-btn"
                    onClick={() => editTask(task)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  )
}

export default App