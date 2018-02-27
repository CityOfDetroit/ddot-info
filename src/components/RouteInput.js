import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RouteInput extends Component {
  render() {
    return (
      <div className="f7">
        <input className="pa1"
          style={{width: '250px'}}
          placeholder='Search by name or number: ex. "Woodward", "53"'
          value={this.props.input}
          onChange={this.props.onSearchChange} />
      </div>
    )
  }
}

RouteInput.propTypes = {
  input: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
}

export default RouteInput;
