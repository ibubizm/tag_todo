const initialState = {
  todos: [],
  tags: [],
  currentTag: null,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TASKS':
      return { ...state, todos: action.payload }
    // [...state.todos, ...action.payload]
    case 'ADD_TASK':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      }
    case 'FILTRED_TASKS':
      let newArr = []
      let arr = action.payload
      arr.forEach((i) => newArr.push(i.task))
      return {
        ...state,
        todos: newArr,
      }
    case 'REMOVE_TASK':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      }

    case 'REMOVE_TAG':
      return {
        ...state,
        tags: state.tags.filter((tag) => tag.id !== action.payload),
      }
    case 'EDIT_TASK':
      const newList = [...state.todos]
      newList.forEach((i) => {
        if (i.id == action.payload.id) {
          i.title = action.payload.text
        }
      })
      return {
        ...state,
        todos: newList,
      }
    case 'GET_TAGS':
      return { ...state, tags: [...state.tags, ...action.payload] }
    case 'ADD_TAG':
      return {
        ...state,
        tags: [...state.tags, action.payload],
      }
    case 'SET_CURRENT_TAG':
      return {
        ...state,
        currentTag: action.payload,
      }
    default:
      return state
  }
}

export const getAllTasks = (list) => ({
  type: 'GET_TASKS',
  payload: list,
})

export const getAllTags = (list) => ({
  type: 'GET_TAGS',
  payload: list,
})

export const addTask = (obj) => ({
  type: 'ADD_TASK',
  payload: obj,
})

export const removeTask = (list) => ({
  type: 'REMOVE_TASK',
  payload: list,
})

export const editTask = (id, text) => ({
  type: 'EDIT_TASK',
  payload: { id, text },
})

export const addTag = (taskId, tag) => ({
  type: 'ADD_TAG',
  payload: { taskId, tag },
})

export const removeTag = (id) => ({
  type: 'REMOVE_TAG',
  payload: id,
})

export const setCurrentTag = (tag) => ({
  type: 'SET_CURRENT_TAG',
  payload: tag,
})

export const filtredTask = (list) => ({
  type: 'FILTRED_TASKS',
  payload: list,
})
