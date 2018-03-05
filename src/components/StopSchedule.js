import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RouteLink from './RouteLink';
import Helpers from '../helpers';

import moment from 'moment'

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
      <div className='pv2'>
        <span className="f3 db">Scheduled daily stops</span>
        {this.state.fetchedSchedule ? (
          <div style={{display: 'flex', flexDirection: 'row', padding: '.5em', overflowX: 'scroll'}} >
            {this.state.schedule.data.entry.stopRouteSchedules.map(r => (
              <div key={r.routeId} style={{minWidth: 200, marginRight: '.5em'}}>
              <RouteLink key={r.routeId} id={Helpers.scheduleFromGtfsId(r.routeId).id} />
              <ul className="ma1 pa0" style={{maxHeight: 300, overflowY: 'scroll'}}>
              {r.stopRouteDirectionSchedules[0].scheduleStopTimes.map(st => (
                <li key={st.tripId}>
                  {moment(st.arrivalTime).format('h:mma')}
                </li>
              ))}
              </ul>
              </div>
            ))}
          </div>
        ): ``}
      </div>
    )
  }
}

StopSchedule.propTypes = {
  stopId: PropTypes.string,
}

export default StopSchedule;
