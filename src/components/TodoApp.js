import React from 'react'
import TodoListFooter from './TodoListFooter'
import AddTodo from '../containers/AddTodo'
import TodoList from '../containers/TodoList'

class TodoApp extends React.Component {

  render () {
    return (
      <div>
        <section className='todoapp'>
          <header className='header'>
            <AddTodo />
          </header>
          <TodoList />
          <TodoListFooter />
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
