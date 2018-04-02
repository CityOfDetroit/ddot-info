import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Stops from '../data/stops.js';

// const defaultStyles = {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   borderBottom: '1px dashed #ccc',
// }

class StopInlineLink extends Component {
  render() {
    // const exclude = this.props.exclude || '';
    // let routes = [];

    // if (Stops[this.props.id]) {
    //   routes = Array.from(new Set(Stops[this.props.id].routes.map(r => r[0]).concat(Stops[this.props.id].transfers.map(r => r[0]))))
    // }

    return (
      <span style={{padding: 0, display: 'inline'}}>  
          <Link 
            className="dim black fw3 hover-mid-gray glow mb1" style={{ fontSize: '1em' }} 
            to={{ pathname: `/stop/${this.props.id}/` }}>
            <span>{this.props.showDir ? `${Stops[this.props.id].name} (${Stops[this.props.id].dir})` : `${Stops[this.props.id].name}`}</span>
          </Link>
          <span className="pa1 f7 dib ml2" style={{ background: '#eee' }}>#{this.props.id}</span>
      </span>
    )
  }
}

StopInlineLink.propTypes = {
  id: PropTypes.string.isRequired,
  exclude: PropTypes.string,
}

export default StopInlineLink;
