import React, { Component } from 'react'

export default class InputName extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={e => {
            this.setState({ name: e.target.value })
          }}
        />
        <button
          onClick={() => {
            this.props.onSubmit(this.state.name)
          }}
        >
          Send
        </button>
      </div>
    )
  }
}
