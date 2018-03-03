import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RouteLink from './RouteLink'

import Helpers from '../helpers';

class StopSchedule extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      schedule: {},
      fetchedSchedule: false
    }
  }

  fetchData() {
    fetch(`${Helpers.endpoint}/schedule-for-stop/DDOT_${this.props.stopId}.json?key=BETA&includePolylines=false`)
    .then(response => response.json())
    .then(d => {

      console.log(d)

      this.setState({ 
        schedule: d, 
        fetchedSchedule: true 
      })
    })
    .catch(e => console.log(e));
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    return (
      <div className='stopSchedule'>
        Scheduled daily stops:
        {this.state.fetchedSchedule ? 
          this.state.schedule.data.entry.stopRouteSchedules.map(r => (
            <div>{r.routeId}</div>
          )) : ``}
      </div>
    )
  }
}

StopSchedule.propTypes = {
  stopId: PropTypes.string,
}

export default StopSchedule;
