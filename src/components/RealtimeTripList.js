import React, { Component } from 'react';
import RealtimeTrip from './RealtimeTrip';

import _ from 'lodash';

export default class RealtimeTripList extends Component {
  render() {
    const byDirection = _.groupBy(this.props.trips, 'properties.direction')

    return (
      <div className="list overflow-scroll">
        {Object.keys(byDirection).map(dir =>
          <div className="" key={dir}>
            <span className="db pv1 pl1 fw7 f7 bg-moon-gray">
              {byDirection[dir].length > 0 ? byDirection[dir].length : 'no'} {dir} bus(es):
            </span>
            {_.sortBy(byDirection[dir], 'properties.scheduledDistanceAlongTrip').map((t, i) =>
              <div>
              <RealtimeTrip trip={t} key={t.properties.tripId} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}