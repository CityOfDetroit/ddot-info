import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Colors from '../data/colors.js'
import chroma from 'chroma-js'

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
        <form>
        {this.props.directions.map(d => (
          <div className="fw7 dib pa2 mr2" key={d} style={{backgroundColor: `rgba(${chroma(Colors[d]).alpha(0.5).rgba().toString()})`}}>
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