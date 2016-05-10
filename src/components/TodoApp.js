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
      filter: 'SHOW_ALL',
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

  toggleTodo (todo, complete) {
    this._model.toggleCompleteStatus(todo.id, complete)
    .then((todo) => {
      this.fetchTodos()
    })
  }

  addTodo (text) {
    this._model.addTodo(text)
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
            <AddTodo addTodo={::this.addTodo} />
          </header>
          <TodoList
            todos={this.state.todos}
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

export default TodoApp
