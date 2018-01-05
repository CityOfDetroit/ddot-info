import React, { Component } from 'react';
import RealtimeTrip from './RealtimeTrip';

import _ from 'lodash';

export default class RealtimeTripList extends Component {
  render() {

    const byDirection = _.groupBy(this.props.trips, 'properties.direction')
    console.log(byDirection)

    return (
      <div className="">
        {/* <div className="fw7 f7">
          {this.props.trips.length > 0 ? `${this.props.trips.length} bus(es) running:` : `no buses running`}
        </div> */}
        {Object.keys(byDirection).map(dir =>
          <div className="dib w-50-m w-50-l w-100-s fw7 v-top">
            <span className="db pv2 pl1 bg-moon-gray">
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