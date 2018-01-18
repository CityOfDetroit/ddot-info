import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Stops from '../data/stops.js';
import Colors from '../data/colors.js';
import chroma from 'chroma-js';

export default class RealtimeTrip extends Component {
  render() {

    return (
      <div 
        className="w-100 pa1 flex justify-between bb pa2" 
        style={{
          backgroundColor: `rgba(${chroma(Colors[this.props.trip.properties.direction]).alpha(0.5).rgba().toString()})`,
        }}
        >
        <div>
          <span className="fw5 f6 db pb1">
          next stop:
          </span>
          <span className="f6 dib fw7">
          <Link to={{pathname: `/stop/${this.props.trip.properties.nextStop.slice(5)}/`}} >
            {Stops[this.props.trip.properties.nextStop.slice(5)].name}
          </Link>
          </span>
          <span className="f6 dib fw5 ml1">
          {this.props.trip.properties.nextStopOffset > 60 ? `in ${Math.floor(this.props.trip.properties.nextStopOffset/60)} minute(s)` : ` now`}
          </span>
          <span className="f6 db fw5">
          { this.props.trip.properties.onTime < 0 ? `${Math.abs(this.props.trip.properties.onTime)} minutes ahead` : `${this.props.trip.properties.onTime} minutes behind` }
          </span>
        </div>
        <span className="fw7 f7">
        {this.props.trip.properties.tripId.slice(-4)}
        </span>
      </div>
    );
  }
}