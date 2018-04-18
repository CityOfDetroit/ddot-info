import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import Helpers from '../helpers';
import Stops from '../data/stops.js'
import NearbyMap from './NearbyMap';
import NearbyList from './NearbyList';

/** Fetches data within a certain walk radius of users location for NearbyList and NearbyMap */
class FeaturesNearLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      closeStopsByRoutes: [],
      fetchedData: false,
    }
  }

  /** For a unique route, only show the closest stop */
  getClosestStops(coords, data) {
    const nearbyStops = _.sortBy(data, c => { 
      return Math.sqrt(Math.pow(Math.abs(coords.latitude - c.lat), 2) + Math.pow(Math.abs(coords.longitude - c.lon), 2))
    })
    const stops = nearbyStops.map(s => Stops[s.id.slice(5,)])
    let possibilities = [].concat.apply([], stops.map(s => s.routes))
    const nearbyRoutes = _.uniqBy(possibilities, p => { return p[0] + p[1] })
    const nearbyRoutesWithStops = nearbyRoutes.map(nr => {
      let stop = _.find(stops, s => {return s.routes.indexOf(nr) > -1})
      return [nr[0], nr[1], stop.id]
    })
    return _.groupBy(nearbyRoutesWithStops, 0)
  }

  fetchData(meters, coords) {
    fetch(`${Helpers.endpoint}/stops-for-location.json?key=BETA&radius=${meters}&lat=${coords.latitude}&lon=${coords.longitude}`)
    .then(response => response.json())
    .then(d => {
      const stops = this.getClosestStops(coords, d.data.list)
      this.setState({
        data: d,
        closeStopsByRoutes: stops,
        fetchedData: true
      })
    })
    .catch(e => console.log(e));
  }

  componentDidMount() {
    this.fetchData(this.props.meters, this.props.coords);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.meters !== nextProps.meters) {
      this.fetchData(nextProps.meters, this.props.coords);
    }
  }

  render() {
    return (
      this.state.fetchedData ? 
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <NearbyList stops={this.state.closeStopsByRoutes} />
          <NearbyMap stops={this.state.closeStopsByRoutes} coords={this.props.coords} currentRadius={this.props.meters} />
        </div>
      : null 
    );
  }
}

FeaturesNearLocation.propTypes = {
  coords: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  meters: PropTypes.string,
}

export default FeaturesNearLocation;
