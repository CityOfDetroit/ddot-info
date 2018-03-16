import React from 'react'
import moment from 'moment'
import Helpers from '../helpers.js'
import SchedSVG from 'material-ui/svg-icons/action/schedule'
import LiveSVG from 'material-ui/svg-icons/communication/speaker-phone'

import {List, ListItem} from 'material-ui/List';

const RoutePredictionList = ({ predictions, route, multipleDirs }) => (
  <div>
    <List>
    {predictions.length > 0 ? Helpers.cleanPredictionHeadsign(predictions).map((p, i) => (
        <ListItem 
          primaryText={
            `
            ${p.predicted ? moment(p.predictedArrivalTime).format('h:mma') : moment(p.scheduledArrivalTime).format('h:mma')}
            `
          }
          secondaryText={p.tripHeadsign}
          leftIcon={p.predicted ? <LiveSVG /> : <SchedSVG />}
          style={{margin: 0, padding: 0}}
          />
      )) : <ListItem primaryText='No bus arrivals predicted' />}
      </List>
  </div>
) 

export default RoutePredictionList
