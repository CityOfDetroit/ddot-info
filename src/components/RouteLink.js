import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Schedules from '../data/schedules.js'

class RouteLink extends Component {
  render() {
    const route = Schedules[this.props.id]

    return (
      <div style={{ display: 'flex', alignItems:'center' }}>
        <span className='white fw7 f5 w2 pv2 tc' style={{ backgroundColor: route.color }}>
          {this.props.id}
        </span> 
        <span className='tr pl1 f5 fw6 pl2 glow'>
          <Link 
            className="dim black hover-mid-gray glow" 
            to={{ pathname: `/route/${this.props.id}`, state: { id: this.props.id, routeId: route.rt_id, name: route.rt_name } }}>
              {route.rt_name}</Link>
        </span>
      </div>
    )
  }
}

RouteLink.propTypes = {
  id: PropTypes.string.isRequired,
}

export default RouteLink
