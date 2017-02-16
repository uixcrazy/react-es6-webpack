/**
 * Tooltip.js
 * A basic script that applies a mouseover tooltip functionality to all elements of a page that have a data-tooltip attribute
 * Matthias Schuetz, http://matthiasschuetz.com
 *
 * Copyright (C) Matthias Schuetz
 * Free to use under the MIT license
 */

export default class Tooltip {
  constructor(container) {
    this.state = {
      tooltips: [],
      tooltipsTemp: null,
    };
    this.props = {
      tooltipId: 'tooltip',
      offsetDefault: 15,
      container,
    };
    this.bindTooltips = this._bindTooltips.bind(this);
    this.createTooltip = this._createTooltip.bind(this);
    this.getTooltipElm = this._getTooltipElm.bind(this);
    this.onElementMouseMove = this._onElementMouseMove.bind(this);
    this.onElementMouseOut = this._onElementMouseOut.bind(this);
    this.onElementMouseOver = this._onElementMouseOver.bind(this);
    this.bindTooltips();
  }

  _createTooltip(text) {
    // console.log(text);
    const tooltipElm = document.createElement('div');
    const tooltipText = this.props.container.createTextNode(text);

    tooltipElm.setAttribute('id', this.props.tooltipId);
    tooltipElm.appendChild(tooltipText);
    this.props.container.appendChild(tooltipElm);
  }

  _getTooltipElm() {
    return this.props.container.querySelector(`#${this.props.tooltipId}`);
  }

  _onElementMouseMove(evt, elm) {
    // console.log(evt, elm);
    const tooltipId = evt.target.getAttribute('data-tooltip-id');
    const tooltipElm = this.getTooltipElm();
    const options = tooltipId && this.state.tooltips[tooltipId] && this.state.tooltips[tooltipId].options;
    const offset = options && options.offset || this.state.tooltips.offsetDefault; // continues
    const scrollY = this.props.container.scrollY || this.props.container.pageYOffset;
    const scrollX = this.props.container.scrollX || this.props.container.pageXOffset;
    let tooltipTop = evt.pageY + offset;
    let tooltipLeft = evt.pageX + offset;

    console.log(tooltipId)

    if (tooltipElm) {
      tooltipTop = (tooltipTop - scrollY + tooltipElm.offsetHeight + 20 >= this.props.container.innerHeight
        ? (tooltipTop - tooltipElm.offsetHeight - 20)
        : tooltipTop);
      tooltipLeft = (tooltipLeft - scrollX + tooltipElm.offsetWidth + 20 >= this.props.container.innerWidth
        ? (tooltipLeft - tooltipElm.offsetWidth - 20)
        : tooltipLeft);

      tooltipElm.style.top = `${tooltipTop}px`;
      tooltipElm.style.left = `${tooltipLeft}px`;
    }
  }

  _onElementMouseOut(evt) {
    const tooltipElm = this.getTooltipElm();
    if (tooltipElm) {
      this.props.container.querySelector(this.props.container).removeChild(tooltipElm);
    }
  }

  _onElementMouseOver(evt) {
    // console.log(evt)
    const tooltipId = evt.target.getAttribute('data-tooltip-id');
    console.log(tooltipId);
    const tooltipText = tooltipId && this.state.tooltips[tooltipId] && this.state.tooltips[tooltipId].text;

    console.log(tooltipText);

    if (tooltipText) {
      this.createTooltip(tooltipText);
    }
  }

  _bindTooltips(resetTooltips) {
    if (resetTooltips) {
      this.setState(Object.assign({}, this.state, {
        tooltips: [],
        tooltipsTemp: this.state.tooltips.concat(),
      }));
      // _tooltipsTemp = _tooltips.concat();
      // _tooltips = [];
    }
    Array.prototype.forEach.call(this.props.container.querySelectorAll('[rel="tooltip"]'), (elm, idx) => {
      let tooltipText = elm.getAttribute('data-original-title').trim();

      if (resetTooltips
        && this.state.tooltipsTemp.length
        && this.state.tooltipsTemp[idx]
        && this.state.tooltipsTemp[idx].text) {
        if (tooltipText.length === 0) {
          elm.setAttribute('data-original-title', this.state.tooltipsTemp[idx].text);
          tooltipText = this.state.tooltipsTemp[idx].text;
        }

        elm.removeEventListener('mousemove', evt => this.onElementMouseMove(evt, elm));
        elm.removeEventListener('mouseout', evt => this.onElementMouseOut(evt, elm));
        elm.removeEventListener('mouseover', evt => this.onElementMouseOver(evt, elm));
      }

      if (tooltipText) {
        elm.setAttribute('data-original-title', '');
        elm.setAttribute('data-tooltip-id', idx);
        this.state.tooltips[idx] = {
          text: tooltipText,
        };
        elm.addEventListener('mousemove', evt => this.onElementMouseMove(evt, elm));
        elm.addEventListener('mouseout', evt => this.onElementMouseOut(evt, elm));
        elm.addEventListener('mouseover', evt => this.onElementMouseOver(evt, elm));
      }
    });

    if (resetTooltips) {
      this.state.tooltipsTemp = null;
    }
  }
}
