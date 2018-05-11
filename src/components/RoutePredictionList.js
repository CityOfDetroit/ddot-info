import React from 'react';
import moment from 'moment';
import Card, { CardContent } from 'material-ui/Card';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import SchedSVG from 'material-ui-icons/Schedule';
import LiveSVG from 'material-ui-icons/SpeakerPhone';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

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
              <ListItemIcon >
                {this.state.open === p.tripId ? <ExpandLess /> : <ExpandMore />}
              </ListItemIcon>
              <ListItemText style={{ fontWeight: this.state.open === p.tripId ? 700 : 300 }} primary={`${p.predicted ? moment(p.predictedArrivalTime).format('h:mma') : moment(p.scheduledArrivalTime).format('h:mma')}`} />
              <ListItemIcon >
                {p.predicted ? <LiveSVG /> : <SchedSVG />}
              </ListItemIcon>
            </ListItem>
            <Collapse in={this.state.open === p.tripId && this.props.isOpen} style={{ marginBottom: '.5em' }} timeout="auto" unmountOnExit>
              <RealtimeCard trip={p.tripId} stop={this.props.stop} route={this.props.route} onChange={this.props.onChange}/>
            </Collapse>
        </div>
          )) : <Card><CardContent style={{ padding: '1em' }}>There are currently no real-time predictions available.</CardContent></Card>}
      </List>
    );
  }
}

export default RoutePredictionList;
