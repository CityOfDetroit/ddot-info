import React from 'react';
import PropTypes from 'prop-types';

const ServicePicker = ({services, currentSvc, onChange}) => (
  <form>
    {services.map(s => (
      <div key={s}>
        <label>
        <input 
          type="radio" 
          name="direction" 
          onChange={(e) => onChange(e)} 
          value={s}
          checked={currentSvc == {s}} 
        />
        {s}</label>
      </div>
    ))}
  </form>
)

ServicePicker.PropTypes = {
  services: PropTypes.array,
  currentSvc: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default ServicePicker;