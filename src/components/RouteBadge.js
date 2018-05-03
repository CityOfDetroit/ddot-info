import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Schedules from '../data/schedules.js'

/** Non-linked route number and name for RouteDetails, RouteMap, RouteSchedule, RouteStops and Stop */
class RouteBadge extends Component {
  render() {
    const route = Schedules[this.props.id];

    return (
      <div>  
        <div style={{ display: 'flex', alignItems:'center', justifyContent: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems:'center', justifyContent: 'center', width: '1.5em', height: '1.5em', backgroundColor: route.color, color: '#fff', fontSize: '1.1em', textAlign: 'center', fontWeight: 700, }}>
            {this.props.id}
          </div>
          { this.props.showName ? <span style={{ marginLeft: '.25em' }}>{route.rt_name}</span> : null }
        </div>
      </div>
    );
  }
}

RouteBadge.propTypes = {
  id: PropTypes.string.isRequired,
  showName: PropTypes.bool,
}

export default RouteBadge;
