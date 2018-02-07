import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Stops from '../data/stops.js'

class DirectionPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      selectedOption: props.currentDirection 
    };
  }

  render() {
    console.log(this.props.route)

    return (
      <div className="dib pa2">
        <select className="fw7 f5 pa2" onChange={this.props.onChange} style={{border: '3px solid #ddd'}}>
          {this.props.directions.map(s => (
            <option className="fw5" value={s} key={s}>{_.capitalize(s)} to {Stops[this.props.route.timepoints[s].slice(-1)].name}</option>
          ))}
        </select>
      </div>
    )
  }
}

DirectionPicker.propTypes = {
  directions: PropTypes.array,
  currentDirection: PropTypes.string,
  onChange:PropTypes.func.isRequired
}

export default DirectionPicker;