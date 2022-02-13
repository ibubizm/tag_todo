import axios from 'axios'
import {
  getAllTasks,
  removeTask,
  editTask,
  addTask,
  addTag,
  getAllTags,
  removeTag,
  filtredTask,
} from './reducers'

export const fetchData = () => {
  return (dispatch) => {
    axios.get(`http://localhost:3001/tasks`).then(({ data }) => {
      dispatch(getAllTasks(data))
    })
  }
}

export const filtredTasks = (tag) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/tags`, {
        params: {
          name: tag,
          _expand: 'task',
        },
      })
      .then(({ data }) => {
        console.log('filter data', data)
        dispatch(filtredTask(data))
      })
  }
}

export const fetchTags = () => {
  return (dispatch) => {
    axios.get(`http://localhost:3001/tags`).then(({ data }) => {
      dispatch(getAllTags(data))
    })
  }
}

export const createTask = (input) => {
  return (dispatch) => {
    axios
      .post('http://localhost:3001/tasks', {
        title: input,
      })
      .then(({ data }) => {
        dispatch(addTask(data))
      })
  }
}
export const deleteTask = (id) => {
  return (dispatch) => {
    axios.delete(`http://localhost:3001/tasks/${id}`).then(() => {
      dispatch(removeTask(id))
    })
  }
}

export const deleteTag = (id) => {
  return (dispatch) => {
    axios.delete(`http://localhost:3001/tags/${id}`).then(() => {
      dispatch(removeTag(id))
    })
  }
}

export const onEditTask = (id, title) => {
  return (dispatch) => {
    axios.patch(`http://localhost:3001/tasks/${id}`, { title }).then(() => {
      dispatch(editTask(id, title))
    })
  }
}

export const createTag = (taskId, tag) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:3001/tags`, {
        name: tag,
        taskId,
      })
      .then(() => {
        dispatch(addTag(taskId, tag))
      })
  }
}
