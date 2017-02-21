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

  if (!isFollowMouse) {
    console.log('status');
    const targetTop = target.top;
    const targetLeft = target.left;
    const targetWidth = target.clientWidth;
    const targetHeight = target.clientHeight;
    return ({
      position: {
        left: targetLeft + (targetWidth / 2),
        top: targetTop + (targetHeight / 2),
      },
    });
  }

  const mouseX = event.clientX;
  const mouseY = event.clientY;

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

  // top ↓↓↓
  if (place === 'top') {
    const xCursor = mouseX - (widthTooltipEl / 2);
    const yCursor = mouseY - (heightTooltipEl + offset);

    const rightEl = xCursor + widthTooltipEl;
    // const bottomEl = yCursor + heightTooltipEl;

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

    if (yCursor < topContainerEl) { // to top
      yCursorFinal = mouseY + 20 + offset;
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

  if (place === 'bottom') {

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
