import React from 'react';
import Checkbox from 'material-ui/Checkbox';

class MapSatelliteSwitch extends React.Component {
  render() {
    return (
      <div>
        <Checkbox
          label="Satellite view"
          onCheck={this.props.onChange}
          style={{ marginBottom: '.2em' }}
        />
      </div>
    );
  }
}

export default MapSatelliteSwitch;
