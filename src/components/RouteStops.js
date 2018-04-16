import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Toolbar from 'material-ui/Toolbar';
import { AppBar } from 'material-ui';

import DirectionPicker from './DirectionPicker';
import RouteHeader from './RouteHeader';
import RouteStopList from './RouteStopList';
import RouteMap from './RouteMap';
import RouteBadge from './RouteBadge';
import StopInput from './StopInput';
import Helpers from '../helpers';
import Schedules from '../data/schedules.js';

class RouteStops extends React.Component {
  constructor(props) {
    super(props);

    let route = Schedules[this.props.match.params.name]

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
      <div className="BusRoute" style={{background: Helpers.colors['background']}}>
        <RouteHeader number={this.props.match.params.name} page="stops" />
        {/* <div className="routeMap">
          <RouteMap route={thisRoute} />
        </div> */}
        <div className="schedule">
          <AppBar position="static" elevation={0} color="red" style={{ marginBottom: '.5em', padding: '.75em 0em' }} >
            <Toolbar style={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <span style={{ margin: 0, padding: '.5em 0em', fontSize: '1.5em', display: 'flex', flexDirection: 'row' }}>
                Bus stops on route <span style={{ marginLeft: '.25em' }}><RouteBadge id={thisRoute.id} /></span>
              </span>
              <DirectionPicker 
                directions={this.state.availableDirections}
                currentDirection={this.state.currentDirection}
                onChange={this.handleDirectionChange}
                route={thisRoute} />
              <StopInput input={this.state.input} onSearchChange={this.handleSearchChange} fullWidth={false} />
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
