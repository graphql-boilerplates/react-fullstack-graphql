import React, { PropTypes } from 'react'
import DeleteTodo from '../containers/DeleteTodo'

const Todo = ({ onClick, completed, text, id }) => (
  <div>
    <li
      style={{
        textDecoration: completed ? 'line-through' : 'none'
      }}
    >
      <span onClick={onClick}>
        {text}
      </span>
      <DeleteTodo
        id={id}
      />
    </li>
  </div>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}

export default Todo
