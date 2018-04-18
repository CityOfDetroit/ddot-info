import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StopIcon from './BusStop';
import IconButton from 'material-ui/IconButton';
import ScheduleIcon from 'material-ui-icons/Schedule';

import Schedules from '../data/schedules.js';

/** Linked route number and name with optional icons for RoutesList, NearbyList, StopTransfers and Stop */
class RouteLink extends Component {
  render() {
    const route = Schedules[this.props.id];

    return (
      <div>
        <div style={{ display: 'flex', alignItems:'center', justifyContent: 'space-between', backgroundColor: '#eee' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems:'center', justifyContent: 'center', width: '2em', height: '2em', backgroundColor: route.color, color: 'white', fontSize: '1.25em', fontWeight: 700 }}>
              {this.props.id}
            </div> 
            <Link  
              to={{ pathname: `/route/${this.props.id}`, state: { id: this.props.id, routeId: route.rt_id, name: route.rt_name } }}
              style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: `1.1em`, fontFamily: "Gibson Detroit Light", fontWeight: 600, color: 'black', marginLeft: '.4em', paddingRight: '1em' }}>
                {route.rt_name}
              </span>
            </Link>
          </div>
          {this.props.icons ?
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton component={Link} to={`/route/${this.props.id}/stops`} >
                <StopIcon style={{ color: '#ccc', height: 22 }} />
              </IconButton>
              <Link to={{pathname: `/route/${this.props.id}/schedule`}} >
                <IconButton>
                  <ScheduleIcon style={{ color: '#ccc', height: 22 }} />
                </IconButton>
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
  icons: PropTypes.bool
}

export default RouteLink;
