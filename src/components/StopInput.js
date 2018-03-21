import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

class StopInput extends Component {
  render() {
    return (
      <div>
        <TextField
          floatinglabeltext='Search by street name or stop ID'
          hinttext='E.g. "Michigan" or "1118"'
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
