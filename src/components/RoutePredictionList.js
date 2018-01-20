import React from 'react'
import moment from 'moment';

const RoutePredictionList = ({ predictions, route }) => (
  <div>
    {predictions.map(p => (
      <div className="pa2 ma1 bg-moon-gray dib">
        <span className="dib">arriving at {moment(p.predictedArrivalTime).format('h:mma')}</span>
      </div>
    ))}
  </div>
) 

export default RoutePredictionList;