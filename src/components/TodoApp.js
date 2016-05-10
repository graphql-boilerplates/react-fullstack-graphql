import React from 'react'
import TodoListFooter from './TodoListFooter'
import AddTodo from '../containers/AddTodo'
import TodoList from '../containers/TodoList'

import { connect } from 'react-apollo';

class TodoApp extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      filter: 'SHOW_ALL',
    }
  }

  fetchTodos () {
    this.props.todos.refetch();
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
            renameTodo={this.props.mutations.renameTodo}
            deleteTodo={this.props.mutations.deleteTodo}
            toggleTodo={this.props.mutations.toggleTodo}
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
      renameTodo: (todo, text) => ({
        mutation: gql`
          mutation renameTodo($id: ID!, $text: String!) {
            updateTodo(id: $id, text: $text) { id }
          }
        `,
        variables: {
          id: todo.id,
          text,
        },
      }),
      deleteTodo: (todo) => ({
        mutation: gql`
          mutation deleteTodo($id: ID!) {
            deleteTodo(id: $id) { id }
          }
        `,
        variables: {
          id: todo.id
        },
      }),
      toggleTodo: (todo, complete) => ({
        mutation: gql`
          mutation toggleTodo($id: ID!, $complete: Boolean!) {
            updateTodo(id: $id, complete: $complete) { id }
          }
        `,
        variables: {
          id: todo.id,
          complete,
        },
      })
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
