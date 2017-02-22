/**
 * Calculate the position of tooltip
 *
 * @params
 * - `event` {Event} the event of current mouse
 * - `target` {Element} the currentTarget of the event
 * - `container` {DOM} Keeps the tooltip within the bounds of this element.
 * - `tooltipEl` {DOM}
 * - `place` {String} top / right / bottom / left
 * - `isFollowMouse` {String} true / false
 * - `offset` {Number} the offset to default position
 *
 * @return {Object
 * - `newState` {Object}
 * - `position` {OBject} {left: {Number}, top: {Number}}
 * - `positionArrow` {OBject} {left: {Number}, top: {Number}}
 */

// export default function (e, target, node, place, effect, offset) {
export default function(event, target, container, tooltipEl, place, isFollowMouse, offset) {
  // console.log(event, target, container, tooltipEl, place, isFollowMouse, offset);
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const boundingClientRectContainer = container.getBoundingClientRect(); // for browser's window
  const topContainerEl = boundingClientRectContainer.top;  // border + padding
  const leftContainerEl = boundingClientRectContainer.left;
  const widthContainerEl = container.offsetWidth; // border
  const heightContainerEl = container.offsetHeight;
  const widthTooltipEl = tooltipEl.offsetWidth;
  const heightTooltipEl = tooltipEl.offsetHeight;
  const maxLeftContainer = widthContainerEl + leftContainerEl;
  const bottomContainerEl = topContainerEl + heightContainerEl;

  // top ↓↓↓
  if (place === 'top') {
    const xCursor = mouseX - (widthTooltipEl / 2);
    const yCursor = mouseY - (heightTooltipEl + 10 + offset);

    const rightEl = xCursor + widthTooltipEl;
    // const bottomEl = yCursor + heightTooltipEl;
    if (!isFollowMouse) {
      const boundingClientRectTarget = target.getBoundingClientRect();
      const targetTop = boundingClientRectTarget.top;
      const targetLeft = boundingClientRectTarget.left;
      const targetWidth = target.clientWidth;
      return ({
        position: {
          left: targetLeft + (targetWidth / 2) - (widthTooltipEl / 2),
          top: targetTop - heightTooltipEl - 10 - offset,
        },
      });
    }

    let xCursorFinal = xCursor;
    let yCursorFinal = yCursor;
    let positionArrowLeft = widthTooltipEl / 2;
    let currentPlace = null;
    let currentHide = false;

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

    if (yCursor < topContainerEl) { // to bottom
      yCursorFinal = mouseY + 30 + offset;
      currentPlace = 'bottom';
      const bottomTooltipEl = yCursorFinal + heightTooltipEl;
      if (bottomContainerEl - bottomTooltipEl < 0) currentHide = true;  // not enough height to show tooltip
    }

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

  if (place === 'bottom') {
    // if (bottomEl > heightContainerEl + topContainerEl) {
    //   console.log('=================== vượt bottom');
    //   return;
    // }

  }

  // default
  // return {
  //   position: {
  //     left: mouseX,
  //     top: mouseY,
  //   },
  //   positionArrow: {
  //     left: widthTooltipEl / 2,
  //   },
  // };
}
