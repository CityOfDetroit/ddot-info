import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Stops from '../data/stops.js'
import Schedules from '../data/schedules.js'

class StopLink extends Component {
  render() {
    const exclude = this.props.exclude || ''

    let routes = []
    if(Stops[this.props.id]) {
      if(this.props.showTransfers && Stops[this.props.id] && Stops[this.props.id].transfers.length > 0) {
        routes = Stops[this.props.id].routes
        Stops[this.props.id].transfers.map(t => {
          routes = routes.concat(t[1])
        })
        console.log(this.props.id, routes)
        routes = Array.from(new Set(routes)).sort()
      }
      else {
        routes = Stops[this.props.id].routes.sort()
      }
    }


    return (
      <div className="h3 w-100" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '1px dashed #ccc', }}>
          <div className="w-30">
            <Link 
              className="dim black hover-mid-gray glow mr1 db" 
              to={{ pathname: `/stop/${this.props.id}/` }}>
              <strong>{Stops[this.props.id] ? `${Stops[this.props.id].name} (${Stops[this.props.id].dir})` : ``}</strong>
            </Link>
            <span className="db">STOP ID {this.props.id}</span>
          </div>
          <div className="w-70">
          {Stops[this.props.id] && routes.length < 10 ? routes.map((r, i) => (
            <Link className="white dim glow" to={{pathname: `/route/${r}`}}>
            <span className={exclude.toString() === r.toString() ? "dn" : "pa2 dib white fw7 f6 ma1"} 
              style={{ backgroundColor: Schedules[r].color }}
              key={i}>
                {r}
            </span></Link>
          )) : `All downtown routes`}
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
