import React from 'react';
import PropTypes from 'prop-types';

const DirectionPicker = ({directions, currentDirection, onChange}) => (
  <form>
    {directions.map(d => (
      <div key={d}>
        <label>
        <input 
          type="radio" 
          name="direction" 
          onChange={(e) => onChange(e)} 
          value={d} 
          checked={currentDirection === {d}} 
        />
        {d}</label>
      </div>
    ))}
  </form>
)

DirectionPicker.propTypes = {
  directions: PropTypes.array,
  currentDirection: PropTypes.string,
  onChange:PropTypes.func.isRequired
}

export default DirectionPicker;