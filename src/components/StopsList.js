import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StopCard from './StopCard';

/** List of bus stops that match input for StopSearch */
class StopsList extends Component {
  render() {
    return (
      <div className="overflow-scroll" style={{ display: 'flex', flexWrap: 'wrap', height: 350 }}>
        {this.props.stops.map((stop, i) =>
          <div key={i}>
            <StopCard id={stop.id} showTransfers={true} showRoutes showDirection />
          </div>
        )}
      </div>
    );
  }
}

StopsList.propTypes = {
  stops: PropTypes.array,
}

export default StopsList;
