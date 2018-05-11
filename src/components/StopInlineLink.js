import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Stops from '../data/stops.js';

/** Linked stop name used in NearbyList, RealtimeCard, StopTransfers */
class StopInlineLink extends Component {
  render() {
    return (
      <span style={{ paddingLeft: '.25em', display: 'inline' }}>  
        <Link 
          style={{ fontSize: '1em', color: '#000', fontWeight: 300 }} 
          to={{ pathname: `/stop/${this.props.id}/` }}>
          <span>{this.props.showDir ? `${Stops[this.props.id].name} (${Stops[this.props.id].dir})` : `${Stops[this.props.id].name}`}</span>
        </Link>
        <span style={{ background: '#eee', fontSize: '.75rem', marginLeft: '.5rem', padding: '.25rem', display: 'inline-block' }}>#{this.props.id}</span>
      </span>
    );
  }
}

StopInlineLink.propTypes = {
  id: PropTypes.string.isRequired,
  exclude: PropTypes.string,
}

export default StopInlineLink;
