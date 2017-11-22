import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './main.scss';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      counter: 0,
    };
  }

  handleClick(e) {
    e.preventDefault();
    const counter = this.state.counter + 1;
    this.setState({ counter });
  }

  render() {
    return (
      <div className={this.props.className}>
        <span>{this.state.counter}</span>{' '}
        <button onClick={this.handleClick}>Add 1</button>
      </div>
    );
  }
}

App.propTypes = {
  className: PropTypes.string,
};

App.defaultProps = {
  className: 'main-wrapper',
};

ReactDOM.render(
  <App />,
  document.getElementById('main'),
);
