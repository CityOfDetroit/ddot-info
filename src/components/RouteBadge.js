import React, { Component } from 'react'
import PropTypes from 'prop-types'
import routeDetails from '../data/routeDetails.js'
import _ from 'lodash'

/** Non-linked route number and name for RouteDetails, RouteMap, RouteSchedule, RouteStops and Stop */
class RouteBadge extends Component {
  render() {
    // lookup route number in routeDetails
    const route = _.find(routeDetails, a => { return a.number === parseInt(this.props.id, 10) })

    return (
      <div>  
        <div style={{ display: 'flex', alignItems:'center', justifyContent: 'flex-start'}}>
          <div style={{ display: 'flex', alignItems:'center', justifyContent: 'center', width: '1.75em', height: '1.75em', backgroundColor: route.color, border: `1px solid ${route.color}`, borderRadius: route.radius, color: '#fff', fontSize: '1.1em', textAlign: 'center', fontWeight: 700, }}>
            {route.new_number || this.props.id}
          </div>
          { this.props.showName ? <span style={{ marginLeft: '.25em' }}>{route.new_name || route.name}</span> : null }
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
