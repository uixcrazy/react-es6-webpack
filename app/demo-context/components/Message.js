import React, {Component} from 'react';
import Button from './Button.js';

class Message extends Component {
  render() {
    return (
      <div>
        {this.props.text} <Button>Delete</Button>
      </div>
    );
  }
}

export default Message;