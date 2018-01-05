import React, { Component } from 'react';

export default class RealtimeTrip extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="">
        {this.props.trip.properties.tripId}
      </div>
    );
  }
}