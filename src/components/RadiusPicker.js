import React from 'react';
import Radio, {RadioGroup} from 'material-ui/Radio';
import { FormControl, FormControlLabel  } from 'material-ui/Form';

/** Walk radius distance picker for Nearby */
class RadiusPicker extends React.Component {
  render() {
    return (
      <FormControl component="fieldset" required>
        <RadioGroup name="radii" value={this.props.currentRadius} onChange={this.props.onChange}>
          {this.props.radii.map(r => (
            <FormControlLabel key={r.meters} value={r.meters} control={<Radio/>} label={r.label} />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }
}

export default RadiusPicker;
