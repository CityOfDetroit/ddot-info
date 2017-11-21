import React from 'react';

import TopNav from './TopNav';

const LineInfo = ({ match }) => (
  <div>
    <TopNav />
    <h1>{match.params.name}</h1>
    <h3>Route map, schedule & real-time data for this route:</h3>
    <p>Coming soon!</p>
  </div>
)

export default LineInfo;
