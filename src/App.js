import './App.css'
import React, { useEffect } from 'react'
import { Tasks } from './components/tasks/tasks'
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
      <Tasks />
    </div>
  )
}

export default App
