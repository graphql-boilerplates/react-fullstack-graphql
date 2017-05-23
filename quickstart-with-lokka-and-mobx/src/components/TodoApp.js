import React from 'react'
import TodoListFooter from './TodoListFooter'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import TodoStore from '../models/Todo'

class TodoApp extends React.Component {

  constructor (props) {
    super(props)

    TodoStore.fetchAll()
  }

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
