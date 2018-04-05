import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import chroma from 'chroma-js';
import Toolbar from 'material-ui/Toolbar';
import { AppBar } from 'material-ui';
import HelpOutline from 'material-ui-icons/HelpOutline';
import IconButton from 'material-ui/IconButton';
import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';

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

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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
        <RouteHeader number={this.props.match.params.name} page="schedule" />
        <div className="schedule">
          <AppBar position="static" color="default" elevation={0} style={{display: 'flex', flexWrap: 'wrap', padding: '.2em 0em', marginBottom: '1em'}}>
            <Toolbar elevation={0} style={{justifyContent: window.innerWidth < 650 ? 'space-around' : 'flex-start'}}>
              {/* <h4 style={{maxWidth: 100}}>Service and direction:</h4> */}
              <ServicePicker
                services={this.state.availableServices}
                currentSvc={this.state.currentSvc}
                onChange={this.handleServiceChange} />
              <DirectionPicker 
                directions={this.state.availableDirections}
                currentDirection={this.state.currentDirection}
                onChange={this.handleDirectionChange}
                route={this.state.route} />
              {/* <IconButton onClick={this.handleClickOpen}><HelpOutline /></IconButton> */}
              {/* <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                <div style={{display: 'flex', alignItems: 'center'}}>
                <p style={{marginRight: '.5em', maxWidth: 400}}>Major stops are shown in order from left to right; look down the column to see scheduled arrivals at that stop.</p>
                <ul style={{width: 200}}>
                  <li style={{ padding: '.25em' }}>AM arrivals</li>
                  <li style={{ fontWeight: 700, padding: '.25em'}}>PM arrivals</li>
                  <li style={{ backgroundColor: chroma(this.state.color).alpha(0.25).css(), padding: '.25em' }}>current trips</li>
                </ul>
                </div>
                <DialogActions>
                <PrintSchedule routePdf={routeDetailObj.pdf} />
                </DialogActions>
                </DialogContent>
              </Dialog>    */}
            </Toolbar>
          </AppBar>
          <ScheduleTable 
            schedule={this.state[this.state.currentSvc]} 
            direction={this.state.currentDirection} 
            liveTrips={_.map(this.state.realtimeTrips, 'properties.tripId')} 
            color={this.state.color} />
          <Divider style={{ marginTop: '1em' }} />
          <div style={{display: 'flex', flexDirection: 'column', padding: '.5em' }}>
            <div>
              <p style={{ fontSize: '.9em', marginLeft: '.5em' }}>Major stops are shown in order from left to right; look down the column to see scheduled departure times at that stop.</p>
            </div>
            <div style={{ display: 'flex' }}>
              <Chip style={{ margin: 6 }} labelStyle={{ fontSize: '.7em' }} label="am times" />
              <Chip style={{ margin: 6, fontWeight: 700 }} labelStyle={{ fontSize: '.7em' }} label="pm times" />
              <Chip style={{ margin: 6, backgroundColor: chroma(this.state.color).alpha(0.25).css() }} labelStyle={{ fontSize: '.7em' }} label="current trips" />
            </div>
          </div>
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
