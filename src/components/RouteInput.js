import React, { Component } from 'react';
import {TextField} from 'material-ui';
import PropTypes from 'prop-types';

/** Text input for RouteSearch */
class RouteInput extends Component {
  render() {
    return (
        <TextField
          label='Search by route name or number'
          placeholder='Try: "Woodward", "Dexter", "53", "16"'
          value={this.props.input}
          onChange={this.props.onSearchChange}
          fullWidth 
          style={{ marginBottom: '1em' }} />
    );
  }
}

RouteInput.propTypes = {
  input: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
}

export default RouteInput;
