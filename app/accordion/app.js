
import React from 'react';
import { render } from 'react-dom';
import Accordion from './components/accordion';
import './stylesheets/accordion.scss';

const data = [
  {
    summary: 'Wild Sunflower',
    details: `The cousin with sunflower is "wild sunflower". Vnes call "hoa dã quỳ".
          The wild sunflowers often bloom in late October in the winter as rainy season of Da Lat passes.`,
  },
  {
    summary: 'ox-eye daisy flowers',
    details: `In the late November, Hanoi streets appear pure white with carts full of ox-eye daisy flowers. Sellers usually took flowers in Quang Ba flower night market, Hanoi at about 3 am.
      On remaining days of autumn, such a little kind of flower seems bring a new color for Hanoi capital streets.`
  },
  {
    summary: 'Tam Giac Mach',
    details: `Travelers come to Ha Giang in November, have chance to not only admire Tam Giac Mach flower in full bloom and most beautiful across the hillsides and villages of Dong Van, Meo Vac and Yen Minh districts  but also join interesting festival.
    Blooming season in Ha Giang, Vietnam (tam giac mach flower season). The tam giac mach flower is one of main food (after rice) for tribal people in Ha Giang. They use its flower to make flour.`
  },
  {
    summary: 'Flamboyant',
    details: `Between May and July, flamboyant trees begin to show off their blazing red
    flowers with the sound of cicada in a summer chorus.`
  },
  {
    summary: 'Lotus',
    details: 'As Pure As a Lotus'
  },
]
render(<Accordion accordionData={data} />,
  document.getElementById('app'));