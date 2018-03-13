import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helpers from '../helpers.js';
import _ from 'lodash';
import chroma from 'chroma-js';
import Schedules from '../data/schedules.js'

import moment from 'moment';

class StopRouteSchedule extends Component {

  render() {
    return (
      <div>
        {this.props.schedules.length > 0 ? Helpers.cleanScheduleHeadsign(this.props.schedules[0]).stopRouteDirectionSchedules.map((rds, i) => (
          (<div className="pa1" key={i} style={{background: '#fff', margin: '.25em'}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <h4 style={{paddingBottom: '.2em', margin: 0, color: '#222'}}>{_.capitalize(rds.tripHeadsign)}</h4>
          </div>
          <div style={{ display: 'flex', paddingBottom: '.5em', flexDirection: 'column', overflowX: 'scroll', maxHeight: ((rds.scheduleStopTimes.length / 6 )* 20) + 30, flexWrap: 'wrap', alignContent: 'flex-start', textAlign: 'left' }}>
            {rds.scheduleStopTimes.map(sst => (
              <span className="ph2" key={sst.tripId} 
                style={{
                  fontSize: '.9em',  
                  fontWeight: moment(sst.arrivalTime).format('a') === 'am' ? 300 : 700,
                  borderRight: '1px solid #aaa',
                  backgroundColor: this.props.predictions.indexOf(sst.tripId) > -1 ? chroma(Schedules[this.props.route].color).alpha(0.25).css() : 'rgba(255,255,255,1)',
                  lineHeight: '1.25em',
                  textAlign: 'center'
                }}>{moment(sst.arrivalTime).format('h:mm')}</span>
            ))}
          </div>
          </div>)
        )) : `No stops today.`}
      </div>
    )
  }
}

StopRouteSchedule.propTypes = {
  route: PropTypes.string,
  schedules: PropTypes.array
}

export default StopRouteSchedule;
