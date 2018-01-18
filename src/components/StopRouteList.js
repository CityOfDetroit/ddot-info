import React, { Component } from 'react';
import Schedules from '../data/schedules.js';
import LineLink from './LineLink'
import moment from 'moment';
import _ from 'lodash';

import RoutePredictionList from './RoutePredictionList';

class StopRouteList extends Component {
  render () {
    const predictions = this.props.predictions
    const routes = this.props.routes
    const stopArrDep = _.sortBy(predictions.data.entry.arrivalsAndDepartures, 'predictedArrivalTime')
    return (
      <div className='ma2 stopRouteList'>
        {routes.map(r => (
          <div className="pa2 bb" style={{display: 'flex', alignItems: 'center'}}>
            <LineLink name={Schedules[r].rt_name} id={r} color={Schedules[r].color} />
            <RoutePredictionList predictions={_.filter(predictions.data.entry.arrivalsAndDepartures, function(o) { return o.routeShortName == r.padStart(3, '0')})} route={r} />
          </div>
        ))}
      </div>
    )
  }
}

export default StopRouteList;