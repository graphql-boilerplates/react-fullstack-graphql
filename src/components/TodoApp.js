import React, { PropTypes } from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import TodoList from '../components/TodoList'

class TodoApp extends React.Component {

  static propTypes = {

  }

  render () {
    return (
      <div>
        <section className='todoapp'>
          <header className='header'>
            <AddTodo />
          </header>
          <TodoList />
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
