import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTag, deleteTask, onEditTask } from '../../redux/actions'
import { Modal } from '../modal/modal'
import { Button } from '../button/button'
import { Input } from '../input/input'
import { Tag } from '../tags/tags'

export const ListItem = ({ item }) => {
  const [tags, setTags] = useState([])
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const getTags = async (taskId) => {
    const res = await axios.get(`http://localhost:3001/tags/?taskId=${taskId}`)
    setTags(res.data)
  }

  const changeTask = (e) => {
    e.preventDefault()
    const spl = value.split(' ')
    spl.forEach((i) => {
      if (i[0] === '#') {
        dispatch(createTag(item.id, i))
      }
    })
    dispatch(onEditTask(item.id, value))
    setValue('')
  }

  useEffect(() => {
    getTags(item.id)
  }, [])

  return (
    <div className="item">
      <div className="item__content">
        <div>{item.title}</div>
        <div className="item__btns">
          <Button className="btn blue" onClick={() => setVisible(true)}>
            change
          </Button>
          <Button
            className="btn red"
            onClick={() => dispatch(deleteTask(item.id))}
          >
            del
          </Button>
        </div>
      </div>
      <div className="tags">
        {tags.map((tag) => (
          <Tag key={tag.id} tag={tag} />
        ))}
      </div>
      {visible && (
        <Modal onClose={() => setVisible(false)} title={'изменить заметку'}>
          <form onSubmit={changeTask}>
            <Input
              className="inp__form"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
            />
            <Button className="btn blue">create</Button>
          </form>
        </Modal>
      )}
    </div>
  )
}
