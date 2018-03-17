import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helpers from '../helpers.js';
import _ from 'lodash';
import chroma from 'chroma-js';
import Schedules from '../data/schedules.js'
import Stops from '../data/stops.js'
import {GridList, GridTile} from 'material-ui/GridList';
import {Card, CardHeader, CardText} from 'material-ui/Card'
import Chip from 'material-ui/Chip';
import moment from 'moment';
import { grey800 } from 'material-ui/styles/colors';

class StopRouteSchedule extends Component {
  render() {
    return (
      <div>
        {Helpers.cleanScheduleHeadsign(this.props.schedules[0]).stopRouteDirectionSchedules.map((rds, i) => (
          <Card style={{margin: 15, padding: 10}}>
          <CardHeader
            title={_.capitalize(rds.tripHeadsign)}
            subtitle={`to ${Stops[Schedules[this.props.route].timepoints[rds.tripHeadsign].slice(-1)[0]].name}`}
            style={{padding: '16px 10px 0px 10px'}}
          />
          <CardText style={{padding: 10}}>
            <h4 style={{marginTop: 0, fontWeight: 600, color: grey800}}>Buses stop here at:</h4>
            <GridList cellHeight={20} cols={Math.ceil(rds.scheduleStopTimes) / 8} padding={0} style={{
                maxHeight: 100 + Math.ceil(rds.scheduleStopTimes.length) * 3, 
                maxWidth: Math.ceil(rds.scheduleStopTimes.length / 10) * 90,
                flexFlow: 'column wrap', 
                justifyContent: 'start'}}>
              {rds.scheduleStopTimes.map((sst, i) => (
                <GridTile style={{
                  backgroundColor: this.props.predictions.indexOf(sst.tripId) > -1 ? chroma(Schedules[this.props.route].color).alpha(0.25).css() : 'rgba(255,255,255,1)',
                  textAlign: 'center',
                  verticalAlign: 'center',
                  letterSpacing: '-0.25px',
                  borderRight: '1px solid #ccc',
                  fontSize: '.9em',
                  paddingTop: '.25em',
                  fontWeight: moment(sst.arrivalTime).format('a') === 'am' ? 300 : 700,
                }}>
                  {(i === 0 || moment(rds.scheduleStopTimes[i-1].arrivalTime).format('a') !== moment(sst.arrivalTime).format('a')) ? moment(sst.arrivalTime).format('h:mma').slice(0,-1) : moment(sst.arrivalTime).format('h:mm')}
                </GridTile>
              ))
              }
            </GridList>
          </CardText>
            <div style={{display: 'flex'}}>
              <Chip style={{margin: 6}} labelStyle={{fontSize: '.7em'}}>am times</Chip>
              <Chip style={{margin: 6, fontWeight: 700}} labelStyle={{fontSize: '.7em'}}><span class="b">pm times</span></Chip>
              <Chip style={{margin: 6, backgroundColor: chroma(Schedules[this.props.route].color).alpha(0.25).css()}} labelStyle={{fontSize: '.7em'}}>next arrivals</Chip>
            </div>
          </Card>
        ))}
      </div>
    )}
}

StopRouteSchedule.propTypes = {
  route: PropTypes.string,
  schedules: PropTypes.array
}

export default StopRouteSchedule;
