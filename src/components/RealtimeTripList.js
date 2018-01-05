import React, { Component } from 'react';
import RealtimeTrip from './RealtimeTrip'

export default class RealtimeTripList extends Component {
  render() {
    return (
      <div className="">
        currently running: {this.props.trips.length} buses
        {this.props.trips.map(t =>
          <RealtimeTrip trip={t} />
        )}
      </div>
    );
  }
}