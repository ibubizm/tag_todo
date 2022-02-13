import React, { useState } from 'react'
import axios from 'axios'
import './tasks.scss'
import { useDispatch, useSelector } from 'react-redux'
import { ListItem } from '../task/listItem'
import { filtredTasks } from '../../redux/actions'
import { Modal } from '../modal/modal'
import { TodoForm } from '../todoForm'
import { useEffect } from 'react'

export const Tasks = () => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const todos = useSelector(({ todos }) => todos)
  const [all, setAll] = useState([])
  const tags = useSelector(({ tags }) => tags)
  const currentTag = useSelector(({ currentTag }) => currentTag)

  const filterTask = (ct) => {
    // let list = []
    // const filterTags = tags.filter((todo) => todo.name === ct)
    // filterTags.forEach((i) => {
    //   all.forEach((y) => {
    //     if (i.taskId == y.id) {
    //       list.push(y)
    //     }
    //   })
    // })
    // dispatch(filtredTask(list))
    console.log(currentTag)
  }

  const onClose = () => {
    setVisible(false)
  }

  // useEffect(() => {
  //   // filterTask(currentTag)
  //   dispatch(filtredTasks(currentTag))
  // }, [currentTag])

  // useEffect(() => {
  //   axios.get(`http://localhost:3001/tasks`).then(({ data }) => {
  //     setAll(data)
  //   })
  // }, [todos])

  return (
    <div>
      <button onClick={() => setVisible(true)}>create</button>
      <div>
        <h1>Всего задач: {todos.length}</h1>
        <div className="tasks">
          {todos.map((i) => (
            <ListItem item={i} key={`${i.id}_${Date.now()}`} />
          ))}
        </div>
      </div>
      {visible && (
        <Modal title={'создать заметку'} onClose={onClose}>
          <TodoForm onClose={onClose} />
        </Modal>
      )}
    </div>
  )
}
