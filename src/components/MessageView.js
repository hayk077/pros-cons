import React from 'react';
import PropTypes from 'prop-types';

import MessageInput from '../containers/MessageInput';

const MessageView = props => {
  const { messages, store, focus, counter, messageType } = props;

  let messageList = '';
  if (messages.length) {
    messageList = messages.map((message, index) => {
      return (
        <MessageInput
          message={message}
          key={index}
          index={index}
          store={store}
          focus={focus}
          counter={counter}
          messageType={messageType}
        />
      );
    });
  }

  return <div className="ui">{messageList}</div>;
};

MessageView.propTypes = {
  store: PropTypes.object.isRequired,
  messageType: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
  focus: PropTypes.number.isRequired,
  messages: PropTypes.array
};

export default MessageView;
