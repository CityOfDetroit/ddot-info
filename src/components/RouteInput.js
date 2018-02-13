import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RouteInput extends Component {
  render() {
    return (
      <div  className="f5 ml2 w-75">
      <input className="w-90 pa2"
        placeholder="Search by route name or number, eg 'Woodward' or '53'"
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
