import React, { Component, PropTypes } from 'react';
import Tooltip from './tooltip';

class Demo extends Component {
  render() {
    Tooltip('box', 'item');
    return (
      <div>

        <a href="#" title="Hooray!">Hover over me</a>
        <p style="color: red">khi goi hàm truoc khi DOM dc tạo</p>
        <script>
          // $('[data-toggle="tooltip"]').tooltip();
        </script>
        <p data-tip="hello world">Tooltip</p>

        <div id="demo"></div>

        <div class="box" style="padding-top: 0;">
          <div class="item" style="margin-top: 5px;" data-tooltip="Hooray! option specifies the tooltip placement mouse" >fsdafsfhdfghfdg
          </div>
          <div class="item" data-tooltip="NO Hooray! option specifies the tooltip placement mouse" >fsdafsfhdfghfdg
          </div>
        </div>

        <div class="box" style="border:0; margin-top: 30px;">
          <div class="item" data-tooltip="Hooray! option specifies the tooltip placement mouse" >fsdafsfhdfghfdg
          </div>
          <div class="item" data-tooltip="NO Hooray! option specifies the tooltip placement mouse" >fsdafsfhdfghfdg
          </div>
        </div>

        <div class="box" style="margin-top: 20px">
          <div class="item" data-tooltip="Hallo" >box 2
          </div>
          <div class="item" data-tooltip="EHllo" >box 2
          </div>
        </div>

      </div>
    )
  }
}

export default Demo;

// Hooray! option specifies the tooltip position. This is first box/ second box / thirth box