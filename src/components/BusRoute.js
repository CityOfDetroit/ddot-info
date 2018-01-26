import React from 'react';
import PropTypes from 'prop-types';

import Schedules from '../data/schedules.js';
import RouteHeader from './RouteHeader';
import BusRouteMap from './BusRouteMap';

class BusRoute extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const thisRoute = Schedules[this.props.match.params.name]
    return (
      <div className="App">
        <RouteHeader color={thisRoute.color} number={this.props.match.params.name} name={thisRoute.rt_name} />
        <BusRouteMap route={thisRoute} />
      </div>
    )
  }
}

BusRoute.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
}

export default BusRoute
