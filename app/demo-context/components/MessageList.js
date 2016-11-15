import React, {Component} from 'react';
import Message from './Message.js';

class MessageList extends Component {
  getChildContext() {
    return {
      colorBg: "#0ff",
      colorText: "#f00",
    };
  }

  render() {
    const children = this.props.messages.map((message) =>
      <Message text={message.text} />
    );
    return <div>{children}</div>;
  }
}

MessageList.childContextTypes = {
  colorBg: React.PropTypes.string,
  colorText: React.PropTypes.string
};

export default MessageList;
