import React, { Component } from 'react';
import Schedules from '../data/schedules.js';
import LineLink from './LineLink'
import moment from 'moment';
import _ from 'lodash';


class StopPrediction extends Component {
  render() {
    const prediction = this.props.prediction
    const route = Schedules[parseInt(prediction.routeShortName, 10)]
    return (
      <div className="pa2 ma2 bg-moon-gray">
        <LineLink name={route.rt_name} id={route.id} color={route.color} className="di" />
        <span className="pv2 dib">arriving at {moment(prediction.predictedArrivalTime).format('h:mma')}</span>
      </div>
    )
  }

}

class StopPredictionList extends Component {
  render () {
    const predictions = this.props.predictions
    const stopArrDep = _.sortBy(predictions.data.entry.arrivalsAndDepartures, 'predictedArrivalTime')
    
    return (
      <div className='ma2'>
        <h3>Next buses arriving at this stop:</h3>
        {stopArrDep.length > 0 ? `` : `<div className='pa1'>No buses predicted</div>`}
        <div className="flex">
          {stopArrDep.map(m => 
            <StopPrediction prediction={m} key={m.vehicleId}/>
          )}
        </div>
      </div>
    )
  }
}

export default StopPredictionList;