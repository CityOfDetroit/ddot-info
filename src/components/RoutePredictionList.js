import React from 'react'
import moment from 'moment'
import Helpers from '../helpers.js'

import RealtimeCard from './RealtimeCard';

import Card, { CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import List, {ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction} from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse'

import SchedSVG from 'material-ui-icons/Schedule'
import LiveSVG from 'material-ui-icons/SpeakerPhone'
import CommentIcon from 'material-ui-icons/Comment';


class RoutePredictionList extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = { 
      open: null 
    }
  }

  handleClick = tripId => () => {
    this.setState({open: this.state.open === tripId ? null : tripId})
  };

  render() {

    const {predictions, route} = this.props

    console.log(Helpers.cleanPredictionHeadsign(predictions))
    return (
      <div>
        <List>
        {predictions.length > 0 ? Helpers.cleanPredictionHeadsign(predictions).map((p, i) => (
          <div>
            <ListItem button key={p.tripId} onClick={this.handleClick(p.tripId)} >
              <ListItemIcon >
                {p.predicted ? <LiveSVG /> : <SchedSVG />}
              </ListItemIcon>
              <ListItemText style={{fontWeight: this.state.open === p.tripId ? 700 : 300 }} primary={`${p.predicted ? moment(p.predictedArrivalTime).format('h:mma') : moment(p.scheduledArrivalTime).format('h:mma')}`} />
            </ListItem>
            <Collapse in={this.state.open === p.tripId} timeout="auto" unmountOnExit>
              <RealtimeCard trip={p.tripId} stop={this.props.stop}/>
            </Collapse>
        </div>
          )) : <Card><CardContent>There are currently no real-time predictions available.</CardContent></Card>}
          </List>
      </div>
    )
  }
}

export default RoutePredictionList
