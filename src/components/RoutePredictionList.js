import React from 'react'
import moment from 'moment'
import Helpers from '../helpers.js'
import SchedSVG from '../img/schedule.svg'
import LiveSVG from '../img/speaker_phone.svg'

const RoutePredictionList = ({ predictions, route, multipleDirs }) => (
  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', paddingTop: '.5em' }}>
    {predictions.length > 0 ? Helpers.cleanPredictionHeadsign(predictions).map((p, i) => (
      <div className="pv1 ph2 ma1 dib" style={{ display: 'flex', alignItems: 'center', background: '#eee' }} key={i}>
        <span className="dib">
          {p.predicted ? moment(p.predictedArrivalTime).format('h:mma') : moment(p.scheduledArrivalTime).format('h:mma')} 
          {multipleDirs ? ` (${Helpers.lookup[p.tripHeadsign]})` : ``} 
        </span>
        {p.predicted ?
          <img className="ml1" src={LiveSVG} style={{width: '1.5em'}} alt="Showing real-time prediction" />
          :<img className="ml1" src={SchedSVG} style={{width: '1.5em'}} alt="Showing scheduled time" />}
      </div>
    )) : <span className="pa2">No bus arrivals predicted</span>}
  </div>
) 

export default RoutePredictionList
