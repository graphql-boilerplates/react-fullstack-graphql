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
export default connect()(DeleteTodo)
