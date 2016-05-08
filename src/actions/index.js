let nextTodoId = 0
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text,
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter,
  }
}

export const renameTodo = (id, text) => {
  return {
    type: 'RENAME_TODO',
    id,
    text,
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id,
  }
}

export const deleteTodo = (id) => {
  nextTodoId--
  return {
    type: 'DELETE_TODO',
    id,
  }
}
