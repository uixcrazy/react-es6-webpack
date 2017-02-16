/*
 * reference: https://github.com/wwayne/react-tooltip
 */
import React, { Component } from 'react'; // eslint-disable-line

import getPosition from './getPosition';

class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: 'top', // Direction of tooltip
      show: false,
      // border: false,
      offset: {},
      // extraClass: '',
      // html: false,
      delayHide: 0,
      delayShow: 0,
      event: props.event || null,
      eventOff: props.eventOff || null,
      currentEvent: null, // Current mouse event
      currentTarget: null, // Current target of mouse event
      isEmptyTip: false,
      disable: false,
      container: null,
      tooltipElm: null,
    };

    this.bind([
      'showTooltip',
      'updateTooltip',
      'hideTooltip',
      'onWindowResize',
    ]);

    this.mount = true;
    this.delayShowLoop = null;
    this.delayHideLoop = null;
    this.intervalUpdateContent = null;
  }

  /**
   * For unify the bind and unbind listener
   */
  bind(methodArray) {
    methodArray.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  componentDidMount() {
    this.createTooltip(this.props.dataTooltip);
    this.bindListener();
    this.bindWindowEvents(this.props.resizeHide);
  }

  componentWillUnmount() {
    this.mount = false;

    this.clearTimer();

    this.unbindListener();
    this.unbindWindowEvents();
  }

  /**
   * Bind listener to the target elements
   * These listeners used to trigger showing or hiding the tooltip
   */
  bindListener() {
    if (this.DOM.getAttribute('currentItem') === null) {
      this.DOM.setAttribute('currentItem', 'false');
    }
    this.unbindBasicListener(this.DOM);
    this.DOM.addEventListener('mouseenter', this.showTooltip);
    this.DOM.addEventListener('mousemove', this.updateTooltip);
    this.DOM.addEventListener('mouseleave', this.hideTooltip);
  }

  bindWindowEvents(resizeHide) {
    // Resize
    if (resizeHide) {
      window.removeEventListener('resize', this.onWindowResize);
      window.addEventListener('resize', this.onWindowResize, false);
    }
  }

  /**
   * invoked by resize event of window
   */
  onWindowResize() {
    if (!this.mount) return
    this.hideTooltip();
  }

  /**
   * Unbind listeners on target elements
   */
  unbindListener() {
    this.unbindBasicListener(this.DOM);
  }

  /**
   * Invoke this before bind listener and ummount the compont
   * it is necessary to invloke this even when binding custom event
   * so that the tooltip can switch between custom and default listener
   */
  unbindBasicListener(target) {
    target.removeEventListener('mouseenter', this.showTooltip);
    target.removeEventListener('mousemove', this.updateTooltip);
    target.removeEventListener('mouseleave', this.hideTooltip);
  }

  unbindWindowEvents() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  /**
   * When mouse enter, show the tooltip
   */
  showTooltip(e) {
    this.clearTimer();
    this.updateTooltip(e);
  }

  /**
   * When mouse hover, updatetooltip
   */
  updateTooltip(e) {

    this.state.tooltipElm.classList.add('show');

    this.state.tooltipElm.classList.add('top');
    const { delayShow, show, isEmptyTip, disable } = this.state;
    const { afterShow } = this.props;
    const delayTime = show ? 0 : parseInt(delayShow, 10);
    const eventTarget = e.currentTarget;

    if (isEmptyTip || disable) return; // if the tooltip is empty, disable the tooltip
    const updateState = () => {
      // if (Array.isArray(placeholder) && placeholder.length > 0 || placeholder) {
      const isInvisible = !this.state.show;
      this.setState({
        currentEvent: e,
        currentTarget: eventTarget,
        show: true,
      }, () => {
        this.updatePosition();
        if (isInvisible && afterShow) afterShow();
      });
      // }
    };

    clearTimeout(this.delayShowLoop);
    if (delayShow) {
      this.delayShowLoop = setTimeout(updateState, delayTime);
    } else {
      updateState();
    }
  }

  /**
   * When mouse leave, hide tooltip
   */
  hideTooltip(e) {
    const { delayHide, isEmptyTip, disable } = this.state;
    const { afterHide } = this.props;
    if (!this.mount) return;
    if (isEmptyTip || disable) return; // if the tooltip is empty, disable the tooltip
    const isMyElement = this.DOM === e.currentTarget;
    if (!isMyElement || !this.state.show) return;
    const resetState = () => {
      const isVisible = this.state.show;
      this.setState({
        show: false,
      }, () => {
        if (isVisible && afterHide) afterHide();
      });
      this.state.tooltipElm.classList.remove('show');
    };

    this.clearTimer();
    if (delayHide) {
      this.delayHideLoop = setTimeout(resetState, parseInt(delayHide, 10));
    } else {
      resetState();
    }
  }

  // Calculation the position
  updatePosition() {
    const { currentEvent, currentTarget, tooltipElm, place, offset } = this.state;
    const node = this.state.tooltipElm;
    const result = getPosition(currentEvent, currentTarget, tooltipElm, place, offset);

    if (result.isNewState) {
      console.log('Switch to reverse placement');
      // Switch to reverse placement
      return this.setState(result.newState, () => {
        this.updatePosition();
      });
    }

    // Set tooltip position
    node.style.left = `${result.position.left}px`;
    node.style.top = `${result.position.top}px`;
  }

  /**
   * CLear all kinds of timeout of interval
   */
  clearTimer() {
    clearTimeout(this.delayShowLoop);
    clearTimeout(this.delayHideLoop);
    clearInterval(this.intervalUpdateContent);
  }

  createTooltip(text) {
    const container = document.querySelector(this.props.container);

    const tooltipElm = document.createElement('div');
    const tooltipText = document.createTextNode(text);

    tooltipElm.setAttribute('class', `${this.props.baseClassName}`);
    tooltipElm.appendChild(tooltipText);
    container.appendChild(tooltipElm);
    this.setState({ container, tooltipElm });
  }

  render() {
    const {
      baseClassName,
      children,
    } = this.props;
    return (
      <div className={`${baseClassName}-item`} ref={ DOM => this.DOM = DOM }>
        {children}
      </div>
    );
  }
}

Tooltip.defaultProps = {
  baseClassName: 'tooltip',
  container: 'body',
  dataTooltip: '',
  place: 'top',
  resizeHide: true, // Hide the tooltip when resizing the window
  afterShow: null, // PropTypes.func ::: Function that will be called after tooltip show
  afterHide: null, // PropTypes.func ::: Function that will be called after tooltip hide
  disable: false, // ::: Disable the tooltip behaviour, default is false
};

export default Tooltip;
