import React from 'react'
import TodoTextInput from './TodoTextInput'
import TodoStore from '../models/Todo'

export default class AddTodo extends React.Component {

  _handleSave (text) {
    TodoStore.addTodo(text)
  }

  render () {
    return (
      <TodoTextInput
        className='new-todo'
        onSave={::this._handleSave}
        placeholder='Add...'
      />
    )
  }
}
