import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControlLabel } from '@material-ui/core';

/** Checkbox to toggle satelite imagery for RouteMap and NearbyMap */
class MapSatelliteSwitch extends React.Component {
  render() {
    return (
      <div style={{ padding: '.5em 1em', background: 'rgba(255,255,255,0.8)', display: 'inline-block', zIndex: 999 }}>
        <FormControlLabel 
          control={<Checkbox
            onChange={this.props.onChange}
            defaultChecked={this.props.checked}
          />}
          label="Satellite" />
      </div>
    );
  }
}

MapSatelliteSwitch.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultChecked: PropTypes.bool.isRequired
}

export default MapSatelliteSwitch;
