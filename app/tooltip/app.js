
import React from 'react';  // eslint-disable-line
import { render } from 'react-dom';
// import Demo from './components/demo';
import Tooltip from './components/tooltip';  // eslint-disable-line
import DemoA from './demo/demo01';  // eslint-disable-line
import './stylesheets/tooltip.scss';
import './stylesheets/main.scss';

render(
  <div>
    <DemoA />

    <div className="box">
      <Tooltip
        dataTooltip="Hooray! option specifies the tooltip placement mouse"
        container=".box"
      >
        <div className="item">fsdafsfhdfghfdg</div>
      </Tooltip>
      <Tooltip
        dataTooltip="Hooray! option specifies the tooltip position. This is second box"
        container=".box"
      >
        <div className="item">fsdafsfhdfghfdg</div>
      </Tooltip>
      <Tooltip
        dataTooltip="Hooray! option specifies the tooltip position. This is thirth box"
        container=".box"
      >
        <div className="item">fsdafsfhdfghfdg</div>
      </Tooltip>
    </div>
  </div>
  , document.getElementById('app'));
