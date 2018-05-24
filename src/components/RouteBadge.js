import React, { Component } from 'react'
import PropTypes from 'prop-types'
import routeDetails from '../data/routeDetails.js'
import _ from 'lodash'

/** Non-linked route number and name for RouteDetails, RouteMap, RouteSchedule, RouteStops and Stop */
class RouteBadge extends Component {
  render() {
    // lookup route number in routeDetails
    const route = _.find(routeDetails, a => { return a.number === parseInt(this.props.id, 10) })
    console.log(route)

    return (
      <div>  
        <div style={{ display: 'flex', alignItems:'center', justifyContent: 'flex-start'}}>
          <div style={{ display: 'flex', alignItems:'center', justifyContent: 'center', width: '1.75em', height: '1.75em', backgroundColor: route.color, color: '#fff', fontSize: '1.1em', textAlign: 'center', fontWeight: 700, }}>
            {this.props.id}
          </div>
          { this.props.showName ? <span style={{ marginLeft: '.25em' }}>{route.name}</span> : null }
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
