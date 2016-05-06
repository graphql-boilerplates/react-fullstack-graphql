import React, { PropTypes } from 'react'
import TodoConnection from './Todo'
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'

class TodoList extends React.Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
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
      .filter(this._filterTodos)
      .reverse()
      .map((todo) =>
        <TodoConnection
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

const mapStateToProps = (state) => ({
  todos: state.todos,
  params: {status: state.visibilityFilter},
})

export default connect(mapStateToProps)(TodoList)
