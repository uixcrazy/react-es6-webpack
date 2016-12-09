
import React from 'react';
import { render } from 'react-dom';
import ReactHeight from './components/react-height';
import Collapse from './components/collapse';
// import './stylesheets/collapse.scss';

// const data = {
//   summary: 'Wild Sunflower',
//   details: `The cousin with sunflower is "wild sunflower". Vnes call "hoa dã quỳ".
//         The wild sunflowers often bloom in late October in the winter as rainy season of Da Lat passes.`,
// }
//
let status = true;
function changeOpen(status) {
  return !status;
}
render(
  (
    <div>
      <ReactHeight onHeightReady={height => console.log(height)}>
        <div>
          Random content
          <br /> ....
          <br /> ....
          <br /> ....
          <br /> ....
        </div>
      </ReactHeight>
      <ReactHeight hidden={true} onHeightReady={height => console.log(height)}>
        <div>Will be removed from the DOM when height is measured</div>
      </ReactHeight>
      <ReactHeight onHeightReady={height => console.log(height)}
        style={{ width: 200, border: '1px solid red' }}
        className="myComponent">

        <div>
          Wrapper around this element will have red border, 200px width
          and `class="myComponent"`
        </div>
      </ReactHeight>
      <p>--------------------------</p>
      <Collapse isOpened={status} onClick={changeOpen(status)}>
        <p>Paragraph of text</p>
        <p>Another paragraph is also OK</p>
        <p>Images and any other content are ok too</p>
      </Collapse>

    </div>
  ),
  document.getElementById('app'));
