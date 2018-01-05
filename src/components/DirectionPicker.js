import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class DirectionPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      selectedOption: props.currentDirection 
    };
  }

  render() {
    return (
      <div className="dib pa2">
        <select className="fw5 f4" onChange={this.props.onChange}>
          {this.props.directions.map(s => (
            <option className="fw5" value={s} key={s}>{_.capitalize(s)}</option>
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