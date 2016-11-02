import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

class SimpleTabs  extends Component {
  constructor(props) {
    super(props);
    this.renderLabels = this.renderLabels.bind(this);
    this.tabsList = {
      sunflower: {
        label: 'sunflower',
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
    };
    const activeTabs = 'sunflower';

    this.state = {
      tabsItem: this.tabsList[activeTabs],
      active: activeTabs,
    };
  }

  changeTab(item, activeTabs) {
    this.setState({
      tabsItem: item,
      active: activeTabs,
    });
  }

  renderLabels() {
    const label = Object.keys(this.tabsList).map((value, index) => {
      let status = '';
      if (value === this.state.active) {
        status = 'active';
      }
      return (
        <li className={status}
          onClick={this.changeTab.bind(this, this.tabsList[value], value)}
          key={this.tabsList[value].label}
        >
          {this.tabsList[value].label}
        </li>
      )
    });
    return label;
  }
 // <ReactCSSTransitionReplace
        //   transitionName="cross-fade"  fade-wait
        //   transitionEnterTimeout={1000}
        //   transitionLeaveTimeout={1000}> 400
  render() {
    return (
      <div className="simple-tabs">
        <ul className="labels">
          {this.renderLabels()}
        </ul>
          <ReactCSSTransitionReplace
            transitionName="cross-fade"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}>
          <div className="st-content" key={this.state.tabsItem.label}>
            {this.state.tabsItem.content}
          </div>
        </ReactCSSTransitionReplace>
      </div>
    )
  }
}

export default SimpleTabs;
