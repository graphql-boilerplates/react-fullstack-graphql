import React from 'react'
import TodoStore from '../models/Todo'

const TodoListFooter = (props) => (
  <p className='filter'>
    Show:
    {' '}
    <a onClick={() => TodoStore.filter.set('SHOW_ALL')}>
      All
    </a>
    {', '}
    <a onClick={() => TodoStore.filter.set('SHOW_ACTIVE')}>
      Active
    </a>
    {', '}
    <a onClick={() => TodoStore.filter.set('SHOW_COMPLETED')}>
      Completed
    </a>
  </p>
)

export default TodoListFooter
