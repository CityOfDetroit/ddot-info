import React, { Component } from 'react'
import _ from 'lodash'

import Schedules from '../data/schedules.js'
import RouteLink from './RouteLink'
import RoutePredictionList from './RoutePredictionList'

class StopRouteList extends Component {
  render() {
    const predictions = this.props.predictions
    const goodPredictions = predictions.data.entry.arrivalsAndDepartures
    const routes = this.props.routes

    return (
      <div className='list overflow-scroll'>
        {routes.map((r, i) => (
          <div className="pa2 bb" style={{ display: 'flex', alignItems: 'center' }} key={i}>
            <RouteLink name={Schedules[r].rt_name} id={r} color={Schedules[r].color} />
            <RoutePredictionList predictions={_.filter(goodPredictions, function(o) { 
              return o.routeShortName === r.padStart(3, '0')})} route={r} />
          </div>
        ))}
      </div>
    )
  }
}

export default StopRouteList
