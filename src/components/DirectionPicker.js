import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class DirectionPicker extends React.Component {
  constructor(props) {
    console.log(props.currentDirection);
    super(props);
    this.state = { selectedOption: props.currentDirection };
  }

  render() {
    return (
      <div className="dib pa3 v-top">
        <h3 className="mb1">Direction</h3>
        <form>
        {this.props.directions.map(d => (
          <div className="pa1 flex" key={d}>
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