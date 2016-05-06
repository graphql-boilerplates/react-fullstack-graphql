import React from 'react'
import { connect } from 'react-redux'
import { deleteTodo } from '../actions'

let DeleteTodo = ({ dispatch, id }) => {
  return (
    <div>
      <button
        className='destroy'
        onClick={e => {
          console.log('Dispatch action')
          dispatch(deleteTodo(id))
        }}
      />
    </div>
  )
}
DeleteTodo = connect()(DeleteTodo)

export default DeleteTodo
