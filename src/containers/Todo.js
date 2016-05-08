import React, { PropTypes } from 'react'
import TodoTextInput from '../components/TodoTextInput'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { deleteTodo, toggleTodo } from '../actions'

class Todo extends React.Component {
  // TODO: only require dispatch and import actions instead of requiring every action dispatching
  static propTypes ={
    todo: PropTypes.object.isRequired,
    renameTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
  }

  state = {
    isEditing: false,
  }

  _handleCompleteChange = (e) => {
    var complete = e.target.checked
    const todo = this.props.todo
    this.props.toggleTodo({todo, complete})
  }

  _handleDestroyClick = () => {
    this._removeTodo()
  }

  _handleLabelDoubleClick = () => {
    this._setEditMode(true)
  }

  _handleTextInputCancel = () => {
    this._setEditMode(false)
  }

  _handleTextInputDelete = () => {
    this._setEditMode(false)
    this._removeTodo()
  }

  _handleTextInputSave = (newText) => {
    this._setEditMode(false)
    const todo = this.props.todo
    this.props.renameTodo({todo, newText})
  }

  _removeTodo () {
    const todo = this.props.todo
    this.props.deleteTodo(todo)
  }

  _setEditMode = (shouldEdit) => {
    this.setState({isEditing: shouldEdit})
  }

  renderTextInput () {
    return (
      <TodoTextInput
        className='edit'
        initialValue={this.props.todo.text}
        onCancel={this._handleTextInputCancel}
        onDelete={this._handleTextInputDelete}
        onSave={this._handleTextInputSave}
      />
    )
  }

  render () {
    return (
      <li
        className={classnames({
          completed: this.props.todo.completed,
          editing: this.state.isEditing,
        })}>
        <div className='view'>
          <input
            checked={this.props.todo.completed}
            className='toggle'
            onChange={this._handleCompleteChange}
            type='checkbox'
          />
          <label onDoubleClick={this._handleLabelDoubleClick}>
            {this.props.todo.text}
          </label>
          <button
            className='destroy'
            onClick={this._handleDestroyClick}
          />
        </div>
        {this.state.isEditing && this.renderTextInput()}
      </li>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    renameTodo: (todo, text) => {
      // TODO: create new renameTodo action
      console.log('renameTodo...')
    },
    deleteTodo: (todo) => {
      console.log('dispatching delete...')
      console.log('id: ' + todo.id)
      dispatch(deleteTodo(todo.id))
    },
    toggleTodo: (todo) => {
      // TODO: use toggleTodo action
      console.log('toggleTodo...')
    },
  }
}

export default connect(
  state => state,
  mapDispatchToProps
)(Todo)
