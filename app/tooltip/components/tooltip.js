/**
 * Simple Tooltip
 * @author:  LVTD
 * @version: 1.0.0
 * =======================================================
 * @param: container, selector  ||  NO support: placement - allway auto; padding
 * @methods: show, hide
 * @event: hover
 * @returns {I don't know}

 * description
 hide/show: add/remove class in
 setPosition : add class - top/ bottom
 !important: clear before show

 * test:
  - container có border
  - top | bottom
*/
const CLASS_TOOLTIP = 'tooltip';
const CLASS_TOOLTIP_INNER = 'tooltip-inner';

class Tooltip {
  constructor(container, selector) {
    //this.container = container;
    const _this = this;
    Array.prototype.slice.call(document.getElementsByClassName(container)).forEach(function(container) {
      const tooltipEl = _this.createTooltipEl(container);
      const items = container.querySelectorAll(`.${selector}`); // equals $(this).find(class child);
      Array.prototype.slice.call(items).forEach(function(item) {
        const __this = item;
        __this.onmousemove = function() { _this.show(event, container, __this, tooltipEl)};
        __this.onmouseleave = function() { _this.hide(event, __this, tooltipEl)}
      });
      // console.log(items);
    });

  }

  show(event, container, el, tooltipEl) {

    //const widthParentEl = container.clientWidth;  // ko tính border
    //const heightParentEl = container.clientHeight;
    const topParentEl = container.offsetTop;  // tính cả border
    const leftParentEl = container.offsetLeft;
    const topParentElBorder = container.clientTop;
    const leftParentElBorder = container.clientLeft;

    //event.preventdefault();
    // const tooltipInnerEl = document.getElementsByClassName(CLASS_TOOLTIP_INNER)[0];
    const tooltipInnerEl = tooltipEl.querySelector(`.${CLASS_TOOLTIP_INNER}`);

    tooltipInnerEl.innerHTML = el.getAttribute('data-tooltip');

    const xEvent = event.pageX;
    const yEvent = event.pageY;
    const widthTooltipEl = tooltipEl.offsetWidth;
    const heightTooltipEl = tooltipEl.offsetHeight;
    const xCursor = xEvent - (leftParentEl + leftParentElBorder);
    const yCursor = yEvent - (topParentEl + topParentElBorder);

    document.getElementById('demo').innerHTML = 'X: '+ xEvent + ' Y: ' + yEvent + ` - xCursor ${xCursor} - yCursor ${yCursor} - height of tooltipBox ${heightTooltipEl}`;

    if(yCursor < (heightTooltipEl + 20)) {
      tooltipEl.classList.remove('top');
      tooltipEl.classList.add('bottom');
      tooltipEl.style.left = (xCursor - (widthTooltipEl/2)) + 'px';
      tooltipEl.style.top = (yCursor + 20) + 'px';
    } else {
      tooltipEl.classList.remove('bottom');
      tooltipEl.classList.add('top');
      tooltipEl.style.left = (xCursor - (widthTooltipEl/2)) + 'px';
      tooltipEl.style.top = (yCursor - (heightTooltipEl + 20)) + 'px';
    }
    tooltipEl.classList.add('in');
  }

  hide(event, el, tooltipEl) {
    tooltipEl.classList.remove('in');
  }

  createTooltipEl(parentEl) {
    const tooltipEl = document.createElement('div');
    tooltipEl.className = CLASS_TOOLTIP; // d.className += ' additionalClass';
    // tooltipEl.createTextNode("CLICK ME");       // Create a text node

    // <div class="sf-tooltip-arrow"></div><div class="sf-tooltip-inner">
    const tooltipArrowEl = document.createElement('div');
    tooltipArrowEl.className = 'tooltip-arrow';
    const tooltipInnerEl = document.createElement('div');
    tooltipInnerEl.className = 'tooltip-inner';

    tooltipEl.appendChild(tooltipArrowEl);
    tooltipEl.appendChild(tooltipInnerEl);
    parentEl.appendChild(tooltipEl);
    return tooltipEl;
  }
}

export default Tooltip;

// const demo = new Tooltip('box', 'item');

// next task
//  - clear before show
//  - show on container

// trigger: 'hover focus',


