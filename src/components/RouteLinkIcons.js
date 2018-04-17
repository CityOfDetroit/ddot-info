import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import BusIcon from 'material-ui-icons/Timeline';
import StopIcon from 'material-ui-icons/DirectionsBus';
import IconButton from 'material-ui/IconButton'
import ScheduleIcon from 'material-ui-icons/Schedule'

import Schedules from '../data/schedules.js';

class RouteLinkIcons extends Component {
  render() {
    const route = Schedules[this.props.id];

    return (
      <div>
        <div style={{ display: 'flex', alignItems:'center', justifyContent: 'space-between', backgroundColor: '#eee' }}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{ display: 'flex', alignItems:'center', justifyContent: 'center', width: '2em', height: '2em', backgroundColor: route.color, color: 'white', fontSize: '1.25em', fontWeight: 700 }}>
              {this.props.id}
            </div> 
            <Link  
              to={{ pathname: `/route/${this.props.id}`, state: { id: this.props.id, routeId: route.rt_id, name: route.rt_name } }}
              style={{textDecoration: 'none'}}>
            <span style={{ fontSize: `1.1em`, fontFamily: "Gibson Detroit Light", fontWeight: 600, color: 'black', marginLeft: '.4em' }}>
              {route.rt_name}
            </span>
            </Link>
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            {/* <Link to={{pathname: `/route/${this.props.id}/stops`}} style={{":hover": 'green'}} > */}
              <IconButton component={Link} to={`/route/${this.props.id}/stops`} >
                <StopIcon style={{color: '#ccc', height: 22}} />
              </IconButton>
            {/* </Link> */}
            <Link to={{pathname: `/route/${this.props.id}/schedule`}} >
              <IconButton>
                <ScheduleIcon style={{color: '#ccc', height: 22}} />
              </IconButton>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

RouteLinkIcons.propTypes = {
  id: PropTypes.string.isRequired,
}

export default RouteLinkIcons;
