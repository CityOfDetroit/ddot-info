import React from 'react';
import TopNav from './TopNav';

const StopInfo = ({match}) => (
  <div>
    <TopNav />
    <h1>{match.params.name}</h1>
  </div>
)

export default StopInfo;
