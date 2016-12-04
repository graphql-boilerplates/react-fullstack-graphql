import React, {PropTypes} from 'react'
import TodoTextInput from '../components/TodoTextInput'

export default class AddTodo extends React.Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
  }

  _handleSave (text) {
    this.props.addTodo({variables: {text}})
      .then(this.props.refetch())
  }

  render () {
    return (
      <TodoTextInput
        className='new-todo'
        onSave={::this._handleSave}
        placeholder='Add...'
      />
    )
  }
}
