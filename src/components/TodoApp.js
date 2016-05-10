import React from 'react'
import TodoListFooter from './TodoListFooter'
import AddTodo from '../containers/AddTodo'
import TodoList from '../containers/TodoList'
import Model from '../models/model'

class TodoApp extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      todos: [],
    }

    this._model = new Model()

    this.fetchTodos()
  }

  fetchTodos () {
    this._model.getAll().then((todos) => this.setState({todos}))
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

  render () {
    return (
      <div>
        <section className='todoapp'>
          {/*<header className='header'>
            <AddTodo />
          </header>*/}
          <TodoList
            todos={this.state.todos}
            renameTodo={::this.renameTodo}
            deleteTodo={::this.deleteTodo}
          />
          {/*<TodoListFooter />*/}
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

export default TodoApp
