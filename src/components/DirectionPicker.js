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

    const colors = {
      'northbound': 'violet',
      'eastbound': 'violet',
      'southbound': 'orange',
      'westbound': 'orange',
      'clockwise': 'green'   
    }

    return (
      <div className="dib pa2">
        <form>
        {this.props.directions.map(d => (
          <div className="fw7 dib pa2 mr2" key={d} style={{backgroundColor: colors[d]}}>
            <label className="">
            <input 
              className="mr2"
              type="radio" 
              name="direction" 
              onChange={(e) => {
                this.props.onChange(e);
                this.setState({selectedOption: d});
              }} 
              value={d} 
              checked={this.state.selectedOption === d} 
            />
            {_.capitalize(d)}</label>
          </div>
        ))}
        </form>
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