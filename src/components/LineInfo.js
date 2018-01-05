import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import ScheduleTable from './ScheduleTable';
import ServicePicker from './ServicePicker';
import DirectionPicker from './DirectionPicker';
import RouteMap from './RouteMap';
import RealtimeTripList from './RealtimeTripList'

import { Link } from 'react-router-dom';

import Helpers from '../helpers';

class LineInfo extends React.Component {
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
      description: (route.description),
      weekday: (route.schedules.weekday),
      saturday: (route.schedules.saturday),
      sunday: (route.schedules.sunday),
      tripIds: tripIds,
      realtimeTrips: [],
      color: (route.color),
      currentSvc: (Object.keys(route.schedules).length > 1 ? Helpers.dowToService(moment().day()) : 'weekday'),
      currentDirection: (Object.keys(route.schedules.weekday)[0]),
      availableServices: (Object.keys(route.schedules)),
      availableDirections: (Object.keys(route.schedules.weekday)),
      routeBbox: route.bbox,
      timepointStops: route.timepoints[Object.keys(route.schedules.weekday)[0]]
    };

    this.handleDirectionChange = this.handleDirectionChange.bind(this);
    this.handleServiceChange = this.handleServiceChange.bind(this);
  }

  fetchData() {
    fetch(`https://ddot-proxy-test.herokuapp.com/api/where/vehicles-for-agency/DDOT.json?key=BETA&includePolylines=false`)
    .then(response => response.json())
    .then(d => {

      let allTripIds = _.flattenDeep(Object.values(this.state.tripIds))

      let x = d.data.list.filter(trip => {
        return allTripIds.indexOf(trip.tripId.slice(-4)) > 0
      })

      let geojson = x.map(bus => {
        return {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [bus.tripStatus.position.lon, bus.tripStatus.position.lat]
          },
          "properties": {
            "tripId": bus.tripStatus.activeTripId,
            "nextStop": bus.tripStatus.nextStop,
            "direction": _.findKey(this.state.tripIds, t => { return t.indexOf(bus.tripStatus.activeTripId.slice(-4)) > 0})
          }
        }
      })

      let fc = {
        "type": "FeatureCollection",
        "features": geojson
      }

      console.log(geojson)
      this.setState({realtimeTrips: geojson})

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
      <div>
        <div>
          <div className="pl3-ns pl2-s pv3-ns pv2-s v-mid bg-light-gray">
            
            <span className="f4-s f2-ns fw7 v-mid ml2"><Link className="link dim dark-gray" to={{pathname: `/`}}>&lt;</Link> </span>
            <span className="dib f4-s f2-ns pa2 ma2 v-mid white fw7" style={{ backgroundColor: this.state.color }}>
              {this.props.match.params.name}
            </span>
            <span className="dib f4-s f2-ns ml2 v-mid fw5 mr5">
              {this.state.routeName}
            </span>
          </div>
          <div className='w-50-l w-100-m w-100-s dib map'>
            <RouteMap routeId={this.props.match.params.name} stops={this.state.timepointStops} bbox={this.state.routeBbox} trips={this.state.realtimeTrips} />
            <RealtimeTripList trips={this.state.realtimeTrips} />
          </div>
          <div className='w-50-l w-100-m w-100-s v-top tc dib schedule' >
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
            <ScheduleTable schedule={this.state[this.state.currentSvc]} direction={this.state.currentDirection} liveTrips={this.state.liveTrips} color={this.state.color}/>
          </div>
        </div>
      </div>
    )
  }
}

LineInfo.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
}

export default LineInfo;
