/*
 * reference: https://github.com/wwayne/react-tooltip
 * http://v4-alpha.getbootstrap.com/components/tooltips/
 */
import React, { Component } from 'react'; // eslint-disable-line
import getPosition from './getPosition';

class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: 'top',               // Direction of tooltip
      newPlace: null,
      show: false,
      delayHide: 0,
      delayShow: 0,
      event: props.event || null,
      eventOff: props.eventOff || null,
      currentEvent: null,         // Current mouse event
      currentTarget: null,        // Current target of mouse event
      isEmptyTip: false,
      disable: false,
      tooltipElm: null,
      tooltipArrowOutside: null,
      tooltipArrowInside: null,
      tooltipContent: null,
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
    this._document = this.props.isIframe ? this.props.isIframe.contentDocument : document;
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
    this.createTooltip();
    this.bindListener();
    this.bindWindowEvents(this.props.resizeHide);
  }

  componentWillUnmount() {
    this.mount = false;
    this.clearTimer();
    this.unbindListener();
    this.unbindWindowEvents();
  }

  bindListener() {
    this.unbindBasicListener(this.DOM);
    this.DOM.addEventListener('mouseenter', this.showTooltip);
    if (this.props.isFollowMouse) {
      this.DOM.addEventListener('mousemove', this.updateTooltip);
    }
    this.DOM.addEventListener('mouseleave', this.hideTooltip);
  }

  bindWindowEvents(resizeHide) {
    // Resize window
    if (resizeHide) {
      window.removeEventListener('resize', this.onWindowResize);
      window.addEventListener('resize', this.onWindowResize, false);
    }
  }

  onWindowResize() {
    if (!this.mount) return;
    this.hideTooltip();
  }

  unbindListener() {
    this.unbindBasicListener(this.DOM);
  }

  unbindBasicListener(target) {
    target.removeEventListener('mouseenter', this.showTooltip);
    target.removeEventListener('mousemove', this.updateTooltip);
    target.removeEventListener('mouseleave', this.hideTooltip);
  }

  unbindWindowEvents() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  showTooltip(e) {
    this.clearTimer();
    this.updateTooltip(e);
  }

  updateTooltip(e) {
    const { isEmptyTip, disable, tooltipElm, tooltipContent, delayShow, show } = this.state;
    const { afterShow, dataTooltip } = this.props;
    if (isEmptyTip || disable) return; // if the tooltip is empty, disable the tooltip
    tooltipElm.classList.add('show');
    // const tooltipText = this._document.createTextNode(this.props.dataTooltip);
    // tooltipElm.appendChild(tooltipText);
    // ↓↓↓
    tooltipContent.innerHTML = dataTooltip;

    tooltipElm.classList.remove('top', 'bottom', 'right', 'left');
    tooltipElm.classList.add(this.state.newPlace || this.state.place);

    const delayTime = show ? 0 : parseInt(delayShow, 10);
    const eventTarget = e.currentTarget;

    const updateState = () => {
      const isInvisible = !this.state.show;
      this.setState({
        currentEvent: e,
        currentTarget: eventTarget,
        show: true,
      }, () => {
        this.updatePosition();
        if (isInvisible && afterShow) afterShow();
      });
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
    if (!e || !(this.DOM === e.currentTarget) || !this.state.show) return;

    const { delayHide, isEmptyTip, disable, tooltipElm } = this.state;
    const { afterHide } = this.props;
    if (!this.mount) return;
    if (isEmptyTip || disable) return; // if the tooltip is empty, disable the tooltip

    const resetState = () => {
      const isVisible = this.state.show;
      this.setState({
        show: false,
      }, () => {
        if (isVisible && afterHide) afterHide();
      });
      tooltipElm.classList.remove('show');
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
    const { currentEvent, currentTarget, tooltipElm, tooltipArrowOutside, tooltipArrowInside, place } = this.state;
    const { viewport, isFollowMouse, offset, direction } = this.props;
    const viewportSelector = this._document.querySelector(`${viewport.selector}`);
    // const result = this.getPosition(currentEvent, currentTarget, viewportSelector, tooltipElm, place, isFollowMouse, offset);
    const result = this.getPosition(currentEvent, currentTarget, viewportSelector, tooltipElm, place, direction, offset);

    // if (result.isNewState) {
      // Switch to reverse placement
      // return this.setState(result.newState, () => {
      //   this.updatePosition();
      // });
    // }

    // Set tooltip position
    tooltipElm.style.left = `${result.position.left}px`;
    tooltipElm.style.top = `${result.position.top}px`;

    tooltipArrowOutside.style.left = `${result.positionArrow.left}px`;
    tooltipArrowInside.style.left = `${result.positionArrow.left}px`;
    this.setState({ newPlace: result.place });
  }

  getPosition(event, target, container, tooltipEl, place, direction, offset) {
    // event
    // target
    // container
    // tooltip

    // console.log(currentEvent, currentTarget, viewportSelector, tooltipElm, place);
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // console.log(event);
    const heightArrow = 4;

    const topContainerEl = container.offsetTop;  // border + padding
    const leftContainerEl = container.offsetLeft;
    const topContainerElBorder = container.clientTop; // border
    const leftContainerElBorder = container.clientLeft;
    const widthContainerEl = container.offsetWidth; // border
    const heightContainerEl = container.offsetHeight;
    const widthTooltipEl = tooltipEl.offsetWidth;
    const heightTooltipEl = tooltipEl.offsetHeight;
    const maxLeftContainer = widthContainerEl + leftContainerEl;

    // console.log(topContainerEl, leftContainerEl, topContainerElBorder, leftContainerElBorder);


    // top ↓↓↓
    if (place === 'top' && direction === 'horizontal') {
      const xCursor = mouseX - (widthTooltipEl / 2);
      const yCursor = mouseY - (heightTooltipEl + offset.top);

      const rightEl = xCursor + widthTooltipEl;
      // const bottomEl = yCursor + heightTooltipEl;

      let xCursorFinal = xCursor;
      let yCursorFinal = yCursor;
      let positionArrowLeft = widthTooltipEl / 2;
      let currentPlace = null;
      let currentHide = false;

      // const position =

      if (xCursor < leftContainerEl) { // to left
        const deviate = leftContainerEl - xCursor;
        xCursorFinal = leftContainerEl;
        positionArrowLeft = (widthTooltipEl / 2) - deviate;
      }

      if (rightEl > maxLeftContainer) { // to right
        xCursorFinal = maxLeftContainer - widthTooltipEl;
        const deviate = xCursor - xCursorFinal;
        positionArrowLeft = (widthTooltipEl / 2) + deviate;
        // not enough width to show tooltip
      }

      if (yCursor < topContainerEl) { // to top
        yCursorFinal = mouseY + 20 + offset.bottom;
        currentPlace = 'bottom';
        const hSpaceBetweenElvsContainer = heightContainerEl - mouseY - heightArrow;
        console.log('=================== vượt top', hSpaceBetweenElvsContainer);
        if (hSpaceBetweenElvsContainer < 0) currentHide = true;  // not enough height to show tooltip
      }

      // if (bottomEl > heightContainerEl + topContainerEl) {
      //   console.log('=================== vượt bottom');
      //   return;
      // }

      return {
        place: currentPlace,
        hide: currentHide,
        position: {
          left: xCursorFinal,
          top: yCursorFinal,
        },
        positionArrow: {
          left: positionArrowLeft,
        },
      };
    }

    if (place === 'bottom' && direction === 'horizontal') {

    }

    return {
      position: {
        left: mouseX,
        top: mouseY,
      },
      positionArrow: {
        left: widthTooltipEl / 2,
      },
    };







    // console.log(widthTooltipEl, heightTooltipEl, rightEl, bottomEl, widthContainerEl, heightContainerEl);


  }

  /**
   * CLear all kinds of timeout of interval
   */
  clearTimer() {
    clearTimeout(this.delayShowLoop);
    clearTimeout(this.delayHideLoop);
    clearInterval(this.intervalUpdateContent);
  }

  createTooltip() {
    const { baseClassName, hideOnMobile } = this.props;

    if (hideOnMobile && !!('ontouchstart' in window)) {
      // check for touch device - behaviour and events for touch device
      this.setState({ disable: true });
      // ↑↑↑ don't show tooltip at mobile
    }

    let tooltipElm = this._document.querySelector(`.${baseClassName}`);
    const container = this._document.querySelector('body');

    if (!tooltipElm) {
      tooltipElm = this._document.createElement('div');
      tooltipElm.setAttribute('class', `${baseClassName}`);
      const tooltipArrowOutside = this._document.createElement('span');
      tooltipArrowOutside.setAttribute('class', `${baseClassName}-arrow-outside`);
      const tooltipArrowInside = this._document.createElement('span');
      tooltipArrowInside.setAttribute('class', `${baseClassName}-arrow-inside`);
      const tooltipContent = this._document.createElement('span');
      tooltipContent.setAttribute('class', `${baseClassName}-content`);
      tooltipElm.appendChild(tooltipArrowOutside);
      tooltipElm.appendChild(tooltipArrowInside);
      tooltipElm.appendChild(tooltipContent);
      container.appendChild(tooltipElm);

      this.setState({ container, tooltipElm, tooltipArrowOutside, tooltipArrowInside, tooltipContent });
    } else {
      const tooltipArrowOutside = tooltipElm.querySelector(`.${baseClassName}-arrow-outside`);
      const tooltipArrowInside = tooltipElm.querySelector(`.${baseClassName}-arrow-inside`);
      const tooltipContent = tooltipElm.querySelector(`.${baseClassName}-content`);
      this.setState({ container, tooltipElm, tooltipArrowOutside, tooltipArrowInside, tooltipContent });
    }


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
  // container: 'body', --->
  // Appends the tooltip to a specific element
  // ↑↑↑ React Component doesn't work with appendChild
  // we should not affect ReactDOM
  dataTooltip: '',
  place: 'top',
  direction: 'horizontal',
  offset: {             // with cursor - top, right, bottom, left
    top: 15,
    bottom: 15,
    left: 5,
  },
  viewport: {           // Keeps the tooltip within the bounds of this element.
    selector: '.box',
    padding: {
      right: 5,
      left: 5,
    }
  },
  afterShow: null,      // PropTypes.func ::: Function that will be called after tooltip show
  afterHide: null,      // PropTypes.func ::: Function that will be called after tooltip hide
  isIframe: null,
  resizeHide: true,     // Hide the tooltip when resizing the window
  disable: false,       // ::: Disable the tooltip behaviour, default is false
  hideOnMobile: true,   // Default don't support mobile
  isFollowMouse: true,  // ~ effect of React-Tooltip
};

export default Tooltip;

// How to use ↓↓↓
// <Tooltip
//   dataTooltip={tooltipContent}
//   isIframe={props.config.iframeInstance}
// >
