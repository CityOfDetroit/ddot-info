import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helpers from '../helpers.js';
import _ from 'lodash';
import chroma from 'chroma-js';
import Schedules from '../data/schedules.js'
import Stops from '../data/stops.js'
import {GridList, GridTile} from 'material-ui/GridList';
import {Card, CardHeader} from 'material-ui/Card'
import moment from 'moment';

class StopRouteSchedule extends Component {
  render() {
    return (
      <div>
        {Helpers.cleanScheduleHeadsign(this.props.schedules[0]).stopRouteDirectionSchedules.map((rds, i) => (
          <Card style={{margin: 15}}>
          <CardHeader
            title={_.capitalize(rds.tripHeadsign)}
            subtitle={`to ${Stops[Schedules[this.props.route].timepoints[rds.tripHeadsign].slice(-1)[0]].name}`}
            style={{padding: '10px 16px'}}
          />
          <GridList cellHeight={20} cols={8} style={{maxWidth: 450, padding: 10}}>
            {rds.scheduleStopTimes.map((sst, i) => (
              <GridTile style={{
                backgroundColor: this.props.predictions.indexOf(sst.tripId) > -1 ? chroma(Schedules[this.props.route].color).alpha(0.25).css() : 'rgba(255,255,255,1)',
                textAlign: 'center',
                verticalAlign: 'center',
                paddingTop: '.25em',
                fontSize: '.8em',
                fontWeight: moment(sst.arrivalTime).format('a') === 'am' ? 300 : 700,
              }}>
                {(i === 0 || moment(rds.scheduleStopTimes[i-1].arrivalTime).format('a') !== moment(sst.arrivalTime).format('a')) ? moment(sst.arrivalTime).format('h:mma').slice(0,-1) : moment(sst.arrivalTime).format('h:mm')}
              </GridTile>
            ))
            }
          </GridList>
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
