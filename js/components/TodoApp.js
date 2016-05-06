import React, { PropTypes } from 'react'
import Footer from './Footer'
import AddTodoConnection from '../containers/AddTodo'
import TodoListConnection from '../components/TodoList'

class TodoApp extends React.Component {

  static propTypes = {

  }

  render () {
    return (
      <div>
        <section className='todoapp'>
          <header className='header'>
            <AddTodoConnection />
          </header>
          <TodoListConnection />
          <Footer />
        </section>
        <footer className='info'>
          <p>
            Click a todo to mark or unmark it as completed
          </p>
        </footer>
      </div>
    )
  }
}

export default TodoApp
