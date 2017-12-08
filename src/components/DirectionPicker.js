import React from 'react';
import PropTypes from 'prop-types';

class DirectionPicker extends React.Component {
  constructor(props) {
    console.log(props.currentDirection)
    super(props)
    this.state = {selectedOption: props.currentDirection}
  }

  render() {
    return (
      <form>
      {this.props.directions.map(d => (
        <div key={d}>
          <label>
          <input 
            type="radio" 
            name="direction" 
            onChange={(e) => {
              this.props.onChange(e);
              this.setState({selectedOption: d});
              }} 
            value={d} 
            checked={this.state.selectedOption === d} 
          />
          {d}</label>
        </div>
      ))}
      </form>
    )
  }
}

DirectionPicker.propTypes = {
  directions: PropTypes.array,
  currentDirection: PropTypes.string,
  onChange:PropTypes.func.isRequired
}

export default DirectionPicker;