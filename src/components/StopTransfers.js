import React from 'react';

import StopCard from './StopCard';

const StopTransfers = ({ stops }) => (
  <div className="transfers pv2">
    <span className="db f3 fw5 mt3 pb2">Transfer to other routes at nearby stops</span>    
    {stops.map((s, i) => (
      <div key={i}>
        <StopCard id={s[0]} showTransfers={false} showDir />
      </div>
    ))}
  </div>
)

export default StopTransfers;
