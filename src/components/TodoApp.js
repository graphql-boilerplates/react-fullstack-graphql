import React, {PropTypes} from 'react'
import TodoListFooter from './TodoListFooter'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import gql from 'graphql-tag'

import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

class TodoApp extends React.Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    renameTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
  }

  render () {
    return (
      <div>
        <section className='todoapp'>
          <header className='header'>
            <AddTodo
              addTodo={this.props.addTodo}
              refetch={this.props.data.refetch}
            />
          </header>
          <TodoList
            todos={this.props.data.allTodoes || []}
            filter={this.props.filter}
            renameTodo={this.props.renameTodo}
            deleteTodo={this.props.deleteTodo}
            toggleTodo={this.props.toggleTodo}
            refetch={this.props.data.refetch}
            loading={this.props.data.loading}
          />
          <TodoListFooter setFilter={this.props.setFilter} />
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

const addTodoMutation = gql`
  mutation addTodo($text: String!) {
    createTodo(complete: false, text: $text) { id }
  }
`

const renameTodoMutation = gql`
  mutation renameTodo($id: ID!, $text: String!) {
    updateTodo(id: $id, text: $text) { id }
  }
`

const deleteTodoMutation = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) { id }
  }
`

const toggleTodoMutation = gql`
  mutation toggleTodo($id: ID!, $complete: Boolean!) {
    updateTodo(id: $id, complete: $complete) { id }
  }
`

const allTodoesQuery = gql`
  query allTodoes {
    allTodoes {
      id
      complete
      text
    }
  }
`

const withQueryAndMutations = graphql(addTodoMutation, {name: 'addTodo'})(
  graphql(renameTodoMutation, {name: 'renameTodo'})(
    graphql(deleteTodoMutation, {name: 'deleteTodo'})(
      graphql(toggleTodoMutation, {name: 'toggleTodo'})(
        graphql(allTodoesQuery)(TodoApp)
      )
    )
  )
)

const TodoAppLinked = connect(
  (state) => ({ filter: state.filter }),
  (dispatch) => ({
    setFilter (filter) {
      dispatch({
        type: 'SET_FILTER',
        filter,
      })
    },
  }),
)(withQueryAndMutations)

export default TodoAppLinked
