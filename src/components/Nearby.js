import React from 'react';
import PropTypes from 'prop-types';
import { geolocated } from 'react-geolocated';

import FeaturesNearLocation from './FeaturesNearLocation';
import RadiusPicker from './RadiusPicker';

const radii = [
  { meters: '200', label: '5 minute walk' },
  { meters: '400', label: '10 minute walk' },
];

class Nearby extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentRadius: '200',
    }

    this.onRadiusChange = this.onRadiusChange.bind(this);
  }

  onRadiusChange(event) {
    this.setState({
      currentRadius: event.target.value
    });
  }

  render() {
    return (
      !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div> : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div> : this.props.coords
          ? 
          <div>
            <FeaturesNearLocation coords={this.props.coords} meters={this.state.currentRadius} />
            <RadiusPicker radii={radii} currentRadius={this.state.currentRadius} onChange={this.onRadiusChange} />
          </div>
          : <div>Getting the location data&hellip;</div>
    );
  }
}

Nearby.propTypes = {
  isGeolocationAvailable: PropTypes.bool,
  isGeolocationEnabled: PropTypes.bool,
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Nearby);
