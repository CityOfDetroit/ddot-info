import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import StopLink from './StopLink'

import Colors from '../data/colors.js'

import Stops from '../data/stops.js';
import SchedSVG from '../img/schedule.svg';
import LiveSVG from '../img/speaker_phone.svg';

class RealtimeTrip extends Component {

  render() {
    const thisTrip = this.props.trip.properties

    const lookup = {
      'eastbound': 'EB',
      'westbound': 'WB',
      'southbound': 'SB',
      'northbound': 'NB'
    }

    return (
      <div className="w-100 pa1 flex justify-between pa2" style={{borderBottom: '1px dashed #ccc', display: 'flex', alignItems: 'center'}}>
      <div className="w-40" style={{display: 'flex', alignItems: 'center'}}>
        <img src={thisTrip.predicted ? LiveSVG : SchedSVG} className="mr2" style={{width: '1.5em'}} alt={thisTrip.predicted ? "Real time prediction" : "Scheduled time"} />
        <div>
          <div className="pv1">
            <span className="pa1 mr1" style={{backgroundColor: Colors[thisTrip.direction]}}>{lookup[thisTrip.direction]}</span>
            #{thisTrip.tripId.slice(-4)} 
            
          </div>
          <div className="db">
          to 
            <Link className="dim black link underline hover-mid-gray glow ml1" to={{pathname: `/stop/${thisTrip.lastStop}/`}}>
              {Stops[thisTrip.lastStop].name}
            </Link>
          </div>
          <div className="db">
          </div>

        </div>
      </div>
        <div className="w-60">
          {/* <StopLink id={thisTrip.nextStop.slice(5)} exclude={window.location.pathname.split('/').slice(-2)[0]} /> */}
          <Link className="dim black link underline hover-mid-gray glow mr2" to={{pathname: `/stop/${this.props.trip.properties.nextStop.slice(5)}/`}} >
            {Stops[thisTrip.nextStop.slice(5)] ? Stops[thisTrip.nextStop.slice(5)].name : `unknown`}
          </Link>
          <div className="db">
          {thisTrip.nextStopOffset > 60 ? `in ${Math.floor(thisTrip.nextStopOffset/60)} minute(s)` : ` now`}
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
