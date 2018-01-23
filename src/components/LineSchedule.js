import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import ScheduleTable from './ScheduleTable';
import ServicePicker from './ServicePicker';
import DirectionPicker from './DirectionPicker';
import LineHeader from './LineHeader';
import BusRouteStopList from './BusRouteStopList'

import Helpers from '../helpers';

class LineSchedule extends React.Component {
  constructor(props) {
    super(props);

    let route = Helpers.getRoute(parseInt(this.props.match.params.name, 10))

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
      routeName: (route.rt_name),
      routeId: (route.rt_id),
      routeNumber: parseInt(this.props.match.params.name, 10),
      description: (route.description),
      weekday: (route.schedules.weekday),
      saturday: (route.schedules.saturday),
      sunday: (route.schedules.sunday),
      tripIds: tripIds,
      realtimeTrips: [],
      color: (route.color),
      currentSvc: (Object.keys(route.schedules).length > 1 ? Helpers.dowToService(moment().day()) : 'weekday'),
      currentDirection: (Object.keys(route.schedules.weekday)[0]),
      currentStops: [],
      availableServices: (Object.keys(route.schedules)),
      availableDirections: (Object.keys(route.schedules.weekday)),
      routeBbox: route.bbox,
    };

    this.handleDirectionChange = this.handleDirectionChange.bind(this);
    this.handleServiceChange = this.handleServiceChange.bind(this);
  }

  fetchData() {
    fetch(`https://ddot-proxy-test.herokuapp.com/api/where/trips-for-route/DDOT_${this.state.routeId}.json?key=BETA&includeStatus=true&includePolylines=false`)
    .then(response => response.json())
    .then(d => {
      let geojson = d.data.list.map(bus => {
        return {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [bus.status.position.lon, bus.status.position.lat]
          },
          "properties": {
            "tripId": bus.status.activeTripId,
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
      this.setState({realtimeTrips: realtimeTrips})

    })
    .catch(e => console.log(e));
  }

  handleDirectionChange(event) {
    this.setState({
      currentDirection: event.target.value
    });
  }

  handleServiceChange(event) {
    this.setState({
      currentSvc: event.target.value
    });
  }

  componentDidMount() {
    this.fetchData()
    this.interval = setInterval(() => this.fetchData(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div className="App">
        <LineHeader color={this.state.color} number={this.props.match.params.name} name={this.state.routeName} />
        <div className="pickers">
          <ServicePicker 
            services={this.state.availableServices}
            currentSvc={this.state.currentSvc}
            onChange={this.handleServiceChange}
          />
          <DirectionPicker 
            directions={this.state.availableDirections}
            currentDirection={this.state.currentDirection}
            onChange={this.handleDirectionChange} 
          />
                  <h2>Stops on this schedule</h2>

        </div>
        <BusRouteStopList
          id={this.state.routeId}
          routeNumber={this.state.routeNumber}
          timepoints={this.state[this.state.currentSvc][this.state.currentDirection].stops}
          />
        <ScheduleTable 
          schedule={this.state[this.state.currentSvc]} 
          direction={this.state.currentDirection} 
          liveTrips={_.map(this.state.realtimeTrips, 'properties.tripId')} 
          color={this.state.color}
        />
      </div>
    )
  }
}

LineSchedule.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
}

export default LineSchedule;
