import React from 'react';
import PropTypes from 'prop-types';
import { geolocated } from 'react-geolocated';

import FeaturesNearLocation from './FeaturesNearLocation';

class Nearby extends React.Component {

  render() {
    return (
      !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div> : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div> : this.props.coords
          ? 
          <div>
              <FeaturesNearLocation coords={this.props.coords} />
            </div>
          : <div>Getting the location data&hellip;</div>
    )
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
