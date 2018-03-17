import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Stops from '../data/stops.js';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

class DirectionPicker extends React.Component {
  constructor(props) {
    super(props)

    this.state = { 
      selectedOption: props.currentDirection 
    }
  }

  render() {
    return (
      <RadioButtonGroup onChange={this.props.onChange} style={{marginLeft: '1em'}}>
        {this.props.directions.map(s => (
          <RadioButton 
            value={s} 
            label={`${_.capitalize(s)} to ${Stops[this.props.route.timepoints[s].slice(-1)].name}`} 
            />
        ))}
      </RadioButtonGroup>
    )
  }
}

DirectionPicker.propTypes = {
  directions: PropTypes.array,
  currentDirection: PropTypes.string,
  onChange:PropTypes.func.isRequired
}

export default DirectionPicker;
