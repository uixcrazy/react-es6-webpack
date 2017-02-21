import React, { Component, PropTypes } from 'react';
import Tooltip from '../components/tooltip';  // eslint-disable-line

export default props => {
  return (
    <div>
      <div className="item">fsdafsfhdfghfdg</div>
    </DemoB>
    <div className="box">
      <Tooltip
        dataTooltip="Hooray! option specifies the tooltip position. This is second box Hooray! option specifies the tooltip position. This is second box "
      >
        <div className="item">fsdafsfhdfghfdg</div>
      </Tooltip>
      <Tooltip
        dataTooltip="Hooray! option specifies the tooltip position. This is thirth box"
        offset={{ top: 5, left: 5 }}
      >
        <div className="item">fsdafsfhdfghfdg</div>
      </Tooltip>
      <Tooltip
        dataTooltip="Hooray! option specifies the tooltip position. This is thirth box"
      >
        <div className="item">fsdafsfhdfghfdg</div>
      </Tooltip>

    </div>

    <div className="box2 box">
      <Tooltip
      isFollowMouse={false}
        dataTooltip="Hooray! option specifies the tooltip position. This is second box Hooray! option specifies the tooltip position. This is second box "
      >
        <div className="item">fsdafsfhdfghfdg</div>
      </Tooltip>
      <Tooltip
        dataTooltip="Hooray! option specifies the tooltip position. This is thirth box"
        offset={{ top: 5, left: 5 }}
      >
        <div className="item">fsdafsfhdfghfdg</div>
      </Tooltip>
      <Tooltip
        dataTooltip="Hooray! option specifies the tooltip position. This is thirth box"
      >
        <div className="item">fsdafsfhdfghfdg</div>
      </Tooltip>
    </div>

    <Tooltip
      dataTooltip={`
          <div>
            日蓮上人より長谷山本土寺と寺号を授かったのが始まりとさ れており、池上の長栄山本門寺、鎌倉の長興山妙本寺とともに朗門の三長三本の本山と称される名刹の名刹。1万株のあじさいと5千株の花菖蒲が有名で、別名「あじさい寺」とも呼ばれている。所々にソメイヨシノがあるほか、期間は短いがシダレザクラも鑑賞できる花見スポット。桜の下には百余の雪柳が咲く。
            <p>second content</p>
            <h1>My Heading</h1>
            <p>This is the first paragraph of text.</p>
            <p>This is the second paragraph of text.</p>
            <p>A link: <a href="http://www.simplehtmlguide.com"> html guide </a></p>
          </div>
        `}
      viewport={{        // Keeps the tooltip within the bounds of this element.
        selector: ".box"
      }}
    >
      <div className="item">fsdafsfhdfghfdg</div>
    </Tooltip>

  </div>

    );
};
