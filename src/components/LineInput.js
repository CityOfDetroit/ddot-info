import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LineInput extends Component {
  render() {
    return (
      <div  className="f5 ml2 w-75">
      <input className="w-90 pa2"
              placeholder="Search for a line name or number."
              value={this.props.input}
              onChange={this.props.onSearchChange} />
      </div>
    )
  }
}

LineInput.propTypes = {
  input: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
}

export default LineInput;
