import React from 'react'
import { connect } from 'react-redux'
import { deleteTodo } from '../actions'

let DeleteTodo = ({ dispatch, id }) => {
  return (
    <div>
        <button onClick={e => {
          console.log('Dispatch action')
          dispatch(deleteTodo(id))
        }}>
          Remove Todo
        </button>
    </div>
  )
}
DeleteTodo = connect()(DeleteTodo)

export default DeleteTodo
