import React from 'react';
import moment from 'moment';
import Card, { CardContent } from 'material-ui/Card';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import SchedSVG from 'material-ui-icons/Schedule';
import LiveSVG from 'material-ui-icons/SpeakerPhone';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import _ from 'lodash';

import RealtimeCard from './RealtimeCard';
import Helpers from '../helpers.js';

/** Collapsable list of realtime arrivals for Stop */
class RoutePredictionList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      open: null 
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = tripId => () => {
    if(this.state.open === tripId) { this.props.onChange(null) }
    else {this.props.onChange(tripId, this.props.route)}
    this.setState({
      open: this.state.open === tripId ? null : tripId
    });
  };

  render() {
    const {predictions} = this.props;

    return (
      <List style={{ paddingTop: 0 }}>
        {predictions.length > 0 ? Helpers.cleanPredictionHeadsign(predictions).map((p, i) => (
          <div key={i}>
            <ListItem button key={p.tripId} onClick={this.handleClick(p.tripId)} style={{ background: '#fff' }} >
              <ListItemIcon>
                {p.predicted ? <LiveSVG /> : <SchedSVG />}
              </ListItemIcon>
              <ListItemText style={{ fontWeight: this.state.open === p.tripId ? 700 : 300 }} secondary={_.capitalize(p.tripHeadsign)} primary={`${p.predicted ? moment(p.predictedArrivalTime).format('h:mma') : moment(p.scheduledArrivalTime).format('h:mma')}`} />
              <ListItemIcon>
                {this.state.open === p.tripId ? <ExpandLess /> : <span style={{ display: 'flex', alignItems: 'center', fontSize: '.9em' }}>{ i === 0 ? `Where is this bus?` : null}<ExpandMore /></span>}
              </ListItemIcon>
            </ListItem>
            <Collapse in={this.state.open === p.tripId && this.props.isOpen} style={{ marginBottom: '.5em' }} timeout="auto" unmountOnExit>
              <RealtimeCard trip={p.tripId} stop={this.props.stop} status={p} route={this.props.route}/>
            </Collapse>
        </div>
          )) : <Card><CardContent style={{ padding: '1em' }}>There are currently no real-time predictions available, see the schedule below.</CardContent></Card>}
      </List>
    );
  }
}

export default RoutePredictionList;
