import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StopInput extends Component {
  render() {
    return (
      <div className="f5 pa2">
        <input className="w-90 pa2"
          placeholder='"Woodward & Mack" or "Meijer" or "1882"'
          value={this.props.input}
          onChange={this.props.onSearchChange} />
      </div>
    )
  }
}

StopInput.propTypes = {
  input: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
}

export default StopInput;
