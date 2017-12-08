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
      <div className="ml5 dib">
        <span className="f3 ml3 fw5">Direction of Travel</span>
        <form>
        {this.props.directions.map(d => (
          <div className="dib pa2" key={d}>
            <label className="f3">
            <input 
              className="ma2"
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