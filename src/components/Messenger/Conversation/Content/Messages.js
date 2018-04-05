import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import colours from '../../../../styles/export/colours.css'

import Avatar from '../../../Layout/Avatar'
import Icon from '../../../Layout/Icon'

const MessagesWrapper = styled.div`
  display: flex;
  flex:2;
  flex-direction: column;
  justify-content: space-between;
`

const MessagesList = styled.div`
    padding: 1em;
    overflow-y: auto;
    p {
      color: ${colours.darkGrey};
      font-size: 0.9em;
    }
`

const NewMessage = styled.div`
    min-height: 20px;
    padding: 1em;
    border-top: 1px solid ${colours.mediumGrey};
    font-size: 0.9rem;
    display: flex;
    justify-content: space-between;
    height: 60px;
`

const MessageBox = styled.input`
  border-color: transparent;
  width: 90%;
`

const MessageWrapper = styled.div`
  padding: 0.5em;
  display: flex;

  ${props => props.from === 'sent' && css`
    justify-content: flex-end;
  `}
`

const MessageRead = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
`

const Message = styled.div`
    border-radius: 20px;
    padding: 0.5em 1em;
    display: inline-block;
    font-size: 0.9rem;
    background: ${props => props.from === 'received' ? colours.lightGrey : colours.lightBlue};
    color: ${props => props.from === 'received' ? colours.black : colours.white}
`

class Messages extends React.Component {
  state = {
    messageText: ''
  }

  sendMessage = () => {
    this.props.setLastMessage({
      message: {
        lastMessage: {
          message: this.state.messageText,
          time: new Date(),
        },
        username: this.props.username,
      }
    })
    this.props.addNewMessageToConversation(this.state.messageText)
    this.setState({ messageText: '' })
  }

  render() {
    const { conversation = [], username, toggleModal } = this.props
    const styledConversation = conversation.map((message, i) => (
      <MessageWrapper key={i} from={message.from === "you" ? "sent" : "received"}>
        {message.to === "you" && <Avatar username={username} size="medium" />}
        <Message from={message.from === "you" ? "sent" : "received"}>
            {message.message}
        </Message>
        {message.from === "you" && (
          <MessageRead>
            <Icon name="check-circle" size={0.6} />
          </MessageRead>
        )}
      </MessageWrapper>
    ))

    return (
      <MessagesWrapper>
        <MessagesList>
          {styledConversation.length ? (
            styledConversation
          ) : (
            <p>You have no messages</p>
          )}
        </MessagesList>
        <NewMessage>
          <MessageBox
            onChange={e => this.setState({ messageText: e.target.value })}
            type="text"
            value={this.state.messageText}
            placeholder="Type your message..."
          />
          <button onClick={this.sendMessage}>Send</button>
        </NewMessage>
      </MessagesWrapper>
    )
  }
}

Messages.propTypes = {
  conversation: PropTypes.array,
  toggleModal: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  addNewMessageToConversation: PropTypes.func.isRequired,
}

export default Messages
