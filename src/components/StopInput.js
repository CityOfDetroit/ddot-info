import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

class StopInput extends Component {
  render() {
    return (
      <TextField
        label='Search by street name or stop ID' 
        placeholder='Try: "Michigan", "Washington", "1118"'
        value={this.props.input}
        onChange={this.props.onSearchChange}
        fullWidth
        style={{ marginBottom: '1em' }} />
    )
  }
}

StopInput.propTypes = {
  input: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
}

export default StopInput;
