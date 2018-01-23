import React from 'react'
import moment from 'moment'

import SchedSVG from '../img/schedule.svg'
import LiveSVG from '../img/speaker_phone.svg'

const RoutePredictionList = ({ predictions, route }) => (
  <div className="ml3" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
    {predictions.map((p, i) => (
      <div className="pa2 ma1 bg-moon-gray dib" style={{ display: 'flex', alignItems: 'center' }} key={i}>
        <span className="dib">
          arriving at {p.predicted ? moment(p.predictedArrivalTime).format('h:mma') : moment(p.scheduledArrivalTime).format('h:mma')}
        </span>
        {p.predicted ?
          <img className="ml1" src={LiveSVG} alt="Showing real-time prediction" />
          :<img className="ml1" src={SchedSVG} alt="Showing scheduled time" />}
      </div>
    ))}
  </div>
) 

export default RoutePredictionList
