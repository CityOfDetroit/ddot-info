import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import {FormControlLabel} from 'material-ui';

/** Checkbox to toggle satelite imagery for RouteMap and NearbyMap */
class MapSatelliteSwitch extends React.Component {
  render() {
    return (
      <div style={{ padding: '.5em 1em', background: 'rgba(255,255,255,0.8)', display: 'inline-block' }}>
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

export default MapSatelliteSwitch;
