import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Radio, RadioGroup} from '@material-ui/core';
import { FormControl, FormControlLabel } from '@material-ui/core';

import Stops from '../data/stops.js';

/** Service direction picker for RouteSchedule and RouteStopList */
class DirectionPicker extends React.Component {
  render() {
    return (
      <FormControl component="fieldset" required>
        <RadioGroup name="directions" value={this.props.currentDirection} onChange={this.props.onChange}>
          {this.props.directions.map(s => (
            <FormControlLabel key={s} value={s} control={<Radio/>} label={window.innerWidth > 650 ? `${_.capitalize(s)} to ${Stops[this.props.route.timepoints[s].slice(-1)].name}` : `${_.capitalize(s)}`} />
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
