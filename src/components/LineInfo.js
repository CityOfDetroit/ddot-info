import React from 'react';
import PropTypes from 'prop-types';

import TopNav from './TopNav';

const LineInfo = ({ match }) => (
  <div>
    <TopNav />
    <h1>{match.params.name}</h1>
    <h3>Route map, schedule & real-time data for this route:</h3>
    <p>Coming soon!</p>
  </div>
)

LineInfo.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
}

export default LineInfo;
