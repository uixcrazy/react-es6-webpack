import React, {Component} from 'react';
import {render} from 'react-dom';
import MessageList from './components/MessageList.js';

class App extends Component {
  render() {
    const data = [
      { text: 'message 01' },
      { text: 'message 02' },
      { text: 'message 03' },
      { text: 'message 04' },
      { text: 'message 05' },
    ];
    return (
      <MessageList messages={data}/>
    );
  }
}

render(
  <App />,
  document.body
);
