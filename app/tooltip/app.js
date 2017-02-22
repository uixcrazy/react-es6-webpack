
import React from 'react';  // eslint-disable-line
import { render } from 'react-dom';
// import Demo from './components/demo';
import DemoB from './demo/demo02';  // eslint-disable-line
import DemoD from './demo/demo04';  // eslint-disable-line
import './stylesheets/tooltip.scss';
import './stylesheets/main.scss';

//  data-offset="10"
render(
  <div>

  <DemoB
      key="CCC"
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
        data-tip="DaiLe"
        data-place="top"
      >fsdafsfhdfghfdg</div>
      <div>
        <p rel="tooltip">this is tooltip</p>
      </div>
    </DemoB>

  <DemoB
      key="AAA"
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
        data-tip="DaiLe"
        data-place="top"
        data-static
      >fsdafsfhdfghfdg</div>
      <div>
        <p
          rel="tooltip" data-static
        >
          日蓮上人より長谷山本土寺と寺号を授かったのが始まりとさ れており、池上の長栄山本門寺、鎌倉の長興山妙本寺とともに朗門の三長三本の本山と称される名刹の名刹。1万株のあじさいと5千株の花菖蒲が有名で、別名「あじさい寺」とも呼ばれている。所々にソメイヨシノがあるほか、期間は短いがシダレザクラも鑑賞できる花見スポット。桜の下には百余の雪柳が咲く。
        </p>
        <p>second content</p>
        <h1>My Heading</h1>
      </div>
    </DemoB>



    <DemoD
      key="BBB"
      tooltip={{
        dataTooltip: `<p>Dai Le</p>`,
        place: 'top',
      }}
      name="DaiLe"
    >
      <div
        className="item"
        rel="tooltip"
        data-tip="asdf"
        data-place="top"
      >fsdafsfhdfghfdg</div>
      <div>
        <p
          rel="tooltip" data-place="top"
        >
          日蓮上人より長谷山本土寺と寺号を授かったのが始まりとさ れており、池上の長栄山本門寺、鎌倉の長興山妙本寺とともに朗門の三長三本の本山と称される名刹の名刹。1万株のあじさいと5千株の花菖蒲が有名で、別名「あじさい寺」とも呼ばれている。所々にソメイヨシノがあるほか、期間は短いがシダレザクラも鑑賞できる花見スポット。桜の下には百余の雪柳が咲く。
        </p>
        <p>second content</p>
        <h1>My Heading</h1>
        <p>This is the first paragraph of text.</p>
        <p>This is the second paragraph of text.</p>
        <p>A link: <a href="http://www.simplehtmlguide.com"> html guide </a></p>
      </div>
    </DemoD>




  </div>
  , document.getElementById('app'));
