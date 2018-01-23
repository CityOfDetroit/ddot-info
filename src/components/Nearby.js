import React from 'react';
import {geolocated} from 'react-geolocated';
import StopsNearLocation from './StopsNearLocation';
import TopNav from './TopNav';

class Nearby extends React.Component {

  render() {
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? 
          <div className="nearby">
          <div className="pa3 schedule">
            <StopsNearLocation coords={this.props.coords} />
          </div>
          </div>
          : <div>Getting the location data&hellip; </div>;
  }
}
 
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Nearby);