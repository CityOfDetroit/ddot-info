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
      <div>
        {this.state.fetchedSchedule ? (
          <div style={{display: 'inline-flex', justifyContent: 'left', flexDirection: 'row', padding: '.5em', overflowX: 'scroll'}} >
            {this.state.schedule.data.entry.stopRouteSchedules.map(r => (
              <div key={r.routeId} style={{alignSelf: 'flex-start'}}>
                {/* <RouteLink key={r.routeId} id={Helpers.scheduleFromGtfsId(r.routeId).id} /> */}
                <div className="" style={{alignItems: 'flex-start', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', maxHeight: 250}}>
                {r.stopRouteDirectionSchedules[0].scheduleStopTimes.map(st => (
                  <span className="ph2" style={{textAlign: 'center', lineHeight: '1.5em'}} key={st.tripId}>
                    {moment(st.arrivalTime).format('h:mma')}
                  </span>
                ))}
                </div>
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
