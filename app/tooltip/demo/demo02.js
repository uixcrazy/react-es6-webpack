/*
 * https://tylermcginnis.com/functional-components-vs-stateless-functional-components-vs-stateless-components/
 */
import React, { Component, PropTypes } from 'react';
import makeWrapperTooltip from '../components/WrapperTooltip';

const HelloWorld = ({ name }) => (
 <div>{`Hi ${name}`}</div>
);

// class Example extends React.Component {
//   render() {
//     return (
//       <div className="Example">
//         { this.props.children }
//       </div>
//     )
//   }
// }

const Example = (props) => {
  // console.log(props);
  return (
    <div className="Example">
      { props.children }
      <HelloWorld name={props.name}/>
    </div>
  );
};

export default props => {
  const FinalUI = makeWrapperTooltip(Example);
  // return <FinalUI {...props} />
  return <FinalUI {...props} />;
};
