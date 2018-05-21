import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardContent } from 'material-ui/Card';

import Stops from '../data/stops.js';
import Schedules from '../data/schedules.js';

import BusStopIcon from './BusStop'
import BusIcon from 'material-ui-icons/Timeline'
import { withStyles } from 'material-ui/styles'

const styles = {
  root: {
    padding: 0,
    margin: 0
  },
  title: {
    fontWeight: 500,
    fontSize: '1em',
    padding: '0px 0px',
  },
  subheader: {
    fontSize: '.9em',
    padding: '0',
  },
  avatar: {
    fontSize: 40
  }
}

const StopCardRoutes = ({routes}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginTop: '-.5em' }}>
      {routes.map((r, i) => (
        <Link to={{ pathname: `/route/${r}` }} key={i} style={{ display: 'flex', textDecoration: 'none', alignItems:'center', fontWeight: 700, justifyContent: 'center', width: '1.8em', height: '1.8em', color: 'white', fontSize: '.9em', backgroundColor: Schedules[r].color, marginRight: '.5em', marginTop: '.5em' }}>
          {r}
        </Link>))}
    </div>
  );
}

/** Linked individual stops for StopsList */
class StopCard extends Component {
  render() {
    let routes = [];

    if (Stops[this.props.id]) {
      routes = Stops[this.props.id].routes.map(r => r[0])
    }

    return (
      <Card style={{ background: '#eee', margin: '.25em', minWidth: 300 }} classes={{ root: this.props.classes.root }}>
        <CardHeader 
          avatar={<BusStopIcon style={{ height: '1em', width: '1em' }} />} 
          title={
              <Link to={{ pathname: `/stop/${this.props.id}` }} style={{ color: 'black', fontSize: '1.2em' }}>
                <span>{Stops[this.props.id].name}</span>
              </Link> 
              } 
          subheader={
            <div>
              <span style={{ background: '#ccc', padding: '4px 8px', fontSize: '1em', fontWeight: 700, color: 'black' }}>
                #{this.props.id}
              </span>
              {this.props.showDirection ? <span style={{ paddingLeft: '.25em' }}>({Stops[this.props.id].dir})</span> : ''}
            </div>}
          classes={{ title: this.props.classes.title, subheader: this.props.classes.subheader, avatar: this.props.classes.avatar }} />
        <CardContent>
          <div style={{display: 'flex', alignItems: 'center'}}>
          <BusIcon style={{marginRight: '.65em'}}/>
          <StopCardRoutes routes={routes} />
          </div>
        </CardContent>
      </Card>
    );
  }
}

StopCard.propTypes = {
  id: PropTypes.string.isRequired,
  showRoutes: PropTypes.bool,
  showDirection: PropTypes.bool,
  exclude: PropTypes.string,
}

export default withStyles(styles)(StopCard);
