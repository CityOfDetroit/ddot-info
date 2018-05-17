import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import Search from 'material-ui-icons/Search';

/** Search input for StopSearch */
class StopInput extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '.25em', border: '2px solid rgba(0, 68, 69, 0.2)', backgroundColor: '#fff' }}>
        <Search style={{ marginRight: '.25em', width: '1.25em', height: '1.25em' }} />
        <TextField
          label='Search by street name or stop ID' 
          placeholder='Try "Michigan", "Washington", "1118"'
          value={this.props.input}
          onChange={this.props.onSearchChange}
          fullWidth
          style={{ marginBottom: '1em', }} />
      </div>
    );
  }
}

StopInput.propTypes = {
  input: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
}

export default StopInput;
