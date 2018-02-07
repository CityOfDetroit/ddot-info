import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StopInput extends Component {
  render() {
    return (
      <div  className="f5 pa2 w-100">
      <input className="pa2 w-90" style={{border: '3px solid #ddd'}}
        placeholder="Search for a stop name or number..."
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
