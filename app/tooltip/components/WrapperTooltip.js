/*
 * Higher-Order Components
 * eg: https://github.com/franleplant/react-hoc-examples/blob/master/pp_state.js
 */
import React, { Component } from 'react'; // eslint-disable-line
import getPosition from './getPosition';

function WrapperTooltip(WrappedComponent) {
  class Tooltip extends Component {
    constructor(props) {
      super(props);
      this.tooltipProps = this.props.tooltip;

      // this.state = {
      //   name: ''
      // }

      // this.onNameChange = this.onNameChange.bind(this)
    }

    // onNameChange(event) {
    //   this.setState({
    //     name: event.target.value
    //   })
    // }

    render() {
      const newProps = {
        name: 'abc',
      };
      // return <WrappedComponent {...this.props} {...newProps}/>
      return (
        <div className={`${this.tooltipProps.baseClassName}-wrapper`}>
          <WrappedComponent {...newProps} />
          <div className={this.tooltipProps.baseClassName}>
            tooltip here!
          </div>
        </div>
      );
    }
  }

  Tooltip.defaultProps = {
    tooltip: {
      baseClassName: 'tooltip',
      // container:  ← thisDom ::: Keeps the tooltip within the bounds of this element.
      // delay , placement  selector  trigger  offset
      dataTooltip: '',
      place: 'top',
      offset: {             // with cursor - top, right, bottom, left
        // top: 5,
        // left: 5,
      },
      // afterShow: null,      // PropTypes.func ::: Function that will be called after tooltip show
      // afterHide: null,      // PropTypes.func ::: Function that will be called after tooltip hide
      isIframe: null,
      resizeHide: true,     // Hide the tooltip when resizing the window
      disable: false,       // ::: Disable the tooltip behaviour, default is false
      hideOnMobile: true,   // Default don't support mobile
      isFollowMouse: true,  // ~ effect of React-Tooltip
    },
  };

  return Tooltip;
}

export default WrapperTooltip;

// note
// phải test kỹ có update element hay ko