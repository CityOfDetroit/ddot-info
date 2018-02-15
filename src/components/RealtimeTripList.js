import React, { Component } from 'react'
import chroma from 'chroma-js'
import _ from 'lodash'

import RealtimeTrip from './RealtimeTrip'
import Colors from '../data/colors.js'
import Stops from '../data/stops.js'

export default class RealtimeTripList extends Component {
  render() {
    const byDirection = _.groupBy(this.props.trips, 'properties.direction')

    return (
      <div className="list overflow-scroll">
        {Object.keys(byDirection).map((dir, i) =>
          <div key={i}>
            <span 
              className="db pa2 f5 f4-ns fw7 black"
              style={{ backgroundColor: `rgba(${chroma(Colors[dir]).rgba().toString()})` }}>
                {_.capitalize(dir)} to {Stops[this.props.route.schedules.weekday[dir].stops.slice(-1,)].name}
                <br />
                {byDirection[dir].length > 0 ? byDirection[dir].length : 'no'} {byDirection[dir].length === 1 ? `bus` : `buses`}
            </span>
            {_.sortBy(byDirection[dir], 'properties.scheduledDistanceAlongTrip').map((t, i) =>
              <div key={i}>
                <RealtimeTrip trip={t} key={t.properties.tripId} />
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}
