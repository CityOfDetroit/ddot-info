import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LineInput extends Component {
  render() {
    return (
      <input  className="w-75 mt3 ml2 pa2 f4"
              placeholder="Search for a line name or number."
              value={this.props.input}
              onChange={this.props.onSearchChange} />
    )
  }
}

LineInput.propTypes = {
  input: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
}

export default LineInput;
