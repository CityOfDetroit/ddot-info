import React from 'react'
import moment from 'moment'
import Helpers from '../helpers.js'
import SchedSVG from 'material-ui-icons/Schedule'
import LiveSVG from 'material-ui-icons/SpeakerPhone'

import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';

const RoutePredictionList = ({ predictions, route, multipleDirs }) => (
  <div>
    <List>
    {predictions.length > 0 ? Helpers.cleanPredictionHeadsign(predictions).map((p, i) => (
        <ListItem button>
          <ListItemIcon>
            {p.predicted ? <LiveSVG /> : <SchedSVG />}
          </ListItemIcon>
          <ListItemText primary={`${p.predicted ? moment(p.predictedArrivalTime).format('h:mma') : moment(p.scheduledArrivalTime).format('h:mma')}`} />
        </ListItem>
      )) : ``}
      </List>
  </div>
) 

export default RoutePredictionList
