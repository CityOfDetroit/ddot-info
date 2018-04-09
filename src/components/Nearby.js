import React from 'react';
import PropTypes from 'prop-types';
import { geolocated } from 'react-geolocated';
import Toolbar from 'material-ui/Toolbar';
import { AppBar } from 'material-ui';

import FeaturesNearLocation from './FeaturesNearLocation';
import RadiusPicker from './RadiusPicker';
import Helpers from '../helpers';

const radii = [
  { meters: '200', label: '5 minute walk' },
  { meters: '400', label: '10 minute walk' },
];

const styles = {
  nearby: {
    display: 'grid',
    gridTemplate: `auto 1fr / 1fr 1fr`,
    gridGap: 15
  },
  radius: {
    gridRow: `1 / 2`,
    gridColumn: `1 / 3`
  },
  data: {
    gridRow: `2 / 3`,
    gridColumn: `1 / 3`
  }
}

/** Top level component for /nearby page */
class Nearby extends React.Component {
  constructor(props) {
    super(props);

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
          <div style={styles.nearby}>
            <div style={styles.radius}>
              <AppBar position="static" color="default" elevation={0}>
                <Toolbar elevation={0} style={{ justifyContent: window.innerWidth < 650 ? 'space-around' : 'flex-start' }}>
                  <RadiusPicker radii={radii} currentRadius={this.state.currentRadius} onChange={this.onRadiusChange} />
                </Toolbar>
              </AppBar>
            </div>
            <div style={styles.data}>
              <FeaturesNearLocation coords={this.props.coords} meters={this.state.currentRadius} />
            </div>
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
