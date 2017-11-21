import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LineInput extends Component {
  render() {
    return (
      <input className='w-25'
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
