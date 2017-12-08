import React from 'react';
// import PropTypes from 'prop-types';

const ServicePicker = ({services, currentService, onChange}) => (
  <form>
    {services.map(s => (
      <div key={s}>
        <label>
        <input 
          type="radio" 
          name="direction" 
          onChange={(e) => onChange(e)} 
          value={s} 
          checked={currentService == {s}} 
        />
        {s}</label>
      </div>
    ))}
  </form>
)

export default ServicePicker;