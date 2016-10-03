import React, {Component, PropTypes} from 'react'

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: props.initialCount };
    this.tick = this.tick.bind(this);
  }

 tick() {
    this.setState(
      {
        count: this.state.count + 1
      }
    );
  }

  render() {
    return (
      <div onClick={this.tick}>
        <span className="btn-click">Click here: </span>{this.state.count}
      </div>
    )
  }
}

Counter.propTypes = {
  initialCount: PropTypes.number
}

Counter.defaultProps = {
  initialCount: 0
}

export default Counter
