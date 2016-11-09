import React, {Component, PropTypes} from 'react';

class Collapse extends Component {
  constructor(props) {
    super(props); // if remove this -> what happened
    this.handleClick = this.handleClick.bind(this);
    // collapsed: true
    this.state = {
      active: false
    }
  }
  // componentWillMount() {
  //   const isActive = this.props.isActive;
  //   this.setState({
  //     active: isActive ? true : false
  //   });
  // }
  handleClick() {
    // e.preventDefault();
    this.setState({
      active: !this.state.active
    });
  }
  render() {
    // console.log(this.props);
    const isActive = this.state.active ? 'active' : '';
    return(
      <div className={`collapse ${isActive}`}>
        <a
          className="summary"
          onClick={this.handleClick}>
          {this.props.summary}
        </a>
        <div className="details">
          {this.props.details}
        </div>
      </div>
    )
  };
}

Collapse.PropTypes = {
  summary: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  // isActive: PropTypes.bool.isRequired
}

// Collapse.defaultProps = {
//   isActive: false,
// }

export default Collapse;
