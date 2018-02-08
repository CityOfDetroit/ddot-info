import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'

import RealtimeRouteMap from './RealtimeRouteMap'
import RealtimeTripList from './RealtimeTripList'
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
      routeName: (route.rt_name),
      routeId: (route.rt_id),
      description: (route.description),
      weekday: (route.schedules.weekday),
      saturday: (route.schedules.saturday),
      sunday: (route.schedules.sunday),
      tripIds: tripIds,
      realtimeTrips: [],
      fetched: false,
      color: (route.color),
      currentSvc: (Object.keys(route.schedules).length > 1 ? Helpers.dowToService(moment().day()) : 'weekday'),
      currentDirection: (Object.keys(route.schedules.weekday)[0]),
      availableServices: (Object.keys(route.schedules)),
      availableDirections: (Object.keys(route.schedules.weekday)),
      routeBbox: route.bbox,
      timepointStops: route.timepoints[Object.keys(route.schedules.weekday)[0]]
    }

    this.handleDirectionChange = this.handleDirectionChange.bind(this)
    this.handleServiceChange = this.handleServiceChange.bind(this)
  }

  fetchData() {
    fetch(Helpers.proxyUrl + `${Helpers.endpoint}/trips-for-route/DDOT_${this.state.routeId}.json?key=BETA&includeStatus=true&includePolylines=false`)
    .then(response => response.json())
    .then(d => {
      let geojson = _.sortBy(d.data.list, 'status.tripId').map((bus, i) => {
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
            "direction": _.findKey(this.state.tripIds, t => { return t.indexOf(bus.status.activeTripId.slice(-4)) > -1})
          }
        }
      })
      let realtimeTrips = _.filter(geojson, o => { return o.properties.direction !== undefined })
      this.setState({ 
        realtimeTrips: realtimeTrips ,
        fetched: true
      })
    })
    .catch(e => console.log(e))
  }

  handleDirectionChange(event) {
    this.setState({
      currentDirection: event.target.value
    })
  }

  handleServiceChange(event) {
    this.setState({
      currentSvc: event.target.value
    })
  }

  componentDidMount() {
    this.fetchData()
    this.interval = setInterval(() => this.fetchData(), 3000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div className="App">
        <RouteHeader color={this.state.color} number={this.props.match.params.name} name={this.state.routeName} />
        <RealtimeRouteMap 
          routeId={this.props.match.params.name} 
          stops={this.state.timepointStops} 
          bbox={this.state.routeBbox} 
          trips={this.state.realtimeTrips} 
        />
        {this.state.fetched ?
          <RealtimeTripList
                trips={this.state.realtimeTrips}
                route={this.state.route} /> 
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
