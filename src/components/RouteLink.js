import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StopIcon from './BusStop';
import ScheduleIcon from '@material-ui/icons/Schedule';

import routeDetails from '../data/routeDetails.js'
import _ from 'lodash'

/** Linked route number and name with optional icons for RoutesList, NearbyList, StopTransfers and Stop */
class RouteLink extends Component {
  render() {
    const route = _.find(routeDetails, a => { return a.number === parseInt(this.props.id, 10) })

    return (
      <div>
        <div style={{ display: 'flex', alignItems:'center', justifyContent: 'space-between', backgroundColor: '#eee' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems:'center', justifyContent: 'center', width: '2em', height: '2em', backgroundColor: route.color, color: 'white', fontSize: '1.25em', fontWeight: 700 }}>
              <Link
                to={{ pathname: `/route/${this.props.id}`, state: { id: this.props.id } }}
                style={{ textDecoration: 'none', color: '#fff' }}>
                {this.props.id}
              </Link>
            </div> 
            <Link  
              to={{ pathname: `/route/${this.props.id}`, state: { id: this.props.id } }}
              style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: `1.1em`, fontFamily: "Gibson Detroit Light", fontWeight: 600, color: 'black', marginLeft: '.4em', paddingRight: '1em' }}>
                {route.name}
                {this.props.direction ? ` (${this.props.direction})` : ``}
              </span>
            </Link>
          </div>
          {this.props.icons ?
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Link to={{ pathname: `/route/${this.props.id}/stops` }} style={{ paddingRight: '.75em' }}>
                <StopIcon style={{ color: '#ccc', height: 22 }} />
              </Link>
              <Link to={{ pathname: `/route/${this.props.id}/schedule` }} style={{ paddingRight: '.75em' }}>
                <ScheduleIcon style={{ color: '#ccc', height: 22 }} />
              </Link>
            </div>
          : ``}
        </div>
      </div>
    );
  }
}

RouteLink.propTypes = {
  id: PropTypes.string.isRequired,
  icons: PropTypes.bool,
}

export default RouteLink;
