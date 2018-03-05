import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StopCard from './StopCard';

class StopsList extends Component {
  render() {
    return (
      <div className="overflow-scroll" style={{height: 350}}>
        {this.props.stops.map((stop, i) =>
          <div className="" key={i}>
            <StopCard id={stop.id} showTransfers={true} />
          </div>
        )}
      </div>
    );
  }
};

StopsList.propTypes = {
  stops: PropTypes.array,
}

export default StopsList;
