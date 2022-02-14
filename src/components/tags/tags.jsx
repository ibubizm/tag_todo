import React from 'react'
import './tags.scss'
import close from '../modal/close.svg'
import { useDispatch } from 'react-redux'
import { deleteTag, filtredTasks } from '../../redux/actions'
import { setCurrentTag } from '../../redux/reducers'

export const Tag = ({ tag }) => {
  const dispatch = useDispatch()

  const toggleTag = (name) => {
    dispatch(setCurrentTag(name))
    dispatch(filtredTasks(name))
  }
  return (
    <div className="tag">
      <div
        onClick={() => toggleTag(tag.name)}
        className="tag__name"
        key={tag.id}
      >
        {tag.name}
      </div>
      <img
        src={close}
        className="tag__delete"
        onClick={() => dispatch(deleteTag(tag.id))}
      />
    </div>
  )
}
