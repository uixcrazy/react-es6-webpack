
import React from 'react';
import { render } from 'react-dom';
import Dropdown from './components/dropdown';
import './stylesheets/dropdown.scss';

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'three' },
]
const defaultOption = options[0];
function _onSelect(option) {
  console.log('select', option.value);
}
render(
  <div>
    <Dropdown
      options={options}
      onChange={_onSelect}
      value={defaultOption}
      placeholder="Select an option" />

    <Dropdown
      disabled
      options={options}
      onChange={_onSelect}
      value={defaultOption}
      placeholder="Select an option" />
    </div>,
  document.getElementById('app'));
