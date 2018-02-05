import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import ScheduleTable from './ScheduleTable';
import ServicePicker from './ServicePicker';
import DirectionPicker from './DirectionPicker';
import RouteHeader from './RouteHeader';
import RouteStopList from './RouteStopList'
import RouteMap from './RouteMap'
import StopInput from './StopInput'

import Helpers from '../helpers';
import Schedules from '../data/schedules.js'

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
    };

    this.handleDirectionChange = this.handleDirectionChange.bind(this);
    this.handleServiceChange = this.handleServiceChange.bind(this);
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
    const thisRoute = Schedules[this.props.match.params.name]
    return (
      <div className="BusRoute">
        <RouteHeader number={this.props.match.params.name} />
        <RouteMap route={thisRoute} />
        <div className="stopList">
        <h2>Stops on this schedule</h2>
          <DirectionPicker 
            directions={this.state.availableDirections}
            currentDirection={this.state.currentDirection}
            onChange={this.handleDirectionChange} 
          />
        <RouteStopList
          id={this.state.routeId}
          routeNumber={thisRoute.id}
          timepoints={this.state[this.state.currentSvc][this.state.currentDirection].stops}
          />
        </div>
      </div>
    )
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
