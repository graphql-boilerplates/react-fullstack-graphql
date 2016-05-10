import React, { PropTypes } from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    renameTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    //params: PropTypes.object.isRequired,
  }

  state = {
    todos: this.props.todos,
  }

  _filterTodos = (todo) => (
    this.props.params.status === 'active'
    ? todo.complete !== true
    : this.props.params.status === 'completed'
      ? todo.complete === true
      : true
    )

  renderTodos () {
    // TODO: inject todo
    return this.props.todos
      //.filter(this._filterTodos)
      .reverse()
      .map((todo) =>
        <Todo
          key={todo.id}
          todo={todo}
          renameTodo={this.props.renameTodo}
          deleteTodo={this.props.deleteTodo}
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
