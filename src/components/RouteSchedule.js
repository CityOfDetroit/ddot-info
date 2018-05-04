import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import chroma from 'chroma-js';
import Toolbar from 'material-ui/Toolbar';
import { AppBar } from 'material-ui';

import Schedules from '../data/schedules.js';
import Helpers from '../helpers.js';
import ScheduleTable from './ScheduleTable';
import ServicePicker from './ServicePicker';
import DirectionPicker from './DirectionPicker';
import RouteHeader from './RouteHeader';
import RouteBadge from './RouteBadge';

/** Schedule for a single route at /route/{#}/schedule */
class RouteSchedule extends React.Component {
  constructor(props) {
    super(props);

    let route = Schedules[parseInt(this.props.match.params.name, 10)];
    let tripIds = {};
    Object.keys(route.schedules).forEach(svc => {
      Object.keys(route.schedules.weekday).forEach(dir => {
        if (!tripIds[dir]) {
          tripIds[dir] = []
        }
        tripIds[dir] = tripIds[dir].concat(route.schedules[svc][dir].trips.map(trip => trip.trip_id))
      });
    });

    this.state = {
      route: route,
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
      open: false
    };

    this.handleDirectionChange = this.handleDirectionChange.bind(this);
    this.handleServiceChange = this.handleServiceChange.bind(this);
  }

  fetchData() {
    fetch(`${Helpers.endpoint}/trips-for-route/DDOT_${this.state.routeId}.json?key=BETA&includeStatus=true&includePolylines=false`)
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
      this.setState({ 
        realtimeTrips: realtimeTrips 
      });
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
    this.fetchData();
    this.interval = setInterval(() => this.fetchData(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="BusRoute" style={{ background: Helpers.colors['background'] }}>
        <RouteHeader number={this.props.match.params.name} page="schedule" />
        <div className="schedule">
          <AppBar position="static" color="default" elevation={0} style={{ display: 'flex', background: 'white' }}>
            <Toolbar elevation={0} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ margin: 0, padding: '.5em 0em', fontSize: '1.5em', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <span style={{ marginLeft: '.25em' }}><RouteBadge id={this.props.match.params.name} showName/></span>: <span style={{ fontWeight: 700, paddingLeft: '.2em' }}>Schedule</span>
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '.5em' }}>
                <span style={{ fontSize: '.9em' }}><b>Major stops</b> </span>
                <span style={{ height: '15px', width: '15px', backgroundColor: '#000', border: '1px solid #000', borderRadius: '3em', margin: '.25em' }}></span>
                <span style={{ fontSize: '.9em' }}> are shown in order from left to right; look down the column to see scheduled departure times from that bus stop.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '.5em' }}>
                <span style={{ fontSize: '.9em' }}>Displaying AM times, <b>PM times</b>, and </span>
                <span style={{ background: chroma(this.state.color).alpha(0.25).css(), fontSize: '.9em', marginLeft: '.25em', padding: '.15em' }}> current trips.</span>
              </div>
            </Toolbar>
          </AppBar>
          <AppBar position="static" color="default" elevation={0} style={{ display: 'flex', flexWrap: 'wrap', padding: '.5em 0em', marginBottom: '1em' }}>
            <Toolbar elevation={0} style={{ justifyContent: 'flex-start' }}>
              <ServicePicker
                services={this.state.availableServices}
                currentSvc={this.state.currentSvc}
                onChange={this.handleServiceChange} />
              <DirectionPicker 
                directions={this.state.availableDirections}
                currentDirection={this.state.currentDirection}
                onChange={this.handleDirectionChange}
                route={this.state.route} />
            </Toolbar>
          </AppBar>
          <div style={{ padding: '1em 0em', backgroundColor: '#fff' }}>
            <ScheduleTable 
              schedule={this.state[this.state.currentSvc]} 
              direction={this.state.currentDirection} 
              liveTrips={_.map(this.state.realtimeTrips, 'properties.tripId')} 
              color={this.state.color} />
          </div>
        </div>
      </div>
    );
  }
}

RouteSchedule.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
}

export default RouteSchedule;
