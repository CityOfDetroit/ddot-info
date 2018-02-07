import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Stops from '../data/stops.js'
import Schedules from '../data/schedules.js'

class StopLink extends Component {
  render() {
    const exclude = this.props.exclude || ''

    return (
      <div className="h3" style={{ display: 'flex', justifyContent: 'center', verticalAlign: 'center', flexDirection: 'column', }}>
        <div>
          <Link 
            className="dim black hover-mid-gray glow mr1" 
            to={{ pathname: `/stop/${this.props.id}/` }}>
            <strong>{Stops[this.props.id] ? Stops[this.props.id].name : ``}</strong>
          </Link>
          {Stops[this.props.id] ? Stops[this.props.id].routes.map((r, i) => (
            <span className={exclude.toString() === r.toString() ? "dn" : "pa1 dib white fw7 f7 ma1"} 
              style={{ backgroundColor: Schedules[r].color }}
              key={i}>
                <Link className="white dim glow" to={{pathname: `/route/${r}`}}>{r}</Link>
            </span>
          )) : `FAILED`}
        </div>
        <div>
          <span>STOP ID {this.props.id}</span>
        </div>
      </div>
    )
  }
}

StopLink.propTypes = {
  id: PropTypes.string.isRequired,
  exclude: PropTypes.string,
}

export default StopLink
