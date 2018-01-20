import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Stops from '../data/stops.js';
import Colors from '../data/colors.js';
import chroma from 'chroma-js';
import SchedSVG from '../img/schedule.svg'
import LiveSVG from '../img/speaker_phone.svg'

export default class RealtimeTrip extends Component {
  render() {
    return (
      <div 
        className="w-100 pa1 flex justify-between bb pa2" 
        style={{
          backgroundColor: `rgba(${chroma(Colors[this.props.trip.properties.direction]).alpha(0.5).rgba().toString()})`,
        }}
        >
        <div style={{display: 'flex', alignItems: 'center'}}>
          <img src={this.props.trip.properties.predicted ? LiveSVG : SchedSVG} />
          <div className="ml2 pa1">
            <span className="fw5 f6 db">
              next stop:
            </span>
            <span className="f5 fw7 db pv1">
            <Link to={{pathname: `/stop/${this.props.trip.properties.nextStop.slice(5)}/`}} >
              {Stops[this.props.trip.properties.nextStop.slice(5)].name}
            </Link>
            </span>
            <span className="f6 fw7 db">
              {this.props.trip.properties.nextStopOffset > 60 ? `in ${Math.floor(this.props.trip.properties.nextStopOffset/60)} minute(s)` : ` now`}
              {this.props.trip.properties.onTime < 0 ? ` [+${Math.abs(this.props.trip.properties.onTime)}]` : ` [-${this.props.trip.properties.onTime}]` }
            </span>
          </div>
        </div>
        <span className="fw7 f7">
        {this.props.trip.properties.tripId.slice(-4)}
        </span>
      </div>
    );
  }
}