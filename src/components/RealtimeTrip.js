import React, { Component } from 'react';

import Stops from '../data/stops.js';
import Colors from '../data/colors.js';
import chroma from 'chroma-js';

export default class RealtimeTrip extends Component {
  render() {

    return (
      <div 
        className="w-100 pa1" 
        style={{
          backgroundColor: `rgba(${chroma(Colors[this.props.trip.properties.direction]).alpha(0.5).rgba().toString()})`,
        }}
        >
        <span className="fw1 dark-gray tr bb mb2 f7">
        trip id {this.props.trip.properties.tripId.slice(-4)}, next stop:
        </span> 
        <span className="fw5 f6 db">
        {Stops[this.props.trip.properties.nextStop.slice(5)]}
        </span>
      </div>
    );
  }
}