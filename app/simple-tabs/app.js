import React, {Component, PropTypes} from 'react';
import { render } from 'react-dom';
import SimpleTabs from './components/simple-tabs';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SimpleTabs />
    )
  }
}

render(<App />, document.getElementById('app'));
