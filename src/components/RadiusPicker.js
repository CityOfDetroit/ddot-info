import React from 'react';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

/** Walk radius distance picker for Nearby */
class RadiusPicker extends React.Component {
  render() {
    return (
      <div style={{ fontSize: '1em' }}>
        <span style={{ marginRight: '.5em' }}>Routes and stops within a </span>
        <FormControl component="fieldset" required>
          <Select native name="radii" style={{fontSize: '1em'}}value={this.props.currentRadius} onChange={this.props.onChange} inputProps={{ id: 'radius-picker' }}>
            {this.props.radii.map(r => (
              <option key={r.meters} value={r.meters}>{r.label}</option>
            ))}
          </Select>
        </FormControl>
        <span style={{ marginLeft: '.5em' }}> of your location:</span>
      </div>
    );
  }
}

export default RadiusPicker;
