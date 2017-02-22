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
    const xCursor = mouseX - (widthTooltipEl / 2);
    const yCursor = mouseY - (heightTooltipEl + 10 + offset);
    const rightEl = xCursor + widthTooltipEl;

    let xCursorFinal = xCursor;
    let yCursorFinal = yCursor;
    let positionArrowLeft = widthTooltipEl / 2;
    let currentPlace = null;
    let currentHide = false;

    // ↓↓↓ not enough width to show tooltip
    if (widthContainerEl < widthTooltipEl) return { hide: true };
    // ↑↑↑

    if (xCursor < leftContainerEl) { // to left
      const deviate = leftContainerEl - xCursor;
      xCursorFinal = leftContainerEl;
      positionArrowLeft = (widthTooltipEl / 2) - deviate;
      if (positionArrowLeft < 10) positionArrowLeft = 10;
    }

    if (rightEl > maxLeftContainer) { // to right
      xCursorFinal = maxLeftContainer - widthTooltipEl;
      let deviate = xCursor - xCursorFinal;
      const deviateMax = (widthTooltipEl / 2) - 10;
      if (deviate > deviateMax) deviate = deviateMax;
      positionArrowLeft = (widthTooltipEl / 2) + deviate;
    }

    if (yCursor < topContainerEl) { // to bottom
      yCursorFinal = mouseY + 30 + offset;
      currentPlace = 'bottom';
      const bottomTooltipEl = yCursorFinal + heightTooltipEl;
      // ↓↓↓ not enough height to show tooltip
      if (bottomContainerEl - bottomTooltipEl < 0) currentHide = true;
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
    if (!isFollowMouse) {
      const boundingClientRectTarget = target.getBoundingClientRect();
      const targetTop = boundingClientRectTarget.top;
      const targetLeft = boundingClientRectTarget.left;
      const targetWidth = target.clientWidth;
      return ({
        position: {
          left: targetLeft + (targetWidth / 2) - (widthTooltipEl / 2),
          top: targetTop + heightTooltipEl + 10 + offset,
        },
      });
    }
    const xCursor = mouseX - (widthTooltipEl / 2);
    const yCursor = mouseY + 30 + offset;
    const rightEl = xCursor + widthTooltipEl;
    const bottomEl = yCursor + heightTooltipEl;

    let xCursorFinal = xCursor;
    let yCursorFinal = yCursor;
    let positionArrowLeft = widthTooltipEl / 2;
    let currentPlace = null;
    let currentHide = false;

    // ↓↓↓ not enough width to show tooltip
    if (widthContainerEl < widthTooltipEl) return { hide: true };
    // ↑↑↑

    if (xCursor < leftContainerEl) { // to left
      const deviate = leftContainerEl - xCursor;
      xCursorFinal = leftContainerEl;
      positionArrowLeft = (widthTooltipEl / 2) - deviate;
      if (positionArrowLeft < 10) positionArrowLeft = 10;
    }

    if (rightEl > maxLeftContainer) { // to right
      xCursorFinal = maxLeftContainer - widthTooltipEl;
      let deviate = xCursor - xCursorFinal;
      const deviateMax = (widthTooltipEl / 2) - 10;
      if (deviate > deviateMax) deviate = deviateMax;
      positionArrowLeft = (widthTooltipEl / 2) + deviate;
    }

    if (bottomEl > heightContainerEl + topContainerEl) { // to top
      yCursorFinal = mouseY - (heightTooltipEl + 10 + offset);
      currentPlace = 'top';
      if (yCursorFinal < topContainerEl) currentHide = true;
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

  // default - NOOOO
}
