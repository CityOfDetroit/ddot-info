import React, { Component } from 'react';
import _ from 'lodash';
// import PropTypes from 'prop-types';
import StopLink from './StopLink';
// import Schedules from '../data/schedules.js';
import Stops from '../data/stops.js'

class BusRouteStopList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      stops: []
    }
  }

  fetchData() {
    fetch(`https://ddot-proxy-test.herokuapp.com/api/where/stops-for-route/DDOT_${this.props.id}.json?key=BETA`)
    .then(response => response.json())
    .then(d => {
      console.log(d)
      this.setState({ stops: d.data.entry.stopGroupings[0].stopGroups })
    })
    .catch(e => console.log(e));
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    const stops = _.filter(this.state.stops, ['stopIds[0]', `DDOT_${this.props.timepoints[0]}`])
    return (
      <div className='stopList overflow-scroll'>
        <div className="overflow-scroll">
          {stops.length > 0 ? stops[0].stopIds.map((stop, i) =>
            <div className="pa1 bb b--light-silver" style={{display: 'flex', alignItems: 'center'}}>
              <span className="f7 fw7 pa1">{i+1}.</span>
              <StopLink id={stop.slice(5,)} name={Stops[stop.slice(5,)].name} />
            </div>
          ) : ``}
        </div>
      </div>
    )
  }
}

export default BusRouteStopList;
