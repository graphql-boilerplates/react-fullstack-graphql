import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import todoApp from './reducers'
import TodoApp from './components/TodoApp'

import './style.css'

const loggerMiddleware = createLogger()

const store = createStore(
  todoApp,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)

render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
)
