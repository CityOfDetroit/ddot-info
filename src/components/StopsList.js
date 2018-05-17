import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StopCard from './StopCard';

/** List of bus stops that match input for StopSearch */
class StopsList extends Component {
  render() {
    return (
      <div className="overflow-scroll" style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(350px, 1fr))`, height: 400 }}>
        {this.props.stops.map((stop, i) =>
          <div key={i}>
            <StopCard id={stop.id} showTransfers={true} showRoutes showDirection />
          </div>
        )}
        {this.props.dummy ?
        <div style={{background: '#eee', margin: '.25em', minWidth: 300, height: 142, display: 'flex', alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
          <span style={{fontSize: '1.5em', color: '#444'}}>Plus 5,000 more!</span>
        </div> : ``}
      </div>
    );
  }
}

StopsList.propTypes = {
  stops: PropTypes.array,
}

export default StopsList;
