import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Stops from '../data/stops.js';
import SchedSVG from '../img/schedule.svg';
import LiveSVG from '../img/speaker_phone.svg';

class RealtimeTrip extends Component {
  render() {
    return (
      <div className="w-100 pa1 flex justify-between bb pa2" >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          { this.props.trip.properties.predicted ?
            <img src={LiveSVG} alt="Showing real-time prediction" />
            : <img src={SchedSVG} alt="Showing scheduled time" /> }
          <div className="ml2 pa1">
            <span className="fw7 f6 db">
              Trip #{this.props.trip.properties.tripId.slice(-4)}
            </span>
            <span className="f5 fw7 db pv1">
              next stop:  
              <Link className="pl1" to={{pathname: `/stop/${this.props.trip.properties.nextStop.slice(5)}/`}} >
                {Stops[this.props.trip.properties.nextStop.slice(5)].name}
              </Link>
            </span>
            <span className="f6 fw3 db">
              {this.props.trip.properties.nextStopOffset > 60 ? `in ${Math.floor(this.props.trip.properties.nextStopOffset/60)} minute(s)` : ` now`}
              {this.props.trip.properties.onTime < 0 ? ` [+${Math.abs(this.props.trip.properties.onTime)}]` : ` [-${this.props.trip.properties.onTime}]` }
            </span>
          </div>
        </div>
      </div>
    )
  }
}

RealtimeTrip.propTypes = {
  trip: PropTypes.shape({
    properties: PropTypes.shape({
      predicted: PropTypes.bool,
      tripId: PropTypes.string,
      nextStop: PropTypes.string,
      nextStopOffset: PropTypes.number,
      onTime: PropTypes.number,
    })
  })
}

export default RealtimeTrip;
