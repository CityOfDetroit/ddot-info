import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StopLink from './StopLink';

class StopsList extends Component {
  render() {
    return (
      <div>
        {this.props.stops.map((stop, i) =>
          <div className="ph3 pv2 bb b--light-silver" key={i}>
            <StopLink id={stop.name} />
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
