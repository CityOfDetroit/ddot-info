import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Stops from '../data/stops.js'
import Schedules from '../data/schedules.js'

class StopLink extends Component {
  render() {
    const exclude = this.props.exclude || ''

    return (
      <div className="h2" style={{ display: 'flex', alignItems: 'center', justifyContent:'justify-between' }}>
        <Link 
          className="dim black hover-mid-gray glow mr1" 
          to={{ pathname: `/stop/${this.props.id}/` }}>
          {Stops[this.props.id] ? Stops[this.props.id].name : ``}
        </Link>
        {Stops[this.props.id] ? Stops[this.props.id].routes.map(r => (
          <span className={exclude.toString() === r.toString() ? "dn" : "pa1 dib white fw7 f7 ma1"} style={{backgroundColor: Schedules[r].color}}>
            <Link className="white dim glow" to={{pathname: `/route/${r}`}}>{r}</Link>
          </span>
        )) : `FAILED`}
      </div>
    )
  }
}

StopLink.propTypes = {
  id: PropTypes.string.isRequired,
  exclude: PropTypes.number,
}

export default StopLink
