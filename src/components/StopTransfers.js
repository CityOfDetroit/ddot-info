import React from 'react';

import StopCard from './StopCard';

const StopTransfers = ({ stops }) => (
  <div className="transfers">
    <h3 style={{margin: 0, padding: '.25em 0em', borderBottom: '1px dotted black', width: '100%'}}>Transfer at nearby stops:</h3>    
    {stops.map((s, i) => (
      <div key={i}>
        <StopCard id={s[0]} showTransfers={false} showDir />
      </div>
    ))}
  </div>
)

export default StopTransfers;
