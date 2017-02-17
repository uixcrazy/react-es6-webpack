
import React from 'react';  // eslint-disable-line
import { render } from 'react-dom';
// import Demo from './components/demo';
import Tooltip from './components/tooltip';  // eslint-disable-line
import DemoA from './demo/demo01';  // eslint-disable-line
import './stylesheets/tooltip.scss';
import './stylesheets/main.scss';

render(
  <div>
    <div className="box">
      <Tooltip
        dataTooltip="Themen sind geordnet nach der Ver&auml;nderung der Anzahl an Nachrichten der letzten 24 Stunden im Vergleich zur durchschnittlichen Anzahl."
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
      <Tooltip
        dataTooltip="Hooray! option specifies the tooltip position. This is thirth box"
        container=".box"
      >
        <div className="item">fsdafsfhdfghfdg</div>
      </Tooltip>
    </div>
  </div>
  , document.getElementById('app'));
