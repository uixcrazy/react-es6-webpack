/*
 * https://tylermcginnis.com/functional-components-vs-stateless-functional-components-vs-stateless-components/
 */
import React, { Component, PropTypes } from 'react';
import makeWrapperTooltip from '../components/WrapperTooltip';
import '../stylesheets/tooltip.scss';
import '../stylesheets/demo.scss';

const HelloWorld = ({ name }) => (
 <div>
    <p rel="tooltip" data-tip="ngốc nghếch wa đi">this is tooltip</p>
    <p rel="tooltip">
    日蓮上人より長谷山本土寺と寺号を授かったのが始まりとさ れており、池上の長栄山本門寺、鎌倉の長興山妙本寺とともに朗門の三長三本の本山と称される名刹の名刹。1万株のあじさいと5千株の花菖蒲が有名で、別名「あじさい寺」とも呼ばれている。所々にソメイヨシノがあるほか、期間は短いがシダレザクラも鑑賞できる花見スポット。桜の下には百余の雪柳が咲く。
    </p>
    <p style={{ paddingBottom: 20, textAlign: 'center', color: '#c1403d' }}>
      {`Hi ${name}`}
    </p>
    <div className="item" rel="tooltip" data-tip="DaiLe" >me too!!!</div>
    <p  rel="tooltip" data-tip="Envía un mensaje a esta página, recibe información sobre los próximos eventos y mucho más. Si no tienes una cuenta de Facebook, puedes crear una para ver más información de la página."
    >Inicia sesión en Facebook para ver más de ?</p>
    <p style={{ marginTop: 10, marginBottom: 10 }}>Das Leben ist wie Schokolade, die man Stück für Stück genießen und sich langsam auf der Zunge zergehen lassen soll</p>
    <p  rel="tooltip" data-tip="Envía un mensaje a esta página, recibe información sobre los próximos eventos y mucho más. Si no tienes una cuenta de Facebook, puedes crear una para ver más información de la página."
    >Inicia sesión en Facebook para ver más de ?</p>
 </div>
);

const Example = (props) => {
  // console.log(props);
  return (
    <div className="example">
      { props.children }
      {`Hi ${props.name}`}
    </div>
  );
};

export default props => {
  const StaticUI = makeWrapperTooltip(Example);
  const DynamicUI = makeWrapperTooltip(HelloWorld);
  const dataTooltipDefault = `<p>second content</p>
    <h1>My Heading</h1>
    <p>This is the first paragraph of text.</p>
    <p>This is the second paragraph of text.</p>
    <p>A link: <a href="http://www.simplehtmlguide.com"> html guide </a></p>`
  return (
    <div>
      <h1>Follow MOuse - bottom default</h1>
      <div className="box-grp demo-dynamic">
        <DynamicUI {...props}
          tooltip={{
            dataTooltip: dataTooltipDefault,
            place: 'bottom',
          }}
          name="you! I follow by your mouse..."/>
        <DynamicUI {...props}
          tooltip={{
            dataTooltip: dataTooltipDefault,
            place: 'bottom',
          }}
          name="you! I follow by your mouse..."/>
      </div>

      <h1>Follow MOuse - top default</h1>
      <div className="box-grp demo-dynamic">
        <DynamicUI {...props}
          tooltip={{
            dataTooltip: dataTooltipDefault,
            place: 'top',
          }}
          name="you! I follow by your mouse..."/>
        <DynamicUI {...props}
          tooltip={{
            dataTooltip: dataTooltipDefault,
            place: 'top',
          }}
          name="you! I follow by your mouse..."/>
      </div>





      <h1>Static Demo</h1>
      <div className="box-grp demo-static">
        <StaticUI {...props}
          key="static01"
          tooltip={{
            dataTooltip: dataTooltipDefault,
            isFollowMouse: false,
          }}
          name="you! I am static Box"
        >
          <span rel="tooltip" data-place="bottom">BOTTOM</span>
          <span rel="tooltip" data-place="right">RIGHT</span>
          <span rel="tooltip" data-place="left">LEFT</span>
          <span rel="tooltip">TOP</span>
        </StaticUI>
        <StaticUI {...props}
          key="static02"
          tooltip={{
            dataTooltip: dataTooltipDefault,
            isFollowMouse: false,
          }}
          name="you! I am static Box"
        >
          <span rel="tooltip" data-place="bottom">BOTTOM</span>
          <span rel="tooltip" data-place="right">RIGHT</span>
          <span rel="tooltip" data-place="left">LEFT</span>
          <span rel="tooltip" data-place="top">TOP</span>
        </StaticUI>
      </div>





      <h1>Follow MOuse - right default</h1>
      <div className="box-grp demo-dynamic">
        <DynamicUI {...props}
          tooltip={{
            dataTooltip: dataTooltipDefault,
            place: 'right',
          }}
          name="you! I follow by your mouse..."/>
        <DynamicUI {...props}
          tooltip={{
            dataTooltip: dataTooltipDefault,
            place: 'right',
          }}
          name="you! I follow by your mouse..."/>
      </div>

      <h1>Follow MOuse - left default</h1>
      <div className="box-grp demo-dynamic">
        <DynamicUI {...props}
          tooltip={{
            dataTooltip: dataTooltipDefault,
            place: 'left',
          }}
          name="you! I follow by your mouse..."/>
        <DynamicUI {...props}
          tooltip={{
            dataTooltip: dataTooltipDefault,
            place: 'left',
          }}
          name="you! I follow by your mouse..."/>
      </div>

    </div>
  );
};
