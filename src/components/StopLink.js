import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Stops from '../data/stops.js';
import Schedules from '../data/schedules.js'
import _ from 'lodash';

class StopLink extends Component {
  render() {
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent:'justify-between'}}>
        <Link className="dim black hover-mid-gray glow" to={{pathname: `/stop/${this.props.id}/`}}>{(Stops[this.props.id].name)}</Link>
        {Stops[this.props.id].routes.map(r => (
          <span className="pa1 dib white fw7 f7 ma1" style={{backgroundColor: Schedules[r].color}}>{r}</span>
        ))}
      </div>
    )
  }
}

StopLink.propTypes = {
  id: PropTypes.string.isRequired,
}

export default StopLink;
