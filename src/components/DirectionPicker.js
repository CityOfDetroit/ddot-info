import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import Stops from '../data/stops.js';

class DirectionPicker extends React.Component {
  render() {
    return (
      <RadioButtonGroup name="directions" defaultSelected={this.props.directions[0]} onChange={this.props.onChange} style={{ marginLeft: '1em' }}>
        {this.props.directions.map(s => (
          <RadioButton
            key={s} 
            value={s} 
            label={`${_.capitalize(s)} to ${Stops[this.props.route.timepoints[s].slice(-1)].name}`} />
        ))}
      </RadioButtonGroup>
    );
  }
}

DirectionPicker.propTypes = {
  directions: PropTypes.array,
  currentDirection: PropTypes.string,
  onChange:PropTypes.func.isRequired
}

export default DirectionPicker;
