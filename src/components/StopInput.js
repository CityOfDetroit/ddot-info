import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StopInput extends Component {
  render() {
    return (
      <div className="f7">
        <input className="pa1"
          style={{width: '250px'}}
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
