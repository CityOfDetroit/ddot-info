import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Stops from '../data/stops.js';
import Schedules from '../data/schedules.js';

import Card, { CardHeader, CardContent } from 'material-ui/Card'
import BusIcon from 'material-ui-icons/DirectionsBus'
import { withStyles } from 'material-ui/styles'

const styles = {
  title: {
    fontWeight: 500,
    fontSize: '1.25em',
    padding: '0px 0px',
  },
  subheader: {
    fontSize: '1em',
    padding: 0,
  }
}

class StopCard extends Component {
  render() {
    const exclude = this.props.exclude || '';
    let routes = [];

    if (Stops[this.props.id]) {
      routes = Stops[this.props.id].routes.map(r => r[0])
      // if (this.props.showTransfers && Stops[this.props.id] && Stops[this.props.id].transfers.length > 0) {
      //   routes = Stops[this.props.id].routes.map(r => r[0]);
      //   Stops[this.props.id].transfers.map(t => {
      //     return routes = routes.concat(t[1])
      //   })
      //   routes = Array.from(new Set(routes)).sort()
      // } else {
      //   routes = Stops[this.props.id].routes.sort()
      // }
    }

    return (
      <Card style={{background: '#eee', margin: 10, minWidth: 300}}>
        <CardHeader 
          avatar={<BusIcon />} 
          title={Stops[this.props.id].name} 
          subheader={`Stop ID: #${this.props.id}`} 
          classes={{title: this.props.classes.title, subheader: this.props.classes.subheader}}
          />
        <CardContent>
            <div style={{display: 'flex'}}>
           {routes.map((r, i) => (
           <Link to={{pathname: `/route/${r}`}} key={i} style={{textDecoration: 'none', marginRight: '.5em'}}>
            <div style={{ display: 'flex', alignItems:'center', fontWeight: 700, justifyContent: 'center', width: '2em', height: '2em', color: 'white', fontSize: '1.25em', backgroundColor: Schedules[r].color }}>
              {r}
            </div> 
          </Link>
         ))}
         </div>
         </CardContent>
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
