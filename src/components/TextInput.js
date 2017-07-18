import keycode from 'keycode'
import PropTypes from 'prop-types'
import React from 'react'

class TextInput extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      isEditing: false,
      text: this.props.initialValue || ''
    }
  }

  onKeyDown = e => {
    if (this.props.onCancel && e.keyCode === keycode.codes.esc) {
      this.props.onCancel()
    } else if (e.keyCode === keycode.codes.enter) {
      this.commitChanges()
    }
  }

  onChange = e => {
    this.setState({ text: e.target.value })
  }

  onBlur = () => {
    if (this.props.commitOnBlur) {
      this.commitChanges()
    }
  }

  commitChanges() {
    const newText = this.state.text.trim()
    if (this.props.onDelete && !newText) {
      this.props.onDelete()
    } else if (this.props.onCancel && newText === this.props.initialValue) {
      this.props.onCancel()
    } else if (newText) {
      this.props.onSave(newText)
      //this.setState({ text: '' })
    }
  }

  render() {
    const { placeholder, className } = this.props

    return (
      <input
        onKeyDown={this.onKeyDown}
        onChange={this.onChange}
        onBlur={this.onBlur}
        value={this.state.text}
        placeholder={placeholder}
        className={className}
      />
    )
  }
}

TextInput.propTypes = {
  commitOnBlur: PropTypes.bool.isRequired,
  initialValue: PropTypes.string,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string
}
TextInput.defaultProps = {
  commitOnBlur: false
}

export default TextInput
