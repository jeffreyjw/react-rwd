import React from 'react';
import ReactDOM from 'react-dom';
import isFunction from 'is-function';

export default class RWD extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      childToDisplay: null
    };
  }

  componentDidMount() {
    this._boundHandleResize = this._handleResize.bind(this);
    window.addEventListener('resize', this._boundHandleResize);

    this._handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._boundHandleResize);
  }

  componentWillReceiveProps(newProps) {
    this._handleResize(newProps);
  }

  _getDimensions(props) {

    let el = ReactDOM.findDOMNode(this).parentNode;

    if (props.window || el === null) {
      return {
        w: window.innerWidth,
        h: window.innerHeight,
      };
    }
    else {
      return {
        w: el.clientWidth,
        h: el.clientHeight,
      };
    }
  }

  _areConstraintsMet(child, props) {
    let areConstraintsMet = true;

    const rwd = child.props.rwd || {};

    const dim = this._getDimensions(props);

    if (isFunction(rwd)) {
      return rwd(dim);
    }

    if (rwd.min && rwd.min >= dim.w) {
      areConstraintsMet = false;
    }

    if (rwd.max && rwd.max <= dim.w) {
      areConstraintsMet = false;
    }

    return areConstraintsMet;
  }

  _handleResize(e, props) {
    let childToDisplay = null;

    props = props ? props : this.props;

    React.Children.forEach(props.children, (child) => {
      if (childToDisplay) {
        return;
      }

      if (this._areConstraintsMet(child, props)) {
        childToDisplay = child;
      }
    });

    if (childToDisplay !== this.state.childToDisplay) {
      this.setState({
        childToDisplay: childToDisplay
      });
    }
  }

  render() {
    return this.state.childToDisplay ? this.state.childToDisplay : <noscript/>;
  }
}
