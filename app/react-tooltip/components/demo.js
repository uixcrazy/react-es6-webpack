import React, { Component, PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';

class Demo extends Component {
  render() {
    return (
      <div>
        <div className="demonstration">
          <a data-tip="React-tooltip" data-offset="{'top': 10, 'left': 10}"> ◕‿‿◕ </a>
          <ReactTooltip place="bottom" type="success" effect="float"/>
        </div>
        <div className="box">
          <div className="test-overlap">test overlap tooltip</div>
          <a href="#" data-tip data-for="data-original-title">Hover over me</a>
          <span className="aaa" data-tip data-for="data-original-title">Hover over me</span>
          <span className="bbb" data-tip data-for="data-original-title">Hover over me</span>
          <span className="ccc" data-tip data-for="data-original-title">Hover over me</span>
          <div className="ddd" data-tip data-for="data-222">Hover over me</div>
          <div className="ddd" data-tip data-for="data-222">Hover over me</div>
          <div className="ddd" data-tip data-for="data-222">Hover over me</div>


          <ReactTooltip id="data-original-title"
            aria-haspopup='true'
            type="warning"
            effect="float"
            border="true">

            <p>This is a global react component tooltip</p>
            <p>You can put every thing here</p>
            <ul>
             <li>Word</li>
             <li>Chart</li>
             <li>Else</li>
            </ul>
          </ReactTooltip>
          <ReactTooltip id="data-222"
            aria-haspopup='true'
          >
            <p>Hooray! aaa aaa aaa aaa aaa aaa</p>
          </ReactTooltip>



        </div>
      </div>
    )
  }
}

export default Demo;

// Hooray! option specifies the tooltip position. This is first box/ second box / thirth box