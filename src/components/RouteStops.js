import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Toolbar from 'material-ui/Toolbar';
import { AppBar } from 'material-ui';

import DirectionPicker from './DirectionPicker';
import RouteHeader from './RouteHeader';
import RouteStopList from './RouteStopList';
import RouteBadge from './RouteBadge';
import StopInput from './StopInput';
import Helpers from '../helpers';
import Schedules from '../data/schedules.js';

/** All bus stops for a single route at /route/{#}/stops */
class RouteStops extends React.Component {
  constructor(props) {
    super(props);

    let route = Schedules[this.props.match.params.name];

    this.state = {
      routeName: (route.rt_name),
      weekday: (route.schedules.weekday),
      saturday: (route.schedules.saturday),
      sunday: (route.schedules.sunday),
      routeId: (route.rt_id),
      currentSvc: (Object.keys(route.schedules).length > 1 ? Helpers.dowToService(moment().day()) : 'weekday'),
      currentDirection: (Object.keys(route.schedules.weekday)[0]),
      availableServices: (Object.keys(route.schedules)),
      availableDirections: (Object.keys(route.schedules.weekday)),
      input: ''
    };

    this.handleDirectionChange = this.handleDirectionChange.bind(this);
    this.handleServiceChange = this.handleServiceChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(event) {
    console.log(event)
    this.setState({ 
      input: event.target.value.toLowerCase()
    });
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

  render() {
    const thisRoute = Schedules[this.props.match.params.name];

    return (
      <div className="BusRoute" style={{ background: Helpers.colors['background'] }}>
        <RouteHeader number={this.props.match.params.name} page="stops" />
        <div className="schedule">
          <AppBar position="static" color="default" elevation={0} style={{ display: 'flex', background: 'white' }}>
            <Toolbar elevation={0} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ margin: 0, padding: '.5em 0em', fontSize: '1.5em', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <span style={{ marginLeft: '.25em' }}><RouteBadge id={thisRoute.id} showName /></span>: <span style={{ fontWeight: 700, paddingLeft: '.2em' }}>Bus stops</span>
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '.5em' }}>
                <span style={{ fontSize: '.9em' }}><b>Major stops</b> </span>
                <span style={{ height: '15px', width: '15px', backgroundColor: '#000', border: '1px solid #000', borderRadius: '3em', margin: '.25em' }}></span>
                <span style={{ fontSize: '.9em' }}> and local stops </span>
                <span style={{ height: '13px', width: '13px', backgroundColor: '#fff', border: `3px solid ${thisRoute.color}`, borderRadius: '3em', margin: '.25em' }}></span>
                <span style={{ fontSize: '.9em' }}> shown in order of arrival.</span>
              </div>
              <span style={{ fontSize: '.9em', marginBottom: '.5em' }}>Transfer to other routes from the same stop or a nearby stop.</span>
            </Toolbar>
          </AppBar>
          <AppBar position="static" color="default" elevation={0} style={{ display: 'flex', padding: '.5em 0em', marginBottom: '1em' }}>
            <Toolbar elevation={0} style={{ justifyContent: 'flex-start', flexWrap: 'wrap' }}>
              <DirectionPicker 
                directions={this.state.availableDirections}
                currentDirection={this.state.currentDirection}
                onChange={this.handleDirectionChange}
                route={thisRoute} />
              <div style={{ width: 400, marginTop: '1em' }}>
                <StopInput input={this.state.input} onSearchChange={this.handleSearchChange} />
              </div>
            </Toolbar>
          </AppBar>
          <RouteStopList
            id={this.state.routeId}
            input={this.state.input}
            routeNumber={thisRoute.id}
            timepoints={this.state[this.state.currentSvc][this.state.currentDirection].timepoints} />
        </div>
      </div>
    );
  }
}

RouteStops.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
}

export default RouteStops;
