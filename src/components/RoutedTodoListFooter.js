import {IndexLink, Link} from 'react-router'
import React from 'react'

export default class RoutedTodoListFooter extends React.Component {
  _handleRemoveCompletedTodosPress () {
    // TODO
  }

  render () {
    const numRemainingTodos = 0
    const numCompletedTodos = 0
    return (
      <footer className='footer'>
        <span className='todo-count'>
          <strong>{numRemainingTodos}</strong> item{numRemainingTodos === 1 ? '' : 's'} left
        </span>
        <ul className='filters'>
          <li>
            <IndexLink to='/' activeClassName='selected'>All</IndexLink>
          </li>
          <li>
            <Link to='/active' activeClassName='selected'>Active</Link>
          </li>
          <li>
            <Link to='/completed' activeClassName='selected'>Completed</Link>
          </li>
        </ul>
        {numCompletedTodos > 0 &&
          <span onClick={() => this._handleRemoveCompletedTodosPress()} className='clear-completed'>
            Clear completed
          </span>
        }
      </footer>
    )
  }
}
