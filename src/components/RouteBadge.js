import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Schedules from '../data/schedules.js'

class RouteBadge extends Component {
  render() {
    const route = Schedules[this.props.id]

    return (
      <div>  
        <div style={{ display: 'flex', alignItems:'center', justifyContent: 'flex-start'}}>
          <div className='white fw7 f6 tc' style={{ display: 'flex', alignItems:'center', justifyContent: 'center', width: '2em', height: '2em', backgroundColor: route.color }}>
            {this.props.id}
          </div> 
          {/* <div className='fw5 glow pl1' style={{fontSize: `.8em`}}>
            {route.rt_name}
          </div> */}
        </div>
      </div>
    )
  }
}

RouteBadge.propTypes = {
  id: PropTypes.string.isRequired,
}
export default RouteBadge;
