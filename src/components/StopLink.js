import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Stops from '../data/stops.js';
import Schedules from '../data/schedules.js';

const defaultStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: '1px dashed #ccc',
  width: '100%',
  padding: '.5rem'
}

/** Linked stop name and id for RouteStopList */
class StopLink extends Component {
  render() {
    const exclude = this.props.exclude || '';
    let routes = [];

    if (Stops[this.props.id]) {
      routes = Array.from(new Set(Stops[this.props.id].routes.map(r => r[0]).concat(Stops[this.props.id].transfers.map(r => r[0]))))
    }

    return (
      <div style={this.props.showBorder ? { ...defaultStyles, marginLeft: '1em', borderLeft: `6px solid ${this.props.color}`} : defaultStyles }>  
        {this.props.showBorder ? 
          <span style={{ marginLeft: '-1.25em', border: this.props.isTimepoint ? '.25em solid black' : `.25em solid ${this.props.color}`, backgroundColor: !this.props.isTimepoint ? 'white' : 'black', borderRadius: '4em', height: '11px', width: '11px', marginRight: '1em', zIndex: 2 }} />
          : ``}
          <div style={{ width: '50%' }}>
            <Link 
              style={{ color: '#000', display: 'block', marginBottom: '.25rem', fontSize: '1em', fontWeight: !this.props.isTimepoint ? 'normal' : 'bold' }} 
              to={{ pathname: `/stop/${this.props.id}/` }}>
              <span>{this.props.showDir ? `${Stops[this.props.id].name} (${Stops[this.props.id].dir})` : `${Stops[this.props.id].name}`}</span>
            </Link>
            <span style={{ padding: '.25rem', fontSize: '.75rem', background: '#eee' }}>#{this.props.id}</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', width: '50%' }}>
          {Stops[this.props.id] && routes.length < 25 ? routes.map((r, i) => (
            <Link style={exclude.toString() === r.toString() ? { display: 'none' } : { marginRight: '.5rem', textDecoration: 'none' }} to={{pathname: `/route/${r}`}} key={i}>
              <div style={exclude.toString() === r.toString() ? { display: 'none' } : { display: 'flex', alignItems:'center',  justifyContent: 'center', width: '2em', height: '2em', backgroundColor: Schedules[r].color, color: '#fff', fontWeight: 700 }}>
                {r}
              </div> 
            </Link>
          )) : `All downtown routes`}
          </div>
      </div>
    );
  }
}

StopLink.propTypes = {
  id: PropTypes.string.isRequired,
  exclude: PropTypes.string,
}

export default StopLink;
