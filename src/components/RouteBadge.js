import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Schedules from '../data/schedules.js'

class RouteLink extends Component {
  render() {
    const route = Schedules[this.props.id]

    return (
      <div>  
        <div style={{ display: 'flex', alignItems:'center', justifyContent: 'flex-start'}}>
          <div className='white fw7 f6 tc' style={{ display: 'flex', alignItems:'center', justifyContent: 'center', width: '1.5em', height: '1.5em', backgroundColor: route.color }}>
            {this.props.id}
          </div> 
          <div className='fw5 glow pl1' style={{fontSize: `.8em`}}>
            {route.rt_name}
          </div>
        </div>
      </div>
    )
  }
}

RouteLink.propTypes = {
  id: PropTypes.string.isRequired,
}
export default RouteLink;
