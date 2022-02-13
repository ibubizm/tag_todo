import './App.css'
import React, { useEffect } from 'react'
import { Tasks } from './components/tasks/tasks'
import { Routes, Route, Link } from 'react-router-dom'
import { TaskPage } from './components/task/task'

import { useDispatch } from 'react-redux'
import { fetchData, fetchTags } from './redux/actions'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchData())
    dispatch(fetchTags())
  }, [])

  return (
    <div className="App">
      {/* <Link to="/">Главная</Link> */}
      <Tasks />
      {/* <Routes>
        <Route exact path="/" element={<Tasks />} />
        <Route exact path="/todos/:task_id" element={<TaskPage />} />
      </Routes> */}
    </div>
  )
}

export default App
