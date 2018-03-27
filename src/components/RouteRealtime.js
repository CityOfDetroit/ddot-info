import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'

import RealtimeCard from './RealtimeCard'
import RouteHeader from './RouteHeader'
import Helpers from '../helpers'
import Schedules from '../data/schedules.js'

class RouteRealtime extends React.Component {
  constructor(props) {
    super(props)

    let route = Schedules[parseInt(this.props.match.params.name, 10)]
    let tripIds = {}
    
    Object.keys(route.schedules).forEach(svc => {
      Object.keys(route.schedules.weekday).forEach(dir => {
        if (!tripIds[dir]) {
          tripIds[dir] = []
        }
        tripIds[dir] = tripIds[dir].concat(route.schedules[svc][dir].trips.map(trip => trip.trip_id))
      })
    })

    this.state = {
      route: (route),
      routeId: (route.rt_id),
      tripIds: tripIds,
      realtimeTrips: [],
      fetched: false,
    }
  }

  fetchData() {
    fetch(`${Helpers.endpoint}/trips-for-route/DDOT_${this.state.routeId}.json?key=BETA&includeStatus=true&includePolylines=false`)
    .then(response => response.json())
    .then(d => {
      let geojson = _.sortBy(d.data.list, 'status.tripId').map((bus, i) => {
        let direction = _.findKey(this.state.tripIds, t => { return t.indexOf(bus.status.activeTripId.slice(-4)) > -1})
          return {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [bus.status.position.lon, bus.status.position.lat]
            },
            "properties": {
              "tripId": bus.status.activeTripId,
              "displayTripId": bus.status.activeTripId.slice(-4,),
              "scheduledDistanceAlongTrip": bus.status.scheduledDistanceAlongTrip,
              "nextStop": bus.status.nextStop,
              "nextStopOffset": bus.status.nextStopTimeOffset,
              "predicted": bus.status.predicted,
              "updateTime": moment(bus.status.lastUpdateTime).format("h:mm:ss a"),
              "onTime": bus.status.scheduleDeviation / 60,
              "lastStop": this.state.route.timepoints[direction] ? this.state.route.timepoints[direction].slice(-1)[0] : ``,
              "direction": direction
            }
          }
      })
      let realtimeTrips = _.filter(geojson, o => { return o.properties.direction !== undefined })
      this.setState({ 
        realtimeTrips: realtimeTrips.map(t => t.properties.tripId) ,
        fetched: true
      })
    })
    .catch(e => console.log(e))
  }

  componentDidMount() {
    this.fetchData()
    this.interval = setInterval(() => this.fetchData(), 20000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div className="App">
        <RouteHeader color={this.state.color} number={this.props.match.params.name} name={this.state.routeName} />
        {this.state.fetched ?
          <div style={{
            gridRow: '2/11', 
            gridColumn: '1/9', 
            display: 'flex',
            flexWrap: 'wrap', 
            // gridTemplateColumns: `repeat(auto-fit, 1fr))`, 
            // gridTemplateRows: `repeat(auto-fit, 1fr)`, 
            // gridGap: `.5em`,
            margin: '.25em' }}>
          {this.state.realtimeTrips.map(rt => (
            <RealtimeCard trip={rt} />
          ))}
          </div>
        : `Loading real-time arrival data...` }
      </div>
    )
  }
}

RouteRealtime.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
}

export default RouteRealtime;
