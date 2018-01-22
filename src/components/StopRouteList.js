import React, { Component } from 'react';
import Schedules from '../data/schedules.js';
import LineLink from './LineLink'
import _ from 'lodash';
import moment from 'moment';

import RoutePredictionList from './RoutePredictionList';

class StopRouteList extends Component {
  render () {
    const predictions = this.props.predictions
    const goodPredictions = _.filter(this.props.predictions.data.entry.arrivalsAndDepartures, a => { return a.predictedArrivalTime > 0 })
    const routes = this.props.routes
    return (
      <div className='list overflow-scroll'>
        {routes.map(r => (
          <div className="pa2 bb" style={{display: 'flex', alignItems: 'center'}}>
            <LineLink name={Schedules[r].rt_name} id={r} color={Schedules[r].color} />
            <RoutePredictionList predictions={_.filter(goodPredictions, function(o) { return o.routeShortName === r.padStart(3, '0')})} route={r} />
          </div>
        ))}
      </div>
    )
  }
}

export default StopRouteList;