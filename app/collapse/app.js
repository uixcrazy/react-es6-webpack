
import React from 'react';
import { render } from 'react-dom';
import Collapse from './components/collapse';
import './stylesheets/collapse.scss';

const data = {
  summary: 'Wild Sunflower',
  details: `The cousin with sunflower is "wild sunflower". Vnes call "hoa dã quỳ".
        The wild sunflowers often bloom in late October in the winter as rainy season of Da Lat passes.`,
}
render(
  <Collapse summary={data.summary} details={data.details} />,
  document.getElementById('app'));