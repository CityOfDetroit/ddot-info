import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Schedules from '../data/schedules.js'

class RouteLink extends Component {
  render() {
    const route = Schedules[this.props.id]

    return (
<Link 
            className="dim black link underline-hover hover-mid-gray glow" 
            to={{ pathname: `/route/${this.props.id}`, state: { id: this.props.id, routeId: route.rt_id, name: route.rt_name } }}>  
      <div style={{ display: 'flex', alignItems:'center', justifyContent: 'flex-start', backgroundColor: `#eee`}}>
        <div className='white fw7 f5 tc' style={{ display: 'flex', alignItems:'center', justifyContent: 'center', width: '2em', height: '2em', backgroundColor: route.color }}>
          {this.props.id}
        </div> 
        <div className='fw5 glow pl1' style={{fontSize: `.9em`}}>
          {route.rt_name}
        </div>
      </div>
      </Link>
    )
  }
}

RouteLink.propTypes = {
  id: PropTypes.string.isRequired,
}
export default RouteLink;
