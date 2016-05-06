import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    params: state.visibilityFilter
  }
}

const VisibleTodoList = connect(
  mapStateToProps
)(TodoList)

export default VisibleTodoList
