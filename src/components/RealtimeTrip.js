import React, { Component } from 'react';

export default class RealtimeTrip extends Component {
  render() {
    return (
      <div className="">
        {this.props.trip.properties.tripId}
      </div>
    );
  }
}