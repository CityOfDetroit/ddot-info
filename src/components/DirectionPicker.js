import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Stops from '../data/stops.js';

import Radio, {RadioGroup} from 'material-ui/Radio';
import { FormControl, FormControlLabel  } from 'material-ui/Form';

class DirectionPicker extends React.Component {
  render() {
    return (
      <FormControl component="fieldset" required>
        <RadioGroup name="directions" value={this.props.currentDirection} onChange={this.props.onChange} style={{ marginLeft: '1em' }}>
          {this.props.directions.map(s => (
            <FormControlLabel key={s} value={s} control={<Radio/>} label={`${_.capitalize(s)} to ${Stops[this.props.route.timepoints[s].slice(-1)].name}`} />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }
}

DirectionPicker.propTypes = {
  directions: PropTypes.array,
  currentDirection: PropTypes.string,
  onChange:PropTypes.func.isRequired
}

export default DirectionPicker;
