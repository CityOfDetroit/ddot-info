import React from 'react';
import PropTypes from 'prop-types';

import Schedules from '../data/schedules.js';
import RouteHeader from './RouteHeader';
import RouteMap from './RouteMap';
import RouteDetails from './RouteDetails';

class BusRoute extends React.Component {

  constructor(props) {
    super(props)
    this.onTabsChange = this.onTabsChange.bind(this)
  }

  onTabsChange(event) {
    console.log(event)
  }
 
  render() {
    const thisRoute = Schedules[this.props.match.params.name];
    
    return (
      <div className="BusRoute">
        <RouteHeader number={this.props.match.params.name}/>
        <RouteMap route={thisRoute} />
        <RouteDetails id={this.props.match.params.name} />
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

export default BusRoute;
