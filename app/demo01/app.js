import React, {Component} from 'react';
import {render} from 'react-dom';
import Counter from './counter.js';
require('./style.css');
require("./scss/main.scss")

export default class App extends Component {
  render() {
    return (
      <div>
        <p>Add your component markup and other subcomponent references here.</p>
        <Counter />
      </div>
    );
  }
}

render(
  <App />,
  document.getElementById('root')
);
