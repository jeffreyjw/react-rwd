import React from 'react';

export default class Case extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.children;
  }
}
