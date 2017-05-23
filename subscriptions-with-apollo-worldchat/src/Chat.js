import React, { Component } from 'react'
import './Chat.css'
import ChatInput from './ChatInput'
import ChatMessages from './ChatMessages'
import TravellerCount from './TravellerCount'
import { graphql, gql } from 'react-apollo'

const createMessage = gql`
    mutation createMessage($text: String!, $sentById: ID!) {
        createMessage(text: $text, sentById: $sentById) {
            id
            text
            createdAt
            sentBy {
                id
                name
            }
        }
    }
`

const allMessages = gql`
    query allMessages {
        allMessages(last: 100) {
            id
            text
            createdAt
            sentBy {
                id
                name
            }
        }
    }
`


class Chat extends Component {

  state = {
    message: '',
  }

  componentDidMount() {
    // Subscribe to `CREATED`-mutations
    this.createMessageSubscription = this.props.allMessagesQuery.subscribeToMore({
      document: gql`
          subscription {
              Message(filter: {
                mutation_in: [CREATED]
              }) {
                  node {
                      id
                      text
                      createdAt
                      sentBy {
                          id
                          name
                      }
                  }
              }
          }
      `,
      updateQuery: (previousState, {subscriptionData}) => {
        const newMessage = subscriptionData.data.Message.node
        const messages = previousState.allMessages.concat([newMessage])
        return {
          allMessages: messages
        }
      },
      onError: (err) => console.error(err),
    })

  }

  componentDidUpdate(prevProps) {
    if (prevProps.allMessagesQuery.allMessages !== this.props.allMessagesQuery.allMessages && this.endRef) {
      this.endRef.scrollIntoView()
    }
  }

  render() {
    return (
      <div className='Chat'>
        <TravellerCount />
        <ChatMessages
          messages={this.props.allMessagesQuery.allMessages || []}
          endRef={this._endRef}
        />
        {Boolean(this.props.travellerId) &&
          <ChatInput
            message={this.state.message}
            onTextInput={(message) => this.setState({message})}
            onResetText={() => this.setState({message: ''})}
            onSend={this._onSend}
          />
        }
      </div>
    )
  }

  _endRef = (element) => {
    this.endRef = element
  }

  _onSend = () => {
    // console.log('Send message: ', this.state.message, this.props.travellerId)
    this.props.createMessageMutation({
      variables: {
        text: this.state.message,
        sentById: this.props.travellerId,
      }
    })
  }

}

export default graphql(createMessage, {name : 'createMessageMutation'})(
  graphql(allMessages, {name: 'allMessagesQuery'})(Chat)
)
