import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import TodoTextInput from './TodoTextInput'


class AddTodo extends React.Component {
  static propTypes = {
    onCancel: PropTypes.func,
    onDelete: PropTypes.func,
    onSave: PropTypes.func.isRequired,
  }

  render() {
    return (
      <TodoTextInput
        className='new-todo'
        onSave={this.props.onSave}
        placeholder='Add...'
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSave: (text) => {
      dispatch(addTodo(text))
    }
  }
}

const AddTodoConnection = connect(
  (state => state),
  mapDispatchToProps
)(AddTodo)

export default AddTodoConnection
