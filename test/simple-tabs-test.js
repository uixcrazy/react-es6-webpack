import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import SimpleTabs from '../app/simple-tabs/components/simple-tabs';

describe("A suite", function() {
  // false ↓↓↓
  // it("contains spec with an expectation", function() {
  //   expect(shallow(<SimpleTabs />).contains(<div className="simple-tabs" />)).to.equal(true);
  // });

  it("contains spec with an expectation", function() {
    expect(shallow(<SimpleTabs />).is('.simple-tabs')).to.equal(true);
  });

  it("contains spec with an expectation", function() {
    expect(mount(<SimpleTabs />).find('.simple-tabs').length).to.equal(1);
  });
});
