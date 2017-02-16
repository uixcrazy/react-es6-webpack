import React, { Component, PropTypes } from 'react';
import Tooltip from '../components/tooltip';

class Demo extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._isMounted = true;
    this.renderFrameContents();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getInitHtml(fileCss) {
    return `
      <!doctype html>
      <html class="no-js" lang="" style="overflow:hidden">
          <head>
              <meta charset="utf-8">
              <meta http-equiv="x-ua-compatible" content="ie=edge">
              <title>Sentifi Widget</title>
              <meta name="description" content="Sentifi Widget">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              ${fileCss ? `<link rel="stylesheet" href="${fileCss}" />` : ''}
          </head>
          <body><div id="gigido"></div></body>
      </html>
    `;
  }

  renderFrameContents() {
    if (!this._isMounted) {
      return;
    }
    const doc = this.iframeInstance.contentDocument;
    doc.open('text/html', 'replace');
    doc.write(this.getInitHtml(this.props.injectFileCss));
    doc.body.append(<div className="box">
      <Tooltip
        dataTooltip="Hooray! option specifies the tooltip placement mouse"
        container=".box"
      >
        <div className="item">fsdafsfhdfghfdg</div>
      </Tooltip>
    </div>);
    doc.close();
  }

  render() {
    return (
      <iframe
        className="gicungdc"
        scrolling="no"
        style={{ border: 'none', width: '100%' }}
        ref={ DOM => { this.iframeInstance = DOM; }}
      ></iframe>
    );
  }
}

Demo.defaultProps = {
  injectFileCss: null,
};

export default Demo;

// Hooray! option specifies the tooltip position. This is first box/ second box / thirth box