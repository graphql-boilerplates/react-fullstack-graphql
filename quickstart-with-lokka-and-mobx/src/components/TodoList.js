import React from 'react'
import Todo from './Todo'
import TodoStore from '../models/Todo'
import {observer} from 'mobx-react'

@observer
export default class TodoList extends React.Component {
  _filterTodos = (todo) => (
    TodoStore.filter.get() === 'SHOW_ACTIVE'
    ? todo.complete !== true
    : TodoStore.filter.get() === 'SHOW_COMPLETED'
      ? todo.complete === true
      : true
    )

  renderTodos () {
    return TodoStore.todos
      .filter(this._filterTodos)
      .reverse()
      .map((todo) =>
        <Todo
          key={todo.id}
          todo={todo}
        />
      )
  }

  render () {
    return (
      <section className='main'>
        <ul className='todo-list'>
          {this.renderTodos()}
        </ul>
      </section>
    )
  }
}
