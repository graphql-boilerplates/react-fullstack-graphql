import React, { PropTypes } from 'react'
import TodoTextInput from '../components/TodoTextInput'
import classnames from 'classnames'

export default class Todo extends React.Component {
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
    this.props.toggleTodo(this.props.todo, complete)
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
    this.props.renameTodo(this.props.todo, newText)
  }

  _removeTodo () {
    this.props.deleteTodo(this.props.todo)
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
          completed: this.props.todo.complete,
          editing: this.state.isEditing,
        })}>
        <div className='view'>
          <input
            checked={this.props.todo.complete}
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
