import React, {Component, contextTypes} from 'react';

class Button extends Component {
  render() {
    const buttonStyle = {
      background: this.context.colorBg,
      color: this.context.colorText,
    }
    return (
      <button style={buttonStyle}>
        {this.props.children}
      </button>
    );
  }
}

Button.contextTypes = {
  colorBg: React.PropTypes.string,
  colorText: React.PropTypes.string
};

export default Button;
