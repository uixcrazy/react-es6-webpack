import React, {Component, PropTypes} from 'react'

class SimpleTabs  extends Component {
  constructor(props) {
    super(props);
    this.renderLabels = this.renderLabels.bind(this);
    this.tabsList = {
      sunflower: {
        label: 'Sunflower',
        content: `The cousin with sunflower is "wild sunflower". Vnes call "hoa dã quỳ".
        The wild sunflowers often bloom in late October in the winter as rainy season of Da Lat passes.`
      },
      daisy: {
        label: 'tiny pure white daisies',
        content: `Not bringing such a brilliant or haughty beauty, the white daisy owns a gentle and pure, simple but very close beauty.`
      },
      sakura: {
        label: 'sakura',
        content: `A cherry blossom is the flower of any of several trees of genus Prunus, particularly the Japanese cherry, Prunus serrulata, which is called sakura after the Japanese (桜 or 櫻; さくら). Cherry blossom is speculated to be native to the Himalayas.`
      },
    }
  }

  changeTab() {


  }

  renderLabels() {
    Object.keys(this.tabsList).map((value, index) => {
      console.log(value, index);
      console.log(this.tabsList[value]);
      return (
        <li key={index}>{this.tabsList[value].label}</li>
      )
    });
  }

  render() {
    return (
      <div className="simple-tabs">
        <ul className="labels">
          {this.renderLabels()}
        </ul>
        <div>this is panel</div>
      </div>
    )
  }
}

export default SimpleTabs;
