/*
 * Higher-Order Components
 * https://facebook.github.io/react/docs/higher-order-components.html
 * eg: https://github.com/franleplant/react-hoc-examples/blob/master/pp_state.js
 * https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e
 */

import React, { Component } from 'react'; // eslint-disable-line
import getPosition from './getPosition';

const tooltipDefaultProps = { // insteed Tooltip.defaultProps
  baseClassName: 'tooltip',
  // container:  ← thisDom ::: Keeps the tooltip within the bounds of this element.
  overflowContainer: false, // allow overflow container
  dataTooltip: '',
  place: null,          // PropTypes.string ::: top, right, bottom, left
  offset: 0,            // PropTypes.number ::: with cursor
  afterShow: null,      // PropTypes.func ::: Function that will be called after tooltip show
  afterHide: null,      // PropTypes.func ::: Function that will be called after tooltip hide
  iframe: null,
  resizeHide: true,     // PropTypes.bool ::: Hide the tooltip when resizing the window
  disable: false,       // PropTypes.bool ::: Disable the tooltip behaviour, default is false
  hideOnMobile: true,   // Default don't support mobile
  isFollowMouse: true,  // ~ effect of React-Tooltip
};

function WrapperTooltip(WrappedComponent) {
  class Tooltip extends Component {
    constructor(props) {
      super(props);
      this.tooltipProps = Object.assign({}, tooltipDefaultProps, this.props.tooltip);
      this.state = {
        dataTooltip: this.tooltipProps.dataTooltip,
        place: this.tooltipProps.place, // Direction of tooltip
        offset: this.tooltipProps.offset,
        resizeHide: this.tooltipProps.resizeHide,
        isFollowMouse: this.tooltipProps.isFollowMouse,

        show: false,
        currentEvent: null, // Current mouse event
        currentTarget: null, // Current target of mouse event
        isEmptyTip: false,
        disable: false,

        tooltipEl: null,
        tooltipArrowOutside: null,
        tooltipArrowInside: null,
        tooltipContentEl: null,
      };

      this.bind([
        'showTooltip',
        'updateTooltip',
        'hideTooltip',
        'onWindowResize',
        'updatePosition',
      ]);

      this.mount = true;
      this.Document = this.tooltipProps.isIframe ? this.tooltipProps.isIframe.contentDocument : document;
    }

    bind(methodArray) {
      methodArray.forEach((method) => {
        this[method] = this[method].bind(this);
      });
    }

    componentDidMount() {
      this.getTooltipEl();
      this.bindListener();
      this.bindWindowEvents(this.tooltipProps.resizeHide);
    }

    componentWillUnmount() {
      this.mount = false;
      this.unbindListener();
      this.unbindWindowEvents();
    }

    getTargetArray() { // eslint-disable-line
      const targetArray = this.DOM.querySelectorAll('[rel=tooltip]');
      const length = targetArray.length;
      if (targetArray.hasOwnProperty) {
        return Array.prototype.slice.call(targetArray);
      }
      return new Array(length).fill().map(index => targetArray[index]);
    }

    bindListener() {
      const { isFollowMouse } = this.tooltipProps;
      const targetArray = this.getTargetArray();

      targetArray.forEach((target) => {
        if (target.getAttribute('currentItem') === null) {
          target.setAttribute('currentItem', 'false');
        }
        this.unbindBasicListener(target);

        // if (this.isCustomEvent(target)) {
        //   this.customBindListener(target);
        //   return;
        // }

        target.addEventListener('mouseenter', this.showTooltip);
        if (isFollowMouse) {
          target.addEventListener('mousemove', this.updateTooltip);
        }
        target.addEventListener('mouseleave', this.hideTooltip);
      });
    }

    unbindListener() {
      const targetArray = this.getTargetArray();
      targetArray.forEach((target) => {
        this.unbindBasicListener(target);
      });
    }

    unbindBasicListener(target) {
      target.removeEventListener('mouseenter', this.showTooltip);
      target.removeEventListener('mousemove', this.updateTooltip);
      target.removeEventListener('mouseleave', this.hideTooltip);
    }

    onWindowResize() {
      if (!this.mount) return;
      if (this.state.show) this.hideTooltip();
    }

    bindWindowEvents(resizeHide) {
      // Resize window
      if (resizeHide) {
        window.removeEventListener('resize', this.onWindowResize);
        window.addEventListener('resize', this.onWindowResize, false);
      }
    }

    unbindWindowEvents() {
      window.removeEventListener('resize', this.onWindowResize);
    }

    getTooltipEl() {
      const { baseClassName, hideOnMobile } = this.tooltipProps;
      if (hideOnMobile && !!('ontouchstart' in window)) {
        // check for touch device - behaviour and events for touch device
        this.setState({ disable: true });
        return;
        // ↑↑↑ don't show tooltip at mobile
      }

      const tooltipEl = this.DOM.querySelector(`.${baseClassName}`);
      const tooltipArrowOutside = tooltipEl.querySelector(`.${baseClassName}-arrow-outside`);
      const tooltipArrowInside = tooltipEl.querySelector(`.${baseClassName}-arrow-inside`);
      const tooltipContentEl = tooltipEl.querySelector(`.${baseClassName}-content`);
      if (tooltipEl) {
        this.setState({ tooltipEl, tooltipArrowOutside, tooltipArrowInside, tooltipContentEl });
      } else {
        this.setState({ disable: true });
      }
    }

    showTooltip(e) {
      const { dataTooltip, place, offset } = this.tooltipProps;
      let { resizeHide, isFollowMouse } = this.tooltipProps;
      const dataTip = e.currentTarget.getAttribute('data-tip') || dataTooltip;
      const dataPlace = e.currentTarget.getAttribute('data-place') || place || 'top';
      const dataOffset = Number(e.currentTarget.getAttribute('data-offset')) || offset;
      const dataResizeHide = e.currentTarget.hasAttribute('data-resize-window');
      const dataFollowmouse = e.currentTarget.hasAttribute('data-static');

      if (dataResizeHide) resizeHide = false;
      if (dataFollowmouse) isFollowMouse = false;

      this.setState({
        dataTooltip: dataTip,
        place: dataPlace,
        offset: dataOffset,
        resizeHide,
        isFollowMouse,

        isEmptyTip: !dataTip,
      });
      this.updateTooltip(e);
    }

    updateTooltip(e) {
      const { show, isEmptyTip, disable, tooltipEl, isFollowMouse } = this.state;
      const { afterShow } = this.tooltipProps;
      const eventTarget = e.currentTarget;

      // if the tooltip is empty, disable the tooltip
      // and not follow mouse → not update
      if (isEmptyTip || disable || (show && !isFollowMouse)) return;
      tooltipEl.classList.add('show');

      tooltipEl.classList.remove('top', 'bottom', 'right', 'left');
      tooltipEl.classList.add(this.state.place);

      this.setState({
        currentEvent: e,
        currentTarget: eventTarget,
        show: true,
      }, () => {
        this.updatePosition();
        if (afterShow) afterShow();
      });
    }

    hideTooltip(e) {
      const { isEmptyTip, disable, tooltipEl } = this.state;
      const { afterHide } = this.tooltipProps;
      if (!this.mount) return;
      if (isEmptyTip || disable) return; // if the tooltip is empty, disable the tooltip
      // if (hasTarget) {
        // Don't trigger other elements belongs to other ReactTooltip
      const targetArray = this.getTargetArray();
      const isMyElement = targetArray.some(ele => ele === e.currentTarget);
      if (!isMyElement || !this.state.show) return;
      // }
      this.setState({
        show: false,
      }, () => {
        tooltipEl.classList.remove('show');
        if (afterHide) afterHide();
      });
    }

    updatePosition() {
      const {
        currentEvent,
        currentTarget,
        tooltipEl,
        tooltipArrowOutside,
        tooltipArrowInside,
        place,
        offset,
        isFollowMouse,
      } = this.state;
      const { overflowContainer } = this.props;

      const result = getPosition(currentEvent, currentTarget, this.DOM, tooltipEl, place, isFollowMouse, offset);

      // console.log(result);

      if (result.hide && !overflowContainer) {
        this.hideTooltip(currentEvent);
        return;
      }

      if (result.place && result.place !== place) {
        tooltipEl.classList.remove('top', 'bottom', 'right', 'left');
        tooltipEl.classList.add(result.place);
      }

      // Set tooltip position ~~ Math.floor(Double)
      tooltipEl.style.left = `${~~result.position.left}px`;
      tooltipEl.style.top = `${~~result.position.top}px`;
      if (result.positionArrow) {
        tooltipArrowOutside.style.left = `${result.positionArrow.left}px`;
        tooltipArrowInside.style.left = `${result.positionArrow.left}px`;
      }
    }

    render() {
      const baseClassName = this.tooltipProps.baseClassName;
      const newProps = Object.assign({}, this.props);
      delete newProps.tooltip;
      return (
        <div className={`${baseClassName}-wrapper`} ref={ DOM => this.DOM = DOM }>
          <WrappedComponent {...newProps} />
          <div className={baseClassName}>
            <span className={`${baseClassName}-arrow-outside`} />
            <div className={`${baseClassName}-content`}
              dangerouslySetInnerHTML={{ __html: this.state.dataTooltip }} />
            <span className={`${baseClassName}-arrow-inside`} />
          </div>
        </div>
      );
    }
  }

  return Tooltip;
}

export default WrapperTooltip;

/*
 * data-param for tooltipItem
 *----------------------------
 * data-tip="content tooltip"
 * data-place="top"
 * data-offset="10"
 * data-resize-window
 * data-static
*/
