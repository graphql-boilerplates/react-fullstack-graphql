import React, { Component} from 'react'
import './ChatMessages.css'
import ChatMessage from './ChatMessage'

class ChatMessages extends Component {

  render() {
    return (
      <div className='ChatMessages'>
        {this.props.messages.map((message, i) => {
          return (<ChatMessage
            key={i}
            message={message.text}
            username={message.sentBy ? message.sentBy.name : 'Anonymous'}
            time={message.createdAt}
          />)
        })}
        <div style={ {float:"left", clear: "both"} }
             ref={el => { this.props.endRef(el) }}></div>
      </div>
    )
  }

}

export default ChatMessages

ChatMessages.propTypes = {

}
