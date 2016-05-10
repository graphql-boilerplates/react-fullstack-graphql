import React from 'react'
import TodoListFooter from './TodoListFooter'
import AddTodo from '../containers/AddTodo'
import TodoList from '../containers/TodoList'
import Model from '../models/model'

import { connect } from 'react-apollo';

class TodoApp extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      filter: 'SHOW_ALL',
    }

    this._model = new Model()
  }

  fetchTodos () {
    this.props.todos.refetch();
  }

  renameTodo (todo, text) {
    this._model.renameTodo(todo.id, text)
    .then((todo) => {
      this.fetchTodos()
    })
  }

  deleteTodo (todo) {
    this._model.deleteTodo(todo.id)
    .then((todo) => {
      this.fetchTodos()
    })
  }

  toggleTodo (todo, complete) {
    this._model.toggleCompleteStatus(todo.id, complete)
    .then((todo) => {
      this.fetchTodos()
    })
  }

  setFilter (filter) {
    this.setState({filter})
  }

  render () {
    return (
      <div>
        <section className='todoapp'>
          <header className='header'>
            <AddTodo addTodo={this.props.mutations.addTodo} />
          </header>
          <TodoList
            todos={this.props.todos.allTodos || []}
            filter={this.state.filter}
            renameTodo={::this.renameTodo}
            deleteTodo={::this.deleteTodo}
            toggleTodo={::this.toggleTodo}
          />
          <TodoListFooter setFilter={::this.setFilter} />
        </section>
        <footer className='info'>
          <p>
            Double-click to edit a todo
          </p>
        </footer>
      </div>
    )
  }
}

const todoFragment = `
  id
  complete
  text
`

const TodoAppLinked = connect({
  mapMutationsToProps() {
    return {
      addTodo: (text) => ({
        mutation: gql`
          mutation addTodo($text: String!) {
            createTodo(complete: false, text: $text) { id }
          }
        `,
        variables: { text },
      }),
    };
  },
  mapQueriesToProps() {
    return {
      todos: {
        query: gql`
          {
            allTodos {
              ${todoFragment}
            }
          }
        `,
        forceFetch: false,
        pollInterval: 1000,
      },
    };
  },
})(TodoApp);

export default TodoAppLinked
