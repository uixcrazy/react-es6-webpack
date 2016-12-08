import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dropdown from './dropdown';


class Test extends Component {
  constructor (props) {
    super(props);
    this._clickhere = this._clickhere.bind(this);
  }
   _clickhere() {
    console.log('click here');
  }
  render() {
    const options = [
      { value: 'one', label: '<i class="fa fa-home fa-fw" />One' },
      { value: 'two', label: '<i class="fa fa-pencil fa-fw" />Two' },
      { value: 'three', label: '<i class="fa fa-cog fa-fw" />three' },
    ]
    const defaultOption = options[0];
    function _onSelect(option) {
      console.log('select', option.value);
    }

    const divStyle = {
      width: '500px',
      height: '200px',
      background: '#0ff',
    };
    return (
      <div>
        <Dropdown
          options={options}
          onChange={_onSelect}
          value={defaultOption} />
        <Dropdown
          disable
          options={options}
          onChange={_onSelect}
          value={defaultOption} />
      </div>
    )
  }

}

export default Test;
