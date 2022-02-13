import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { createTag, deleteTag, onEditTask } from '../../redux/actions'
import './task.scss'

export const TaskPage = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const [item, setItem] = useState({})
  const [tags, setTags] = useState([])
  const { task_id } = useParams()
  const todos = useSelector(({ todos }) => todos)

  const fetchData = async () => {
    // todos.forEach((i) => {
    //   if (i.id == task_id) {
    //     setItem(i)
    //   }
    // })
    await axios
      .get(`http://localhost:3001/tasks/${task_id}`)
      .then(({ data }) => {
        setItem(data)
      })
  }

  const fetchTags = async () => {
    const res = await axios.get(`http://localhost:3001/tags?taskId=${task_id}`)
    setTags(res.data)
  }

  const removeTag = (id) => {
    dispatch(deleteTag(id))
  }

  useEffect(() => {
    fetchData()
    fetchTags()
  }, [])

  const changeTask = () => {
    dispatch(onEditTask(task_id, value))
    const spl = value.split(' ')
    spl.forEach((i) => {
      if (i[0] === '#') {
        dispatch(createTag(task_id, i))
      }
    })
    setValue('')
  }

  return (
    <div>
      <h1>{item.title}</h1>
      <div>{item.text}</div>
      <div className="change__block">
        <label htmlFor="change_task">изменить</label>
        <input
          id="change_task"
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button onClick={changeTask}>ass</button>
      </div>
      <div className="tags" style={{ display: 'flex' }}>
        {tags.length !== 0 ? (
          tags.map((i) => (
            <div
              className="tag"
              style={{ border: '1px solid black' }}
              key={Math.random()}
            >
              {i.name}
              <span onClick={() => removeTag(i.id)}>удалить</span>
            </div>
          ))
        ) : (
          <div>нет тегов</div>
        )}
      </div>
    </div>
  )
}

// const changeTask = async () => {
// const tagsList = [...tags]
// await axios.patch(`http://localhost:3001/tasks/${task_id}`, { text: value })
// const newObj = { ...item }
// newObj.text = value
// const spl = newObj.text.split(' ')
// spl.forEach((i) => {
//   if (i[0] === '#' && !tagsList.includes(i)) {
//     tagsList.push(i)
//   }
// })
// addTag(tagsList)
// setItem(newObj)
// setValue('')
// onEditTask(item.id, value)
// }
