import React, { Component } from 'react';
import { render } from 'react-dom';
require('./style.css');

export default class App extends Component {
// function requireAll(r) { r.keys().forEach(r); }
  requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
  }

  toObject(arr) {
    const rv = {};
    arr.forEach((value, index) => {
      // console.log(arr[i].split('/').pop());
      const filename = value.replace(/^.*[\\\/]/, '');
      const name = filename.split('.').shift();
      rv[name] = value;
    });
    return rv;
  }

  render() {
    const allFileArr = this.requireAll(require.context('!!file-loader?name=[name].[ext]!./images', true, /^\.\/.*\.jpg$/));
    const allFile = this.toObject(allFileArr);
    console.log(allFile);
    // console.log(this.availImages); --> static function
    const imgAlt = 'bee_card';
    const keys = Object.keys(allFile);
    // const imgUrl = allFile[imgAlt] || allFile[keys[0]];
    const imgUrl = allFile[imgAlt] || require('./images/bee.jpg');
    return (
      <div>
        <img src={ require('./images/bee03.jpg') } />
        <img src={ imgUrl } alt={ imgAlt } />
      </div>
    );
  }
}

render(
  <App />,
  document.getElementById('root')
);
