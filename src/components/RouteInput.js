import React, { Component } from 'react';
import {TextField} from 'material-ui';
import PropTypes from 'prop-types';

class RouteInput extends Component {
  render() {
    return (
        <TextField
          label='Search by route name or number'
          placeholder='Try: "Woodward", "Dexter", "53", "16"'
          value={this.props.input}
          onChange={this.props.onSearchChange}
          margin='dense'
          fullWidth />
    );
  }
}

RouteInput.propTypes = {
  input: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default RouteInput;
