import Model from '../models/model'

const model = new Model()

const todo = (state, action) => {
  switch (action.type) {
    // TODO: use thunk
    case 'ADD_TODO':
      model.addTodo(
        {complete: false, text: action.text, id: action.id},
        todos => {
          todos.then(t => {
            return t
          })
        }
      )

      return {
        id: action.id,
        text: action.text,
        completed: false,
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }

      return Object.assign({}, state, {
        completed: !state.completed,
      })
    case 'RENAME_TODO':
    // TODO: use thunk
      if (state.id !== action.id) {
        return state
      }

      model.renameTodo(
        {complete: false, text: action.text, id: action.id},
        todo => {
          todos
        }
      )

      return Object.assign({}, state, {
        text: action.text,
      })
    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      console.log(state)
      return [
        ...state,
        todo(undefined, action),
      ]
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action),
      )
    case 'RENAME_TODO':
      return state.map(t =>
        todo(t, action),
      )
    case 'DELETE_TODO':
      console.log(state.length)
      var newState = [
        ...state.slice(0, action.id),
        ...state.slice(action.id + 1),
      ]
      console.log(newState.length)
      return newState
    default:
      return state
  }
}

export default todos
