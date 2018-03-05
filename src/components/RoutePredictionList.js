import React from 'react'
import moment from 'moment'

import SchedSVG from '../img/schedule.svg'
import LiveSVG from '../img/speaker_phone.svg'

const RoutePredictionList = ({ predictions, route, multipleDirs }) => (
  <div className="ml1 f6" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
    {predictions.length > 0 ? predictions.map((p, i) => (
      <div className="pv1 ph2 ma1 bg-moon-gray dib" style={{ display: 'flex', alignItems: 'center' }} key={i}>
        <span className="dib">
          {multipleDirs ? p.tripHeadsign : ``} 
          at {p.predicted ? moment(p.predictedArrivalTime).format('h:mma') : moment(p.scheduledArrivalTime).format('h:mma')} 
          {/* {p.tripStatus.scheduleDeviation/60} */}
        </span>
        {p.predicted ?
          <img className="ml1" src={LiveSVG} style={{width: '1.5em'}} alt="Showing real-time prediction" />
          :<img className="ml1" src={SchedSVG} style={{width: '1.5em'}} alt="Showing scheduled time" />}
      </div>
    )) : ``}
  </div>
) 

export default RoutePredictionList
