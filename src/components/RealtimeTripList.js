import React, { Component } from 'react';
import RealtimeTrip from './RealtimeTrip';

import _ from 'lodash';

export default class RealtimeTripList extends Component {
  render() {

    const byDirection = _.groupBy(this.props.trips, 'properties.direction')
    console.log(byDirection)

    return (
      <div className="realtime">
        {Object.keys(byDirection).map(dir =>
          <div className="">
            <span className="db pv1 pl1 fw7 f7 bg-moon-gray">
              {byDirection[dir].length > 0 ? byDirection[dir].length : 'no'} {dir} bus(es):
            </span>
            {byDirection[dir].map(t => 
              <RealtimeTrip trip={t} />
            )}
          </div>
        )}
      </div>
    );
  }
}