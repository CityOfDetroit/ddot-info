import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import Card, { CardContent } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import chroma from 'chroma-js';

import Schedules from '../data/schedules.js';
import routeDetails from '../data/routeDetails.js';
import Helpers from '../helpers.js';

import ScheduleTable from './ScheduleTable';
import ServicePicker from './ServicePicker';
import DirectionPicker from './DirectionPicker';
import RouteHeader from './RouteHeader';
import PrintSchedule from './PrintSchedule';

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
    let routeDetailObj = _.filter(routeDetails, {number: this.state.routeNumber})[0];

    return (
      <div className="App">
        <RouteHeader color={this.state.color} number={this.props.match.params.name} name={this.state.routeName} />
        <div className="schedule">
          <Card className="ma1">
            <CardContent style={{ display: 'flex', flexWrap: 'wrap' }}>
              <ServicePicker
                services={this.state.availableServices}
                currentSvc={this.state.currentSvc}
                onChange={this.handleServiceChange} />
              <DirectionPicker 
                directions={this.state.availableDirections}
                currentDirection={this.state.currentDirection}
                onChange={this.handleDirectionChange}
                route={this.state.route} />
              <div style={{display: 'flex'}}>
                <Chip style={{ margin: 6 }} labelStyle={{ fontSize: '.7em' }} label="am times" />
                <Chip style={{ margin: 6, fontWeight: 700 }} labelStyle={{ fontSize: '.7em' }} label={<strong>pm times</strong>} />
                <Chip style={{ margin: 6, backgroundColor: chroma(this.state.color).alpha(0.25).css() }} labelStyle={{ fontSize: '.7em' }} label="current trips" />
              </div>
              <div>
                <PrintSchedule routePdf={routeDetailObj.pdf} />
              </div>
            </CardContent>
          </Card>
          <ScheduleTable 
            schedule={this.state[this.state.currentSvc]} 
            direction={this.state.currentDirection} 
            liveTrips={_.map(this.state.realtimeTrips, 'properties.tripId')} 
            color={this.state.color} />
        </div>
      </div>
    )
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
