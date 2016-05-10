import Model from '../models/model'

const model = new Model()

let nextTodoId = 0

export const receiveTodos = (todos) => {
  console.log('receive todo')
  return {
    type: 'RECEIVE_TODOS',
    todos,
  }
}


export const addTodo = (text) => {
  console.log('add todo')
  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    // dispatch(requestPosts(subreddit))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return model.addTodo({text, complete: false}, (todos) => dispatch(receiveTodos(todos)))
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
