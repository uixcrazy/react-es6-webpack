import React, { Component, PropTypes } from 'react';
// import React from 'react';
// import {shouldComponentUpdate} from 'react/lib/ReactComponentWithPureRenderMixin';

class ReactHeight extends Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.state = {
      height: 0,
      dirty: this.props.dirty,
    };
  }

  componentDidMount() {
    const height = this.wrapper.clientHeight;
    const dirty = false;

    this.setState({ height, dirty }, () => this.props.onHeightReady(this.state.height));
  }


  componentWillReceiveProps({ children, dirty }) {
    if (children !== this.props.children || dirty) {
      this.setState({ dirty: true });
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidUpdate() {
    const height = this.wrapper.clientHeight;
    const dirty = false;

    if (height === this.state.height) {
      this.setState({ dirty });
    } else {
      this.setState({ height, dirty }, () => this.props.onHeightReady(this.state.height));
    }
  }


  setWrapperRef(el) {
    this.wrapper = el;
  }


  render() {
    console.log(this.props, this.state);
    const {
      onHeightReady: _onHeightReady,
      dirty: _dirty,
      hidden,
      children,
      ...props,
    } = this.props;
    const { dirty } = this.state;

    console.log(_onHeightReady, _dirty);

    if (hidden && !dirty) {
      return null;
    }
    // <div ref={this.setWrapperRef} {...props}>{children}</div>
    if (hidden) {
      // note for me: add class hidden -- not use style inline
      return (
        <div style={{ height: 0, overflow: 'hidden' }}>
          <div ref={this.setWrapperRef} {...props}>{children}</div>
        </div>
      );
    }

    return <div ref={this.setWrapperRef} {...props}>{children}</div>;
  }
}

ReactHeight.defaultProps = {
  hidden: false,
  dirty: true,
};

ReactHeight.propTypes = {
  children: React.PropTypes.node.isRequired,
  onHeightReady: React.PropTypes.func.isRequired,
  hidden: React.PropTypes.bool,
  dirty: React.PropTypes.bool,
};

export default ReactHeight;
