import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import {FormControlLabel} from 'material-ui';

class MapSatelliteSwitch extends React.Component {
  render() {
    return (
      <div className="ph2">
        <FormControlLabel 
          control={<Checkbox
            onChange={this.props.onChange}
            defaultChecked
          />}
          label="Satellite"
        />

      </div>
    );
  }
}

export default MapSatelliteSwitch;
