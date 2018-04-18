import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Stops from '../data/stops.js';
import Schedules from '../data/schedules.js';

import Card, { CardHeader } from 'material-ui/Card'
import BusIcon from './BusStop'
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
    fontSize: '.8em',
    padding: '0 10',
  },
  avatar: {
    fontSize: 40
  }
}

const StopCardRoutes = ({routes}) => {
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      {routes.map((r, i) => (
        <Link to={{pathname: `/route/${r}`}} key={i} style={{ display: 'flex', textDecoration: 'none', alignItems:'center', fontWeight: 700, justifyContent: 'center', width: '2em', height: '2em', color: 'white', fontSize: '1em', backgroundColor: Schedules[r].color, marginRight: '.5em' }}>
          {r}
        </Link>))}
    </div>
  )
}

class StopCard extends Component {
  render() {
    let routes = [];

    if (Stops[this.props.id]) {
      routes = Stops[this.props.id].routes.map(r => r[0])
    }

    return (
      <Card style={{background: '#eee', margin: 10, minWidth: 300}} classes={{root: this.props.classes.root}}>
        <CardHeader 
          avatar={<BusIcon />} 
          title={
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Link to={{pathname: `/stop/${this.props.id}`}} style={{color: 'black', textDecoration: 'none'}}>
                <span>{Stops[this.props.id].name}</span>
              </Link> 
              <span style={{background: '#ccc', marginLeft: '.5em', padding: '0px 8px', fontSize: '.85em', fontWeight: 700, color: 'black'}}>
                #{this.props.id}
              </span> 
            </div>} 
          subheader={<StopCardRoutes routes={routes} />}
          classes={{title: this.props.classes.title, subheader: this.props.classes.subheader, avatar: this.props.classes.avatar}}
          />
      </Card>
    )
  }
}

StopCard.propTypes = {
  id: PropTypes.string.isRequired,
  showRoutes: PropTypes.bool,
  exclude: PropTypes.string,
}

export default withStyles(styles)(StopCard);
