import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTask, createTag } from '../redux/actions'
import { Button } from './button/button'
import { Input } from './input/input'

export const TodoForm = ({ onClose }) => {
  const dispatch = useDispatch()
  const [input, setInput] = useState('')

  const handleChange = (e) => {
    setInput(e.currentTarget.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(createTask(input))
    setInput('')
    onClose()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        className={'inp__form'}
        value={input}
        type="text"
        onChange={handleChange}
      />
      <Button className={'btn blue'}>Сохранить</Button>
    </form>
  )
}
