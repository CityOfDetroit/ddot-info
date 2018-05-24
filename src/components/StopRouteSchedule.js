import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import chroma from 'chroma-js';
import {GridList, GridListTile } from '@material-ui/core';
import {Card, CardHeader, CardContent } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import ScheduleIcon from '@material-ui/icons/Schedule'

import Schedules from '../data/schedules.js';
import Stops from '../data/stops.js';
import Helpers from '../helpers.js';

/** Schedule for a single stop for StopRouteSchedule */
class StopRouteSchedule extends Component {
  render() {
    if (!this.props.schedules[0]) {
      return ``
    }

    return (
      <div>
        {Helpers.cleanScheduleHeadsign(this.props.schedules[0]).stopRouteDirectionSchedules.map((rds, i) => (
          <div>
            {i === 1 ? <Divider /> : ``}
            <Card style={{ padding: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: 0 }}>
              <ScheduleIcon style={{ marginLeft: '.5em', color: '#aaa', borderRadius: 999, height: '1.25em', width: '1.25em' }}/>
              <CardHeader
                title={_.capitalize(rds.tripHeadsign)}
                subheader={`to ${Stops[Schedules[this.props.route].timepoints[rds.tripHeadsign].slice(-1)[0]].name}`}
                style={{padding: 10, marginLeft: 10}}
             />
            </div>
              <CardContent style={{ padding: 10 }}>
                <GridList 
                  cellHeight={18} 
                  cols={Math.ceil(rds.scheduleStopTimes) / 8} 
                  padding={0} 
                  style={{
                    maxHeight: 100 + Math.ceil(rds.scheduleStopTimes.length) * 3, 
                    maxWidth: 50 + Math.ceil(rds.scheduleStopTimes.length / 10) * 90,
                    flexFlow: 'column wrap', 
                    justifyContent: 'start' }}>
                  {rds.scheduleStopTimes.map((sst, i) => (
                    <GridListTile style={{
                      backgroundColor: this.props.predictions.indexOf(sst.tripId) > -1 ? chroma(Schedules[this.props.route].color).alpha(0.25).css() : 'rgba(255,255,255,1)',
                      textAlign: 'center',
                      verticalAlign: 'center',
                      letterSpacing: '-0.25px',
                      borderRight: '1px solid #ccc',
                      fontSize: '.9em',
                      paddingTop: '.25em',
                      fontWeight: moment(sst.arrivalTime).format('a') === 'am' ? 300 : 700 }}>
                      {(i === 0 || moment(rds.scheduleStopTimes[i-1].arrivalTime).format('a') !== moment(sst.arrivalTime).format('a')) ? moment(sst.arrivalTime).format('h:mma').slice(0,-1) : moment(sst.arrivalTime).format('h:mm')}
                    </GridListTile>
                  ))}
                </GridList>
              </CardContent>
            </Card>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '0em 1.5em 1em 1.5em' }}>
          <span style={{ fontSize: '.9em' }}>Displaying AM times, <b>PM times</b>, and </span>
          <span style={{ background: chroma(Schedules[this.props.route].color).alpha(0.25).css(), fontSize: '.9em', marginLeft: '.25em', padding: '.15em' }}> next departures</span>
        </div>
      </div>
    );
  }
}

StopRouteSchedule.propTypes = {
  route: PropTypes.string,
  schedules: PropTypes.array
}

export default StopRouteSchedule;
