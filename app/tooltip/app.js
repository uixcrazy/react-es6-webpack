
import React from 'react';  // eslint-disable-line
import { render } from 'react-dom';
// import Demo from './components/demo';
import DemoB from './demo/demo02';  // eslint-disable-line
import './stylesheets/tooltip.scss';
import './stylesheets/main.scss';

render(
  <div>
    <DemoB
      tooltip={{
        dataTooltip: `<p>second content</p>
        <h1>My Heading</h1>
        <p>This is the first paragraph of text.</p>
        <p>This is the second paragraph of text.</p>
        <p>A link: <a href="http://www.simplehtmlguide.com"> html guide </a></p>`,
        place: 'top',
      }}
      name="DaiLe"
    >
      <div
        className="item"
        rel="tooltip"
        data-tip="pHUC CACA WITH hIEU CACA"
        data-place="top"
        data-offset="10"
        data-resizehide="true"
        data-followmouse="true"
      >fsdafsfhdfghfdg</div>
      <div>
        <p
          rel="tooltip"
        >
          日蓮上人より長谷山本土寺と寺号を授かったのが始まりとさ れており、池上の長栄山本門寺、鎌倉の長興山妙本寺とともに朗門の三長三本の本山と称される名刹の名刹。1万株のあじさいと5千株の花菖蒲が有名で、別名「あじさい寺」とも呼ばれている。所々にソメイヨシノがあるほか、期間は短いがシダレザクラも鑑賞できる花見スポット。桜の下には百余の雪柳が咲く。
        </p>
        <p>second content</p>
        <h1>My Heading</h1>
        <p>This is the first paragraph of text.</p>
        <p>This is the second paragraph of text.</p>
        <p>A link: <a href="http://www.simplehtmlguide.com"> html guide </a></p>
      </div>
    </DemoB>
  </div>
  , document.getElementById('app'));
