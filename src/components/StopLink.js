import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class StopLink extends Component {
  render() {
    return (
      <span className='f7 fw3 glow'>
        <Link className="dim black hover-mid-gray glow" to={{pathname: `/stop/${this.props.id}/`}}>{this.props.name}</Link>
      </span>
    )
  }
}

StopLink.propTypes = {
  id: PropTypes.string.isRequired,
}

export default StopLink;
