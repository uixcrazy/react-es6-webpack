import React, {Component, PropTypes} from 'react';
// import Collapse from '../../collapse/components/collapse';

class Accordion extends Component {
  constructor(props) {
    super(props); // if remove this -> what happened
    this.renderEachCollapse = this.renderEachCollapse.bind(this);
    this.state = {
      activeIndex: -1
    }
  }

  handleClick(index) {
    this.setState({
      activeIndex: index
    });
  }

  renderEachCollapse() {
    const accordionData = this.props.accordionData;
    console.log('-----------------');
    const renderEachCollapse = accordionData.map((value, index) => {
      const isActive = (index == this.state.activeIndex) ?  'active' : '';
      return (
        <li
          key={`accordion${index}`}
          className={`item ${isActive}`}
          onClick={this.handleClick.bind(this, index)} >
          <a className="summary">
            {value.summary}
          </a>
          <div className="details">
            {value.details}
          </div>
        </li>
      )
    });
    return renderEachCollapse;
  }

  render() {
    return(
      <ul className="accordion">
        {this.renderEachCollapse()}
      </ul>
    )
  };
}

Accordion.propTypes = {
  accordionData: React.PropTypes.array.isRequired,
}

export default Accordion;
