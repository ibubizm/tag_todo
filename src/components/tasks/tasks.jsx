import React, { useState } from 'react'
import './tasks.scss'
import { useDispatch, useSelector } from 'react-redux'
import { ListItem } from '../task/listItem'
import { fetchData, filtredTasks } from '../../redux/actions'
import { Modal } from '../modal/modal'
import { TodoForm } from '../todoForm'

export const Tasks = () => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const todos = useSelector(({ todos }) => todos)

  const onClose = () => {
    setVisible(false)
  }

  return (
    <div>
      <button className="btn gray" onClick={() => setVisible(true)}>
        создать заметку
      </button>
      <button className="btn gray" onClick={() => dispatch(fetchData())}>
        все заметки
      </button>
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
