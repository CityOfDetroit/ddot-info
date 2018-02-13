import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StopLink from './StopLink';

class StopsList extends Component {
  render() {
    return (
      <div className="h5 overflow-scroll">
        {this.props.stops.map((stop, i) =>
          <div className="pa2" key={i}>
            <StopLink id={stop.id} showTransfers={true} />
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
